package com.pfm.dao;

import com.pfm.entity.PictureFinallyRecord;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PictureFinallyRecordDao {
    int deleteByPrimaryKey(Integer id);

    int insert(PictureFinallyRecord record);

    int insertSelective(PictureFinallyRecord record);

    PictureFinallyRecord selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(PictureFinallyRecord record);

    int updateByPrimaryKey(PictureFinallyRecord record);

    List<PictureFinallyRecord> queryFinallyRecord();
}