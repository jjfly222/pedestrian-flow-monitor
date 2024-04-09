package com.pfm.service.Impl;

import com.pfm.dao.PictureBaseRecordDao;
import com.pfm.dao.SceneMessageDao;
import com.pfm.dao.SecondSpeedDensityInformationDao;
import com.pfm.entity.*;
import com.pfm.service.CalculationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

@Service
public class CalculationServiceImpl implements CalculationService {

    @Autowired
    private SecondSpeedDensityInformationDao secondSpeedDensityInformationDao;

    @Autowired
    private PictureBaseRecordDao pictureBaseRecordDao;

    @Autowired
    private SceneMessageDao sceneMessageDao;


    @Override
    public void CalculationPerson() {

        List<SceneMessage> sceneMessages = sceneMessageDao.queryAll();
        Map<String, SceneMessage> sceneMesMap = sceneMessages.stream().collect(Collectors.toMap(SceneMessage::getGroupId, sceneMessage -> sceneMessage));


        List<GroupPictureTime> groupPictureTimes = pictureBaseRecordDao.selectAllGroupPictureTime();
        Map<String, List<GroupPictureTime>> groupPictureTimeMap = groupPictureTimes.stream()
                .collect(Collectors.groupingBy(gpt -> gpt.getGroupId() + "__" + gpt.getCreateDatetime()));


        List<PictureBaseRecord> pictureBaseRecords = pictureBaseRecordDao.selectAll();
        List<PersonNum> personNumList = pictureBaseRecordDao.queryPersonNum();

        List<PictureBaseRecord> pictureBaseRecordList = new ArrayList<>();

        Map<String, Map<Integer, List<PictureBaseRecord>>> groupedByGroupIdAndPictureNum = pictureBaseRecords.stream()
                .collect(Collectors.groupingBy(PictureBaseRecord::getGroupId, Collectors.groupingBy(PictureBaseRecord::getPictureNum)));

        groupedByGroupIdAndPictureNum.forEach((s, integerListMap) -> {
            integerListMap.forEach((integer, pictureBaseRecords1) -> {
                //计算单个速度
                List<PictureBaseRecord> pictureBaseRecords2 = integerListMap.get(integer - 1);
                if (pictureBaseRecords2 != null && pictureBaseRecords2.size() > 0) {
                    for (PictureBaseRecord pp : pictureBaseRecords2) {
                        for (PictureBaseRecord dd : pictureBaseRecords1) {
                            if (pp.getTargetId().equals(dd.getTargetId())) {
                                BigDecimal speed = this.calculateDistance(pp, dd);
                                pp.setSpeed(speed);
                                pictureBaseRecordList.add(pp);
                            }
                        }
                    }
                }
            });
        });

        //计算单个图片 合在一起平均速度
        List<PersonNum> onePictureSpeedList = new ArrayList<>();
        Map<String, Map<Integer, List<PictureBaseRecord>>> pictureSpeed = pictureBaseRecordList.stream().collect(Collectors.groupingBy(PictureBaseRecord::getGroupId, Collectors.groupingBy(PictureBaseRecord::getPictureNum)));
        pictureSpeed.forEach(((groupId, integerListMap) -> {
            integerListMap.forEach((pictureNum, personNumList1) -> {
                PersonNum personNum = new PersonNum();
                personNum.setGroupId(groupId);
                personNum.setPictureNum(pictureNum);
                BigDecimal speedAvgPeople = this.CalculatePersonSpeed(personNumList1);
                personNum.setSpeedAvgPeople(speedAvgPeople);
                onePictureSpeedList.add(personNum);
            });
        }));

        //人数分组   这里需要再加上时间
//        AtomicInteger counter = new AtomicInteger(0);
        Map<String, Map<Integer, List<PersonNum>>> groupedByTimeNum = personNumList.stream()
                .sorted(Comparator.comparing(PersonNum::getGroupId).thenComparingInt(PersonNum::getPictureNum))
                .collect(Collectors.groupingBy(
                        PersonNum::getGroupId,
                        Collectors.groupingBy(record -> (record.getPictureNum() - 1) / 3 + 1)
                ));

        //速度分组
//        AtomicInteger counter2 = new AtomicInteger(0);
        Map<String, Map<Integer, List<PersonNum>>> groupedBySpeedNum = onePictureSpeedList.stream()
                .sorted(Comparator.comparing(PersonNum::getGroupId).thenComparingInt(PersonNum::getPictureNum))
                .collect(Collectors.groupingBy(
                        PersonNum::getGroupId,
                        Collectors.groupingBy(record -> (record.getPictureNum() - 1) / 3 + 1)
                ));


        List<SecondSpeedDensityInformation> secondSpeedDensityInformationList = new ArrayList<>();

        groupPictureTimeMap.forEach((key, gptMap) -> {
            String keyGroupId = key.split("__")[0];
            String keyTime = key.split("__")[1];
            int px = 80;
            if (sceneMesMap.get(keyGroupId) != null) {
                px = sceneMesMap.get(keyGroupId).getStandLength();
            }


            for (int i = 0; i < groupedByTimeNum.get(keyGroupId).size(); i++) {
                SecondSpeedDensityInformation secondSpeedDensityInformation = new SecondSpeedDensityInformation();
                secondSpeedDensityInformation.setStartTime(this.addTime(keyTime, i));
                secondSpeedDensityInformation.setTimeInterval(1);
                secondSpeedDensityInformation.setMonitorId(keyGroupId);
                secondSpeedDensityInformation.setAvgSpeed(this.calculateAvgSpeed(groupedBySpeedNum.get(keyGroupId).get(i), new BigDecimal(px)));
                secondSpeedDensityInformation.setAvgNum(this.calculateAvgPersonNum(groupedByTimeNum.get(keyGroupId).get(i)));
                secondSpeedDensityInformation.setAvgDensity(secondSpeedDensityInformation.getAvgNum().divide(new BigDecimal(sceneMesMap.get(keyGroupId).getAreaSpace())).setScale(2, RoundingMode.HALF_UP));
                secondSpeedDensityInformationList.add(secondSpeedDensityInformation);
            }
            PictureBaseRecord pictureBaseRecord = new PictureBaseRecord();
            pictureBaseRecord.setGroupId(keyGroupId);
            pictureBaseRecord.setCreateDatetime(keyTime);
            pictureBaseRecordDao.updateBygroupAndTime(pictureBaseRecord);
        });

        secondSpeedDensityInformationDao.insertAll(secondSpeedDensityInformationList);

        System.out.println("行人信息计算完成");
        return;

    }


    @Override
    public List<SecondSpeedDensityInformation> queryDate(String monitorId) {

        if (monitorId == null || monitorId.equals("all")) {
            monitorId = null;
        }
        List<SecondSpeedDensityInformation> secondSpeedDensityInformations = secondSpeedDensityInformationDao.queryAll(monitorId);
        return secondSpeedDensityInformations;
    }

    /**
     * 计算速度
     */
    public BigDecimal calculateDistance(PictureBaseRecord p1, PictureBaseRecord p2) {
        double startX = p1.getLeftX() + 0.5 * p1.getWidth();
        double startY = p1.getLeftY() + 0.5 * p1.getHeight();
        double endX = p2.getLeftX() + 0.5 * p2.getWidth();
        double endY = p2.getLeftY() + 0.5 * p2.getHeight();
        double input = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2)) * 3;
        BigDecimal bd = BigDecimal.valueOf(input);
        BigDecimal rounded = bd.setScale(2, RoundingMode.HALF_UP);
        return rounded;
    }


    public BigDecimal CalculatePersonSpeed(List<PictureBaseRecord> pictureBaseRecordList) {
        BigDecimal speed = new BigDecimal(0);
        if (pictureBaseRecordList != null && pictureBaseRecordList.size() > 0) {
            for (PictureBaseRecord pictureBaseRecord : pictureBaseRecordList) {
                speed = speed.add(pictureBaseRecord.getSpeed());
            }
            speed = speed.divide(new BigDecimal(pictureBaseRecordList.size()), 2, RoundingMode.HALF_UP);
        }
        return speed;
    }

    /**
     * 计算平均人数
     *
     * @param personNumList
     * @return
     */
    public BigDecimal calculateAvgPersonNum(List<PersonNum> personNumList) {
        BigDecimal num = new BigDecimal(0);
        if (personNumList != null && personNumList.size() > 0) {
            for (PersonNum personNum : personNumList) {
                num = num.add(new BigDecimal(personNum.getNumPeople()));
            }
            num = num.divide(new BigDecimal(personNumList.size()), 2, RoundingMode.HALF_UP);
        }
        return num;
    }

    /**
     * 计算平均移动速度
     *
     * @param personNumList
     * @return
     */
    public BigDecimal calculateAvgSpeed(List<PersonNum> personNumList, BigDecimal px) {
        BigDecimal num = new BigDecimal(0);
        if (personNumList != null && personNumList.size() > 0) {
            for (PersonNum personNum : personNumList) {
                num = num.add(personNum.getSpeedAvgPeople());
            }
            num = num.divide(px.multiply(new BigDecimal(personNumList.size())), 2, RoundingMode.HALF_UP);
        }
        return num;
    }


    /**
     * 加一秒
     */
    String addTime(String timeString, Integer time) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

        // 解析字符串为LocalDateTime对象
        LocalDateTime dateTime = LocalDateTime.parse(timeString, formatter);

        // 加上1秒
        LocalDateTime newDateTime = dateTime.plusSeconds(time);
        String format = newDateTime.format(formatter);
        return format;
    }

}
