package com.pfm.entity;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class PersonNum {
    private String groupId;
    private Integer pictureNum;
    private Integer numPeople;

    private BigDecimal numAvgPeople;

    private BigDecimal speedAvgPeople;



    private static final long serialVersionUID = 1L;
}
