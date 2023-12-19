package com.pfm.service.Impl;

import com.pfm.dao.PictureFinallyRecordDao;
import com.pfm.entity.PictureFinallyRecord;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

import static org.junit.Assert.*;
@RunWith(SpringRunner.class)
@SpringBootTest
public class PictureFinallyRecordServiceImplTest {

    @Autowired
    private PictureFinallyRecordDao pictureFinallyRecordDao;

    @Test
    public void queryFinallyRecord() {
        System.out.println("111111111111");
        List<PictureFinallyRecord> pictureFinallyRecords = pictureFinallyRecordDao.queryFinallyRecord();
        System.out.println(pictureFinallyRecords);
    }
}