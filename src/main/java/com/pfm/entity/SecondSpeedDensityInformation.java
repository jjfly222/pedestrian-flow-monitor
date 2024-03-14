package com.pfm.entity;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import lombok.Data;

/**
 * 分秒级速度密度报表
 * second_speed_density_information
 */
@Data
public class SecondSpeedDensityInformation implements Serializable {
    private Integer pkId;

    /**
     * 开始时间
     */
    private String startTime;

    /**
     * 结束时间
     */
    private String endTime;

    /**
     * 以1秒、5秒、20秒、60秒、300秒为间隔
     */
    private Integer timeInterval;

    /**
     * 地图组id
     */
    private String mapId;

    /**
     * 监控点id
     */
    private String monitorId;

    /**
     * 平均速度
     */
    private BigDecimal avgSpeed;

    /**
     * 平均人员密度
     */
    private BigDecimal avgDensity;

    /**
     * 平均人员数量
     */
    private BigDecimal avgNum;

    /**
     * 0：已删除，1：正常
     */
    private String state;

    /**
     * 创建时间
     */
    private Date createTime;

    private Date modTime;

    private Date delTime;

    private static final long serialVersionUID = 1L;
}