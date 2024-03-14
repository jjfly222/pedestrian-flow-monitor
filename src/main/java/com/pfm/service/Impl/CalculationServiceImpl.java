package com.pfm.service.Impl;

import com.pfm.dao.PictureBaseRecordDao;
import com.pfm.dao.SecondSpeedDensityInformationDao;
import com.pfm.entity.PersonNum;
import com.pfm.entity.PictureBaseRecord;
import com.pfm.entity.PictureFinallyRecord;
import com.pfm.entity.SecondSpeedDensityInformation;
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

    @Override
    public void CalculationPerson() {
        List<PictureBaseRecord> pictureBaseRecords = pictureBaseRecordDao.selectAll();
        List<PersonNum> personNumList = pictureBaseRecordDao.queryPersonNum();
        Map<String, Object> keyMap = new HashMap<>();
        keyMap.put("groupId", pictureBaseRecords.get(0).getGroupId());
        keyMap.put("time", pictureBaseRecords.get(0).getCreateDatetime());

        personNumList.get(0).getGroupId();
        List<PictureBaseRecord> pictureBaseRecordList = new ArrayList<>();

        Map<String, Map<Integer, List<PictureBaseRecord>>> groupedByGroupIdAndPictureNum = pictureBaseRecords.stream().collect(Collectors.groupingBy(PictureBaseRecord::getGroupId, Collectors.groupingBy(PictureBaseRecord::getPictureNum)));

        groupedByGroupIdAndPictureNum.forEach((s, integerListMap) -> {
            integerListMap.forEach((integer, pictureBaseRecords1) -> {
                //计算单个速度
                List<PictureBaseRecord> pictureBaseRecords2 = integerListMap.get(integer - 1);
                if (pictureBaseRecords2 != null && pictureBaseRecords2.size() > 0) {
                    for (PictureBaseRecord pp : pictureBaseRecords2) {
                        for (PictureBaseRecord dd : pictureBaseRecords1) {
                            if (pp.getTargetId() == dd.getTargetId()) {
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
        //计算单秒的人数
//        Map<String, Map<Integer, List<PersonNum>>> collect = personNumList.stream()
//                .collect(Collectors.groupingBy(PersonNum::getGroupId,
//                Collectors.groupingBy(PersonNum::getPictureNum)));

        //人数分组
        AtomicInteger counter = new AtomicInteger(0);
        Map<String, Map<Integer, List<PersonNum>>> groupedByTimeNum = personNumList.stream()
                .sorted(Comparator.comparingInt(PersonNum::getPictureNum))
                .collect(Collectors.groupingBy(
                        PersonNum::getGroupId,
                        Collectors.groupingBy(record -> (counter.incrementAndGet() - 1) / 3 + 1)
                ));

        //速度分组
        AtomicInteger counter2 = new AtomicInteger(0);
        Map<String, Map<Integer, List<PersonNum>>> groupedBySpeedNum = onePictureSpeedList.stream()
                .sorted(Comparator.comparingInt(PersonNum::getPictureNum))
                .collect(Collectors.groupingBy(
                        PersonNum::getGroupId,
                        Collectors.groupingBy(record -> (counter2.incrementAndGet() - 1) / 3 + 1)
                ));


        List<SecondSpeedDensityInformation> secondSpeedDensityInformationList = new ArrayList<>();

        for (int i = 0; i < groupedByTimeNum.get(keyMap.get("groupId")).size(); i++) {
            SecondSpeedDensityInformation secondSpeedDensityInformation = new SecondSpeedDensityInformation();
            secondSpeedDensityInformation.setStartTime(this.addTime(keyMap.get("time").toString(), i));
            secondSpeedDensityInformation.setTimeInterval(1);
            secondSpeedDensityInformation.setMonitorId(keyMap.get("groupId").toString());
            secondSpeedDensityInformation.setAvgSpeed(this.calculateAvgSpeed(groupedBySpeedNum.get(keyMap.get("groupId")).get(i)));
            secondSpeedDensityInformation.setAvgNum(this.calculateAvgPersonNum(groupedByTimeNum.get(keyMap.get("groupId")).get(i)));
            secondSpeedDensityInformationList.add(secondSpeedDensityInformation);
        }

        secondSpeedDensityInformationDao.insertAll(secondSpeedDensityInformationList);
        System.out.println("aaaaaaaaaa");
        return;

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
     * @param personNumList
     * @return
     */
    public BigDecimal calculateAvgSpeed(List<PersonNum> personNumList) {
        BigDecimal num = new BigDecimal(0);
        if (personNumList != null && personNumList.size() > 0) {
            for (PersonNum personNum : personNumList) {
                num = num.add(personNum.getSpeedAvgPeople());
            }
            num = num.divide(new BigDecimal(personNumList.size()), 2, RoundingMode.HALF_UP);
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
