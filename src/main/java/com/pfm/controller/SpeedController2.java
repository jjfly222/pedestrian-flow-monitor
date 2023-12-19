package com.pfm.controller;

import com.pfm.entity.PictureFinallyRecord;
import com.pfm.service.PictureFinallyRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * @author abel
 * @ClassName UserController
 * @date 2016年11月10日
 */


@Controller
public class SpeedController2 {

    //    @ResponseBody
    @RequestMapping("/index")
    public String index(HttpServletRequest request) {
        return "index";
    }
}
