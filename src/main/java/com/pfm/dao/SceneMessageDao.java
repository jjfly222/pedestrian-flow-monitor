package com.pfm.dao;

import com.pfm.entity.SceneMessage;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SceneMessageDao {

    List<SceneMessage> queryAll();

    int deleteByPrimaryKey(Integer id);

    int insert(SceneMessage record);

    int insertSelective(SceneMessage record);

    SceneMessage selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(SceneMessage record);

    int updateByPrimaryKey(SceneMessage record);
}