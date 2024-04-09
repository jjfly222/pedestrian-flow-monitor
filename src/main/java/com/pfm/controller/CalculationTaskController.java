package com.pfm.controller;

import com.pfm.entity.SecondSpeedDensityInformation;
import com.pfm.service.CalculationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
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
     *
     * @return
     */
    @ResponseBody
    @PostMapping("/queryDate")
    public List<SecondSpeedDensityInformation> queryDate(@RequestParam("monitorId") String monitorId) {
        List<SecondSpeedDensityInformation> secondSpeedDensityInformations = calculationService.queryDate(monitorId);
        return secondSpeedDensityInformations;
    }
    @ResponseBody
    @PostMapping("/updateTime")
    public void queryDate() {
         calculationService.updateTime();
    }






}
