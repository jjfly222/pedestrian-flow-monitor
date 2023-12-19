package com.pfm.dao;

import com.pfm.entity.PictureBaseRecord;
import org.springframework.stereotype.Repository;

@Repository
public interface PictureBaseRecordDao {
    int deleteByPrimaryKey(Integer id);

    int insert(PictureBaseRecord record);

    int insertSelective(PictureBaseRecord record);

    PictureBaseRecord selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(PictureBaseRecord record);

    int updateByPrimaryKey(PictureBaseRecord record);
}