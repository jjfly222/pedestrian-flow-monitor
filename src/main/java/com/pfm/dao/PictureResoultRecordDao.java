package com.pfm.dao;

import com.pfm.entity.PictureResoultRecord;
import org.springframework.stereotype.Repository;

@Repository
public interface PictureResoultRecordDao {
    int deleteByPrimaryKey(Integer id);

    int insert(PictureResoultRecord record);

    int insertSelective(PictureResoultRecord record);

    PictureResoultRecord selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(PictureResoultRecord record);

    int updateByPrimaryKey(PictureResoultRecord record);
}