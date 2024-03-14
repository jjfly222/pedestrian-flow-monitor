package com.pfm.entity;

import lombok.Data;

@Data
public class GroupPictureTime {

    private String groupId;
    private Integer pictureNum;

    private String  createDatetime;
    private static final long serialVersionUID = 1L;
}
