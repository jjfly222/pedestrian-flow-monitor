package com.pfm.service;

import com.pfm.entity.SecondSpeedDensityInformation;

import java.util.List;

public interface CalculationService {
    void  CalculationPerson();
    List<SecondSpeedDensityInformation> queryDate(String monitId);
}
