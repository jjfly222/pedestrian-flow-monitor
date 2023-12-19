package com.pfm.entity;

import java.io.Serializable;
import lombok.Data;

/**
 * 场景信息表
 * scene_message
 */
@Data
public class SceneMessage implements Serializable {
    /**
     * 监控点id
     */
    private Integer id;

    /**
     * 视频分组编号
     */
    private String groupId;

    /**
     * 标准长度像素个数
     */
    private Integer standLength;

    /**
     * 场景类型（长方形、圆形、梯形、其他）
     */
    private String sceneType;

    /**
     * 场景参数（长方形 40  60 ，圆形 20，梯形 20，40，30）
     */
    private String sceneParam;

    /**
     * 场地面积
     */
    private String areaSpace;

    /**
     * 创建时间
     */
    private String createDatetime;

    /**
     * 删除状态（0:删除   1：正常）
     */
    private Integer deleteStatus;

    private static final long serialVersionUID = 1L;
}