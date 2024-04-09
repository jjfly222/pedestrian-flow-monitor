package com.pfm.dao;

import com.pfm.entity.SecondSpeedDensityInformation;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SecondSpeedDensityInformationDao {
    List<SecondSpeedDensityInformation> queryAll(@Param("monitorId") String monitorId);

    int deleteByPrimaryKey(Integer pkId);

    int insert(SecondSpeedDensityInformation record);

    int insertSelective(SecondSpeedDensityInformation record);

    SecondSpeedDensityInformation selectByPrimaryKey(Integer pkId);

    int updateByPrimaryKeySelective(SecondSpeedDensityInformation record);

    int updateByPrimaryKey(SecondSpeedDensityInformation record);

    int insertAll(List<SecondSpeedDensityInformation> list);
}