import { defineStore } from 'pinia'
import {  reactive } from 'vue'

interface RegionForm {
  time_start: string;
  time_end: string;
  max_people_num: string;
  max_people_density: string;
  max_people_speed: string;
}

interface Monitor {
  monitorId: string,
  monitorDataId: string,
  monitorName: string,
  inputTime: string,
  mapGroupId: string,
  mapGroupName: string,
  regionShape: string, // circle: 圆形; rectangle: 长方形; trapezoid: 梯形
  acreage: string,
  standardLength: string,
  occupiedPixel: string,
  url: string,
  videoUrl: string,
  regionForm: RegionForm[]
}
export const useMonitorStore = defineStore('monitorList', () => {
  const monitorInfoList = reactive<Monitor[]>([
    {
      monitorId: '001',
      monitorDataId: 'changtaipqcenter',
      monitorName: '喷泉中心',
      inputTime: '2024-11-25',
      mapGroupId: '01',
      mapGroupName: '长泰广场',
      regionShape: '圆形', // circle: 圆形;
      // rectangle: 长方形; trapezoid: 梯形
      acreage: '40 平方米',
      standardLength: ' 1 米',
      occupiedPixel: '300px',
      url: 'http://localhost:8081/picture/喷泉中心.jpg',
      // url: 'http://localhost:8081/picture/喷泉中心识别后.jpg',
      // url: 'http://localhost:8081/picture/喷泉人数不多时.jpg',
      // url: 'http://localhost:8081/picture/喷泉人数24.jpg',
      videoUrl: 'http://localhost:8081/video/喷泉中心.mp4',
      regionForm: [{
        time_start: '19:00:00',
        time_end: '23:30:00',
        max_people_num: '200',
        max_people_density: '5',
        max_people_speed: '0.5'
      }]
    }, {
      monitorId: '002',
      monitorDataId: 'changtainj',
      monitorName: '东庭院南街',
      inputTime: '2024-11-25',
      mapGroupId: '01',
      mapGroupName: '长泰广场',
      regionShape: 'rectangle', // circle: 圆形; rectangle: 长方形; trapezoid: 梯形
      acreage: '80 平方米',
      standardLength: ' 1 米',
      occupiedPixel: ' 500px',
      url: 'http://localhost:8081/picture/东庭院南街.jpg',
      videoUrl: '',
      regionForm: [{
        time_start: '23:31:16',
        time_end: '23:41:15',
        max_people_num: '1000',
        max_people_density: '5',
        max_people_speed: '0.5'
      }]
    }, {
      monitorId: '003',
      monitorDataId: 'changtaihm',
      monitorName: '盒马鲜生拐角',
      inputTime: '2024-11-25',
      mapGroupId: '01',
      mapGroupName: '长泰广场',
      regionShape: 'trapezoid', // circle: 圆形; rectangle: 长方形; trapezoid: 梯形
      acreage: '52 平方米',
      standardLength: ' 1 米',
      occupiedPixel: '380px',
      // url: 'http://localhost:8081/picture/盒马鲜生拐角.jpg',
      url: 'http://localhost:8081/picture/6盒马1.jpg',
      videoUrl: '',
      regionForm: [{
        time_start: '23:31:16',
        time_end: '23:41:15',
        max_people_num: '1000',
        max_people_density: '5',
        max_people_speed: '0.5'
      }]
    }, {
      monitorId: '004',
      monitorDataId: 'changtaiyqdazhong',
      monitorName: '一汽大众东街',
      inputTime: '2024-11-25',
      mapGroupId: '01',
      mapGroupName: '长泰广场',
      regionShape: 'rectangle', // circle: 圆形; rectangle: 长方形; trapezoid: 梯形
      acreage: '85 平方米',
      standardLength: ' 1 米',
      occupiedPixel: ' 520px',
      url: 'http://localhost:8081/picture/一汽大众东街.jpg',
      videoUrl: 'http://localhost:8081/video/output.mp4',
      regionForm: [{
        time_start: '23:31:16',
        time_end: '23:41:15',
        max_people_num: '1000',
        max_people_density: '5',
        max_people_speed: '0.5'
      }]
    }, {
      monitorId: '005',
      monitorDataId: 'changtaiEzhuanjiao',
      monitorName: '南门入口',
      inputTime: '2024-11-25',
      mapGroupId: '01',
      mapGroupName: '长泰广场',
      regionShape: 'trapezoid', // circle: 圆形; rectangle: 长方形; trapezoid: 梯形
      acreage: '49 平方米',
      standardLength: ' 1 米',
      occupiedPixel: ' 380px',
      url: 'http://localhost:8081/picture/长泰E座转角.jpg',
      // url: 'http://localhost:8081/picture/p2.jpg',

      videoUrl: '',
      regionForm: [{
        time_start: '23:31:16',
        time_end: '23:41:15',
        max_people_num: '1000',
        max_people_density: '5',
        max_people_speed: '0.5'
      }]
    }, {
      monitorId: '006',
      monitorDataId: 'changtaipingan',
      monitorName: '平安银行西街',
      inputTime: '2024-11-25',
      mapGroupId: '01',
      mapGroupName: '长泰广场',
      regionShape: 'rectangle', // circle: 圆形; rectangle: 长方形; trapezoid: 梯形
      acreage: '66 平方米',
      standardLength: ' 1 米',
      occupiedPixel: ' 460px',
      url: 'http://localhost:8081/picture/平安银行西街.jpg',
      videoUrl: '',
      regionForm: [{
        time_start: '23:31:16',
        time_end: '23:41:15',
        max_people_num: '1000',
        max_people_density: '5',
        max_people_speed: '0.5'
      }]
    }, {
      monitorId: '007',
      monitorDataId: 'changtaionehou',
      monitorName: '长泰广场1座后街',
      inputTime: '2024-11-25',
      mapGroupId: '01',
      mapGroupName: '长泰广场',
      regionShape: 'rectangle', // circle: 圆形; rectangle: 长方形; trapezoid: 梯形
      acreage: '102 平方米',
      standardLength: ' 1 米',
      occupiedPixel: ' 460px',
      url: 'http://localhost:8081/picture/长泰广场1座后街.jpg',
      videoUrl: '',
      regionForm: [{
        time_start: '23:31:16',
        time_end: '23:41:15',
        max_people_num: '1000',
        max_people_density: '5',
        max_people_speed: '0.5'
      }]
    }, {
      monitorId: '008',
      monitorDataId: 'changtaionehou',
      monitorName: '喜茶南门街',
      inputTime: '2024-11-25',
      mapGroupId: '02',
      mapGroupName: '金桥太茂商业中心',
      regionShape: 'rectangle', // circle: 圆形; rectangle: 长方形; trapezoid: 梯形
      acreage: '38 平方米',
      standardLength: ' 1 米',
      occupiedPixel: ' 420px',
      url: 'http://localhost:8081/picture/喜茶南门街.jpg',
      videoUrl: '',
      regionForm: [{
        time_start: '23:31:16',
        time_end: '23:41:15',
        max_people_num: '1000',
        max_people_density: '5',
        max_people_speed: '0.5'
      }]
    }, {
      monitorId: '009',
      monitorDataId: 'changtaionehou',
      monitorName: '多乐东南角',
      inputTime: '2024-11-25',
      mapGroupId: '02',
      mapGroupName: '金桥太茂商业中心',
      regionShape: 'trapezoid', // circle: 圆形; rectangle: 长方形; trapezoid: 梯形
      acreage: '19 平方米',
      standardLength: ' 1 米',
      occupiedPixel: ' 340px',
      url: 'http://localhost:8081/picture/多乐东南角.jpg',
      videoUrl: '',
      regionForm: [{
        time_start: '23:31:16',
        time_end: '23:41:15',
        max_people_num: '1000',
        max_people_density: '5',
        max_people_speed: '0.5'
      }]
    }, {
      monitorId: '010',
      monitorDataId: 'changtaionehou',
      monitorName: '特斯拉西北街',
      inputTime: '2024-11-25',
      mapGroupId: '02',
      mapGroupName: '金桥太茂商业中心',
      regionShape: 'rectangle', // circle: 圆形; rectangle: 长方形; trapezoid: 梯形
      acreage: '600 平方米',
      standardLength: ' 1 米',
      occupiedPixel: ' 420px',
      url: 'http://localhost:8081/picture/特斯拉西北街.jpg',
      videoUrl: '',
      regionForm: [{
        time_start: '23:31:16',
        time_end: '23:41:15',
        max_people_num: '1000',
        max_people_density: '5',
        max_people_speed: '0.5'
      }]
    }, {
      monitorId: '011',
      monitorDataId: 'changtaionehou',
      monitorName: 'oppo东北门街道',
      inputTime: '2024-11-25',
      mapGroupId: '02',
      mapGroupName: '金桥太茂商业中心',
      regionShape: 'rectangle', // circle: 圆形; rectangle: 长方形; trapezoid: 梯形
      acreage: '620 平方米',
      standardLength: ' 1 米',
      occupiedPixel: ' 430px',
      url: 'http://localhost:8081/picture/oppo东北门街道.jpg',
      videoUrl: '',
      regionForm: [{
        time_start: '23:31:16',
        time_end: '23:41:15',
        max_people_num: '1000',
        max_people_density: '5',
        max_people_speed: '0.5'
      }]
    }, {
      monitorId: '012',
      monitorDataId: 'changtaionehou',
      monitorName: '小米东街',
      inputTime: '2024-11-25',
      mapGroupId: '02',
      mapGroupName: '金桥太茂商业中心',
      regionShape: 'rectangle', // circle: 圆形; rectangle: 长方形; trapezoid: 梯形
      acreage: '600 平方米',
      standardLength: ' 1 米',
      occupiedPixel: ' 420px',
      url: 'http://localhost:8081/picture/小米东街.jpg',
      videoUrl: '',
      regionForm: [{
        time_start: '23:31:16',
        time_end: '23:41:15',
        max_people_num: '1000',
        max_people_density: '5',
        max_people_speed: '0.5'
      }]
    }, {
      monitorId: '013',
      monitorDataId: 'changtaionehou',
      monitorName: '南门入口区',
      inputTime: '2024-11-25',
      mapGroupId: '02',
      mapGroupName: '金桥太茂商业中心',
      regionShape: 'rectangle', // circle: 圆形; rectangle: 长方形; trapezoid: 梯形
      acreage: '400 平方米',
      standardLength: ' 1 米',
      occupiedPixel: ' 320px',
      url: 'http://localhost:8081/picture/南门入口区.jpg',
      videoUrl: '',
      regionForm: [{
        time_start: '23:31:16',
        time_end: '23:41:15',
        max_people_num: '1000',
        max_people_density: '5',
        max_people_speed: '0.5'
      }]
    }, {
      monitorId: '014',
      monitorDataId: 'changtaionehou',
      monitorName: '中庭公共区',
      inputTime: '2024-11-25',
      mapGroupId: '02',
      mapGroupName: '金桥太茂商业中心',
      regionShape: 'circle', // circle: 圆形; rectangle: 长方形; trapezoid: 梯形
      acreage: '450 平方米',
      standardLength: ' 1 米',
      occupiedPixel: ' 330px',
      url: 'http://localhost:8081/picture/中庭公共区.jpg',
      videoUrl: '',
      regionForm: [{
        time_start: '23:31:16',
        time_end: '23:41:15',
        max_people_num: '1000',
        max_people_density: '5',
        max_people_speed: '0.5'
      }]
    }
  ])
  const mapGroupList = reactive([{
    mapGroupId: '01',
    mapGroupName: '长泰广场',
    monitorList: ['001', '002', '003', '004', '005', '006', '007']
  }, {
    mapGroupId: '02',
    mapGroupName: '金桥太茂商业中心',
    monitorList: ['008', '009', '010', '011', '012', '013', '014'],
  }])
  return {
    monitorInfoList, mapGroupList
  }
})