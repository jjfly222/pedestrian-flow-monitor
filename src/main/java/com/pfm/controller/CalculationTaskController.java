package com.pfm.controller;

import com.pfm.service.CalculationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 计算任务
 */
@Controller
@RequestMapping(value = "/calculation")
public class CalculationTaskController {

    @Autowired
    private CalculationService calculationService;

    @PostMapping("/person")
    public void calculate(){
        calculationService.CalculationPerson();
    }

}
