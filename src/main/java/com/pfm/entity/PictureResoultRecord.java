package com.pfm.entity;

import java.io.Serializable;
import lombok.Data;

/**
 * 阶段强化结果图片记录表
 * picture_resoult_record
 */
@Data
public class PictureResoultRecord implements Serializable {
    /**
     * 物理主键
     */
    private Integer id;

    /**
     * 分组
     */
    private String groupId;

    /**
     * 日期
     */
    private String timeDay;

    /**
     * 图片编号
     */
    private Integer pictureNum;

    /**
     * 目标号
     */
    private Integer targetId;

    /**
     * 左上角x轴坐标
     */
    private Integer leftX;

    /**
     * 左上角y轴坐标
     */
    private Integer leftY;

    /**
     * 横向长
     */
    private Integer width;

    /**
     * 纵向高
     */
    private Integer height;

    private String other;

    /**
     * 类型
     */
    private Integer typeId;

    /**
     * 类型名称
     */
    private String typeName;

    /**
     * 状态
     */
    private Integer status;

    /**
     * 创建时间
     */
    private String createDatetime;

    private static final long serialVersionUID = 1L;
}