package com.pfm.controller;

import com.pfm.entity.SecondSpeedDensityInformation;
import com.pfm.service.CalculationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 计算任务
 */
@CrossOrigin
@Controller
@RequestMapping(value = "/calculation")
public class CalculationTaskController {

    @Autowired
    private CalculationService calculationService;

    /**
     * 计算行人各项数据
     */
    @ResponseBody
    @PostMapping("/person")
    public void calculate() {
        calculationService.CalculationPerson();

    }

    /**
     * 查询行人信息
     * @RequestParam("monitorId")
     * @return
     */
    @ResponseBody
    @PostMapping("/queryDate")
    public List<SecondSpeedDensityInformation> queryDate( @RequestParam(value ="monitorId", required = false) String monitorId) throws Exception {
        System.out.println("aaaaa"+monitorId);
        List<SecondSpeedDensityInformation> secondSpeedDensityInformations = calculationService.queryDate(monitorId);
        return secondSpeedDensityInformations;
    }

    /**
     * 查询客流量
     * @RequestParam("monitorId")
     * @return
     */
    @ResponseBody
    @PostMapping("/queryPeopleDate")
    public List<SecondSpeedDensityInformation> queryPeopleDate( @RequestParam(value ="monitorId", required = false) String monitorId) throws Exception {
        System.out.println("查询客流量"+monitorId);
        List<SecondSpeedDensityInformation> secondSpeedDensityInformations = calculationService.queryPeopleDate(monitorId);
        return secondSpeedDensityInformations;
    }


//    @ResponseBody
//    @PostMapping("/updateTime")
//    public void updateTime() {
//         calculationService.updateTime();
//    }



}
