import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import { v4 as uuidv4 } from 'uuid';

interface RegionForm {
  time_start: string;
  time_end: string;
  max_people_num: string;
  max_people_density: string;
  max_people_speed: string;
}

interface Monitor {
  monitorId: string,
  monitorName: string,
  inputTime: string,
  mapGroupId: string,
  mapGroupName: string,
  regionShape: string, // circle: 圆形; rectangle: 长方形; trapezoid: 梯形
  acreage: string,
  standardLength: string,
  occupiedPixel: string,
  url: string,
  regionForm: RegionForm[]
}
export const useMonitorStore = defineStore('monitorList', () => {
  const monitorInfoList = reactive<Monitor[]>([
    {
      monitorId: '001',
      monitorName: '喷泉中心',
      inputTime: '2024-02-25',
      mapGroupId: '01',
      mapGroupName: '长泰广场',
      regionShape: 'circle', // circle: 圆形; rectangle: 长方形; trapezoid: 梯形
      acreage: '450 平方米',
      standardLength: ' 1 米',
      occupiedPixel: '300px',
      url: 'http://localhost:8081/picture/喷泉中心.jpg',
      regionForm: [{
        time_start: '23:31:16',
        time_end: '23:41:15',
        max_people_num: '1000',
        max_people_density: '5',
        max_people_speed: '0.5'
      }]
    }, {
      monitorId: '002',
      monitorName: '东庭院南街',
      inputTime: '2024-02-25',
      mapGroupId: '01',
      mapGroupName: '长泰广场',
      regionShape: 'rectangle', // circle: 圆形; rectangle: 长方形; trapezoid: 梯形
      acreage: '800 平方米',
      standardLength: ' 1 米',
      occupiedPixel: ' 500px',
      url: 'http://localhost:8081/picture/东庭院南街.jpg',
      regionForm: [{
        time_start: '23:31:16',
        time_end: '23:41:15',
        max_people_num: '1000',
        max_people_density: '5',
        max_people_speed: '0.5'
      }]
    }, {
      monitorId: '003',
      monitorName: '盒马鲜生拐角',
      inputTime: '2024-02-26',
      mapGroupId: '01',
      mapGroupName: '长泰广场',
      regionShape: 'trapezoid', // circle: 圆形; rectangle: 长方形; trapezoid: 梯形
      acreage: '500 平方米',
      standardLength: ' 1 米',
      occupiedPixel: '380px',
      url: 'http://localhost:8081/picture/盒马鲜生拐角.jpg',
      regionForm: [{
        time_start: '23:31:16',
        time_end: '23:41:15',
        max_people_num: '1000',
        max_people_density: '5',
        max_people_speed: '0.5'
      }]
    }, {
      monitorId: '004',
      monitorName: '一汽大众东街',
      inputTime: '2024-02-26',
      mapGroupId: '01',
      mapGroupName: '长泰广场',
      regionShape: 'rectangle', // circle: 圆形; rectangle: 长方形; trapezoid: 梯形
      acreage: '800 平方米',
      standardLength: ' 1 米',
      occupiedPixel: ' 520px',
      url: 'http://localhost:8081/picture/一汽大众东街.jpg',
      regionForm: [{
        time_start: '23:31:16',
        time_end: '23:41:15',
        max_people_num: '1000',
        max_people_density: '5',
        max_people_speed: '0.5'
      }]
    }, {
      monitorId: '005',
      monitorName: '长泰E座转角',
      inputTime: '2024-02-26',
      mapGroupId: '01',
      mapGroupName: '长泰广场',
      regionShape: 'trapezoid', // circle: 圆形; rectangle: 长方形; trapezoid: 梯形
      acreage: '500 平方米',
      standardLength: ' 1 米',
      occupiedPixel: ' 380px',
      url: 'http://localhost:8081/picture/长泰E座转角.jpg',
      regionForm: [{
        time_start: '23:31:16',
        time_end: '23:41:15',
        max_people_num: '1000',
        max_people_density: '5',
        max_people_speed: '0.5'
      }]
    }, {
      monitorId: '006',
      monitorName: '平安银行西街',
      inputTime: '2024-02-26',
      mapGroupId: '01',
      mapGroupName: '长泰广场',
      regionShape: 'rectangle', // circle: 圆形; rectangle: 长方形; trapezoid: 梯形
      acreage: '700 平方米',
      standardLength: ' 1 米',
      occupiedPixel: ' 460px',
      url: 'http://localhost:8081/picture/平安银行西街.jpg',
      regionForm: [{
        time_start: '23:31:16',
        time_end: '23:41:15',
        max_people_num: '1000',
        max_people_density: '5',
        max_people_speed: '0.5'
      }]
    }, {
      monitorId: '007',
      monitorName: '长泰广场1座后街',
      inputTime: '2024-02-26',
      mapGroupId: '01',
      mapGroupName: '长泰广场',
      regionShape: 'rectangle', // circle: 圆形; rectangle: 长方形; trapezoid: 梯形
      acreage: '700 平方米',
      standardLength: ' 1 米',
      occupiedPixel: ' 460px',
      url: 'http://localhost:8081/picture/长泰广场1座后街.jpg',
      regionForm: [{
        time_start: '23:31:16',
        time_end: '23:41:15',
        max_people_num: '1000',
        max_people_density: '5',
        max_people_speed: '0.5'
      }]
    }, {
      monitorId: '008',
      monitorName: '喜茶南门街',
      inputTime: '2024-02-26',
      mapGroupId: '02',
      mapGroupName: '金桥太茂商业中心',
      regionShape: 'rectangle', // circle: 圆形; rectangle: 长方形; trapezoid: 梯形
      acreage: '600 平方米',
      standardLength: ' 1 米',
      occupiedPixel: ' 420px',
      url: 'http://localhost:8081/picture/喜茶南门街.jpg',
      regionForm: [{
        time_start: '23:31:16',
        time_end: '23:41:15',
        max_people_num: '1000',
        max_people_density: '5',
        max_people_speed: '0.5'
      }]
    }, {
      monitorId: '009',
      monitorName: '多乐东南角',
      inputTime: '2024-02-26',
      mapGroupId: '02',
      mapGroupName: '金桥太茂商业中心',
      regionShape: 'trapezoid', // circle: 圆形; rectangle: 长方形; trapezoid: 梯形
      acreage: '420 平方米',
      standardLength: ' 1 米',
      occupiedPixel: ' 340px',
      url: 'http://localhost:8081/picture/多乐东南角.jpg',
      regionForm: [{
        time_start: '23:31:16',
        time_end: '23:41:15',
        max_people_num: '1000',
        max_people_density: '5',
        max_people_speed: '0.5'
      }]
    }, {
      monitorId: '010',
      monitorName: '特斯拉西北街',
      inputTime: '2024-02-26',
      mapGroupId: '02',
      mapGroupName: '金桥太茂商业中心',
      regionShape: 'rectangle', // circle: 圆形; rectangle: 长方形; trapezoid: 梯形
      acreage: '600 平方米',
      standardLength: ' 1 米',
      occupiedPixel: ' 420px',
      url: 'http://localhost:8081/picture/特斯拉西北街.jpg',
      regionForm: [{
        time_start: '23:31:16',
        time_end: '23:41:15',
        max_people_num: '1000',
        max_people_density: '5',
        max_people_speed: '0.5'
      }]
    }, {
      monitorId: '011',
      monitorName: 'oppo东北门街道',
      inputTime: '2024-02-26',
      mapGroupId: '02',
      mapGroupName: '金桥太茂商业中心',
      regionShape: 'rectangle', // circle: 圆形; rectangle: 长方形; trapezoid: 梯形
      acreage: '620 平方米',
      standardLength: ' 1 米',
      occupiedPixel: ' 430px',
      url: 'http://localhost:8081/picture/oppo东北门街道.jpg',
      regionForm: [{
        time_start: '23:31:16',
        time_end: '23:41:15',
        max_people_num: '1000',
        max_people_density: '5',
        max_people_speed: '0.5'
      }]
    }, {
      monitorId: '012',
      monitorName: '小米东街',
      inputTime: '2024-02-26',
      mapGroupId: '02',
      mapGroupName: '金桥太茂商业中心',
      regionShape: 'rectangle', // circle: 圆形; rectangle: 长方形; trapezoid: 梯形
      acreage: '600 平方米',
      standardLength: ' 1 米',
      occupiedPixel: ' 420px',
      url: 'http://localhost:8081/picture/小米东街.jpg',
      regionForm: [{
        time_start: '23:31:16',
        time_end: '23:41:15',
        max_people_num: '1000',
        max_people_density: '5',
        max_people_speed: '0.5'
      }]
    }, {
      monitorId: '013',
      monitorName: '南门入口区',
      inputTime: '2024-02-26',
      mapGroupId: '02',
      mapGroupName: '金桥太茂商业中心',
      regionShape: 'rectangle', // circle: 圆形; rectangle: 长方形; trapezoid: 梯形
      acreage: '400 平方米',
      standardLength: ' 1 米',
      occupiedPixel: ' 320px',
      url: 'http://localhost:8081/picture/南门入口区.jpg',
      regionForm: [{
        time_start: '23:31:16',
        time_end: '23:41:15',
        max_people_num: '1000',
        max_people_density: '5',
        max_people_speed: '0.5'
      }]
    }, {
      monitorId: '014',
      monitorName: '中庭公共区',
      inputTime: '2024-02-26',
      mapGroupId: '02',
      mapGroupName: '金桥太茂商业中心',
      regionShape: 'circle', // circle: 圆形; rectangle: 长方形; trapezoid: 梯形
      acreage: '450 平方米',
      standardLength: ' 1 米',
      occupiedPixel: ' 330px',
      url: 'http://localhost:8081/picture/中庭公共区.jpg',
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