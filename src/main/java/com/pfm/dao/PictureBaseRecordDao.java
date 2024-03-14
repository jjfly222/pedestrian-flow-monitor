package com.pfm.dao;

import com.pfm.entity.PersonNum;
import com.pfm.entity.PictureBaseRecord;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PictureBaseRecordDao {

    List<PictureBaseRecord> selectAll();

    List<PersonNum> queryPersonNum();

    int deleteByPrimaryKey(Integer id);

    int insert(PictureBaseRecord record);

    int insertSelective(PictureBaseRecord record);

    PictureBaseRecord selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(PictureBaseRecord record);

    int updateByPrimaryKey(PictureBaseRecord record);

    int updateBygroupAndTime(PictureBaseRecord record);
}