package com.pfm.service.Impl;

import com.pfm.dao.PictureFinallyRecordDao;
import com.pfm.entity.PictureFinallyRecord;
import com.pfm.service.PictureFinallyRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class PictureFinallyRecordServiceImpl implements PictureFinallyRecordService {

    @Autowired
    private PictureFinallyRecordDao pictureFinallyRecord;

    @Override
    public List<PictureFinallyRecord> queryFinallyRecord() {
        return pictureFinallyRecord.queryFinallyRecord();
    }
}
