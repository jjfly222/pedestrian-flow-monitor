package com.pfm.controller;

import org.opencv.core.Core;
import org.opencv.core.Mat;
import org.opencv.core.Size;
import org.opencv.videoio.VideoCapture;
import org.opencv.videoio.VideoWriter;
import org.opencv.videoio.Videoio;

public class CameraCapture {
    static {
        System.loadLibrary(Core.NATIVE_LIBRARY_NAME);
    }

    public static void main(String[] args) {
        VideoCapture camera = new VideoCapture(1); // 使用第一个摄像头
        if (!camera.isOpened()) {
            System.out.println("Error: 摄像头未开启");
            return;
        }

        // 设置视频捕捉的分辨率
        camera.set(Videoio.CAP_PROP_FRAME_WIDTH, 640);
        camera.set(Videoio.CAP_PROP_FRAME_HEIGHT, 480);

        Mat frame = new Mat();
        String filenameBase = "G:\\1.soft_code_doc\\2.code\\shiyan1\\monitor";
        int index = 0;
        long startTime = System.currentTimeMillis();
        long videoDuration = 10000; // 1分钟

        VideoWriter writer = new VideoWriter(filenameBase + "\\shiping_" + index + ".avi",
                VideoWriter.fourcc('M', 'J', 'P', 'G'), 10,
                new Size(640, 480));

        while (true) {
            if (camera.read(frame)) {
//                System.out.println("Frame Captured");
                writer.write(frame);

                // 检查是否到了保存新视频的时间
                if (System.currentTimeMillis() - startTime > videoDuration) {
                    // 关闭当前视频文件并开始一个新文件
                    writer.release();
                    index++;
                    writer = new VideoWriter(filenameBase + "\\shiping_"+ index + ".avi",
                            VideoWriter.fourcc('M', 'J', 'P', 'G'), 30,
                            new Size(640, 480));
                    startTime = System.currentTimeMillis(); // 重置计时器
                }
            } else {
                System.out.println("无法捕获帧");
                break;
            }
        }

        // 释放资源
        camera.release();
        writer.release();
        System.out.println("Done.");
    }
}
