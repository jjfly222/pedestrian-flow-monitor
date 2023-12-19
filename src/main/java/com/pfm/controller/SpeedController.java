package com.pfm.controller;

import com.pfm.entity.PictureFinallyRecord;
import com.pfm.service.PictureFinallyRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 *
 * @ClassName UserController   111111111111
 * @author abel
 * @date 2016年11月10日
 */


@Controller
@RequestMapping(value = "/speed")
public class SpeedController {
    @Autowired
    private PictureFinallyRecordService pictureFinallyRecordService;

    @ResponseBody
    @PostMapping("/all")
    public  List<PictureFinallyRecord>  list(HttpServletRequest request) {
        List<PictureFinallyRecord> pictureFinallyRecords = pictureFinallyRecordService.queryFinallyRecord();
        System.out.println(pictureFinallyRecords);
        return pictureFinallyRecords;
    }

}
