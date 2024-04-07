package com.pfm.controller;

import com.pfm.entity.SecondSpeedDensityInformation;
import com.pfm.service.CalculationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

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

    @ResponseBody
    @PostMapping("/person")
    public void calculate(){
        calculationService.CalculationPerson();

    }
    @ResponseBody
    @PostMapping("/queryDate")
    public List<SecondSpeedDensityInformation> queryDate(){
        List<SecondSpeedDensityInformation> secondSpeedDensityInformations = calculationService.queryDate();
        return secondSpeedDensityInformations;
    }

}
