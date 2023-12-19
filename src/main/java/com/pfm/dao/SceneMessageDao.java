package com.pfm.dao;

import com.pfm.entity.SceneMessage;
import org.springframework.stereotype.Repository;

@Repository
public interface SceneMessageDao {
    int deleteByPrimaryKey(Integer id);

    int insert(SceneMessage record);

    int insertSelective(SceneMessage record);

    SceneMessage selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(SceneMessage record);

    int updateByPrimaryKey(SceneMessage record);
}