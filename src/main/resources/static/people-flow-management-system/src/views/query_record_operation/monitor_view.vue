<template>
  <div class="monitor_view">
    <div class="monitor_choose">
      <span style="margin-right:10px;color:#000;display:inline-block;width:90px;">地图组</span>
      <el-select style="width: 200px;" v-model="mapGroup" class="m-2" placeholder="请选择">
        <el-option
            v-for="item in mapGroupOptions"
            :key="item.mapGroupId"
            :label="item.mapGroupName"
            :value="item.mapGroupId"
        />
      </el-select>
    </div>
    <el-card class="minitor_view">
      <div v-for="(item, index) in monitorList[mapGroup]" :key="index" class="block">
        <span class="demonstration">{{ item.monitorName }}</span>
        <div @click="handleTurnToMonitorViewDetail(item)">
          <el-image
            style="width: 98%; height: 180px" 
            :src="item.url" 
            fit="contain"
          />
        </div>
<!--        <video width="220" height="180" controls>-->
<!--          &lt;!&ndash; 使用动态属性绑定指定视频文件的路径 &ndash;&gt;-->
<!--          <source :src="item.url" type="video/mp4"> -->
<!--        </video>-->
      </div>
    </el-card>
    <div class="monitor_charts">
      <div ref="mainEchartsDensity" style="width: 100%; height: 350px; margin-top:20px;"></div>
      <!-- <div ref="mainEchartsSpeed" style="width: 100%; height: 400px; margin-top:20px;"></div> -->
      <div ref="mainEchartsDensitySpeed" style="width: 100%; height: 350px; margin-top:20px;"></div>
    </div>

  </div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import {ref, reactive, onMounted} from 'vue'
import {useRouter, useRoute} from 'vue-router'
import { useMonitorStore } from '@/stores/monitor'

interface MapGroup {
  mapGroupId: string,
  mapGroupName: string,
  monitorList: Array<string>
}
const router = useRouter()
const mapGroup = ref('')
const videoUrl= 'http://localhost:8081/video/喷泉中心.mp4'
const useMonitor = useMonitorStore()
const mapGroupOptions = useMonitor.mapGroupList
mapGroup.value = mapGroupOptions[0].mapGroupId
// const mapGroupOptions1 = reactive([
//   {
//     label: '长泰广场',
//     value: '1'
//   },
//   {
//     label: '金桥太茂商业中心',
//     value: '2'
//   },
// ])
const monitorInfoList = useMonitor.monitorInfoList
const monitorList = reactive({})
mapGroupOptions.forEach((item:MapGroup) => {
  const monitorInfo = []
  item.monitorList.map(val => {
    const result = monitorInfoList.filter(member => {
      return member.monitorId === val
    })
    monitorInfo.push(...result)
  })
  monitorList[item.mapGroupId] = monitorInfo
})

const handleTurnToMonitorViewDetail = (monitorInfo) => {
  console.log('click')
  router.push({
    name: 'monitorViewInfo',
    state: {
      rowData: JSON.parse(JSON.stringify(monitorInfo))
    }
  })
}
// const monitorList1: object = reactive({
//   '01': [
//     {
//       name: '喷泉中心',
//       url: 'http://localhost:8081/picture/喷泉中心.jpg'
//     },
//     {
//       name: '东庭院南街',
//       url: 'http://localhost:8081/picture/东庭院南街.jpg'
//     },
//     {
//       name: '盒马鲜生拐角',
//       url: 'http://localhost:8081/picture/盒马鲜生拐角.jpg'
//     },
//     {
//       name: '一汽大众东街',
//       url: 'http://localhost:8081/picture/一汽大众东街.jpg'
//     },
//     {
//       name: '长泰E座转角',
//       url: 'http://localhost:8081/picture/长泰E座转角.jpg'
//     },
//     {
//       name: '平安银行西街',
//       url: 'http://localhost:8081/picture/平安银行西街.jpg'
//     },
//     {
//       name: '长泰广场1座后街',
//       url: 'http://localhost:8081/picture/长泰广场1座后街.jpg'
//     }
//   ],
//   '02': [
//     {
//       name: '喜茶南门街',
//       url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
//     },
//     {
//       name: '多乐东南角',
//       url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
//     },
//     {
//       name: '特斯拉西北街',
//       url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
//     },
//     {
//       name: 'oppo东北门街道',
//       url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
//     },
//     {
//       name: '小米东街',
//       url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
//     },
//     {
//       name: '南门入口区',
//       url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
//     },
//     {
//       name: '中庭公共区',
//       url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
//     }
//   ]
// })
const mainEchartsDensity = ref()
const mainEchartsSpeed = ref()
const mainEchartsDensitySpeed = ref()
let chartData = []
let xAxisDate = []
onMounted(() => {
  getChartData().then(res => {
    console.log('res', res)
    chartData = res
    let data = {}
    chartData.forEach(item => {
      if (!data[item.monitorId]) {
        data[item.monitorId] = [item]
      } else {
        data[item.monitorId].push(item)
      }
    })
    console.log('处理后的data', data)
    let dateNum = 0
    let dateValue = null
    Object.keys(data).forEach(item => {
      if (data[item].length > dateNum) {
        dateNum = data[item].length
        dateValue = item
      }
    })
    data[dateValue].forEach(item => {
      xAxisDate.push(item.startTime)
    })
    const avgNumList = {}
    xAxisDate.forEach((item, index) => {
      Object.keys(data).forEach(element => {
        if (!avgNumList[element]) {
          avgNumList[element] = {}
          avgNumList[element]['avgSpeed'] = []
          avgNumList[element]['avgDensity'] = []
          avgNumList[element]['avgNum'] = []
          avgNumList[element]['avgSpeed'].length = xAxisDate.length
          avgNumList[element]['avgDensity'].length = xAxisDate.length
          avgNumList[element]['avgNum'].length = xAxisDate.length
        }
        let compareDate = data[element].filter(ele => {
          return ele.startTime === item
        })
        if (compareDate.length !== 0) {
          console.log('compareDate', compareDate)
          avgNumList[element]['avgSpeed'][index] = compareDate[0].avgSpeed
          avgNumList[element]['avgDensity'][index] = compareDate[0].avgDensity
          avgNumList[element]['avgNum'][index] = compareDate[0].avgNum

        }
      })
    })
    console.log('avgNumList', avgNumList)
    initDensity(avgNumList)
    // initSpeed()
    initDensitySpeed(avgNumList)
  })
  

})

function initDensity(yData) {
  // 基于准备好的dom，初始化echarts实例
  var myChartDensity = echarts.init(mainEchartsDensity.value);

  // 指定图表的配置项和数据
  var option = {
    title: {
      text: '人群数量与时间关系图'
    },
    tooltip: {},
    legend: {
      orient: 'vertical',
      right: 10,
      top: '0'
    },
    xAxis: {
      axisLine: {
        symbol: ['none', 'arrow']
      },
      type: 'category',
      name: '时间',
      // data: ['2023-10-01 17:32:00', '2023-10-01 17:33:00', '2023-10-01 17:34:00', '2023-10-01 17:35:00', '2023-10-01 17:36:00', '2023-10-01 17:37:00']
      data: xAxisDate
    },
    yAxis: {
      axisLine: {
        show: true,
        symbol: ['none', 'arrow']
      },
      name: '数量',
      type: 'value'
    },
    series: [
      {
        name: '喷泉中心',
        type: 'line',
        data: yData.changtaipqcenter.avgNum
      }, {
        name: '东庭院南街',
        type: 'line',
        data: yData.changtainj.avgNum
      }, {
        name: '盒马鲜生拐角',
        type: 'line',
        data: yData.changtaihm.avgNum
      }, {
        name: '一汽大众东街',
        type: 'line',
        data: yData.changtaiyqdazhong.avgNum
      }, {
        name: '长泰E座转角',
        type: 'line',
        data: yData.changtaiEzhuanjiao.avgNum
      }, {
        name: '平安银行西街',
        type: 'line',
        data: yData.changtaipingan.avgNum
      },{
        name: '长泰广场1座后街',
        type: 'line',
        data: yData.changtaionehou.avgNum
      },

    ]
  };
  // 使用刚指定的配置项和数据显示图表。
  myChartDensity.setOption(option);
}

function initSpeed() {
  var myChartSpeed = echarts.init(mainEchartsSpeed.value);
  var option1 = {
    title: {
      text: '人群速度分布图'
    },
    tooltip: {},
    legend: {
      orient: 'vertical',
      right: 10,
      top: '0'
    },
    xAxis: {
      axisLine: {
        symbol: ['none', 'arrow']
      },
      type: 'category',
      name: '时间',
      data: ['2023-10-01 17:32:00', '2023-10-01 17:33:00', '2023-10-01 17:34:00', '2023-10-01 17:35:00', '2023-10-01 17:36:00', '2023-10-01 17:37:00']
    },
    yAxis: {
      axisLine: {
        show: true,
        symbol: ['none', 'arrow']
      },
      name: ' 平均速度 km/h',
      type: 'value'
    },
    series: [
      {
        name: '喷泉中心',
        type: 'line',
        data: [1, 1.2, 1.5, 1.8, 1.3, 2]
      }, {
        name: '东庭院南街',
        type: 'line',
        data: [1.3, 1.7, 2, 1.2, 1.5, 2.2]
      }, {
        name: '盒马鲜生拐角',
        type: 'line',
        data: [1.2, 1.7, 1.6, 1.6, 1.5, 1.4]
      }, {
        name: '一汽大众东街',
        type: 'line',
        data: [1.6, 1.7, 2, 2.1, 2.1, 1.8]
      }, {
        name: '长泰E座转角',
        type: 'line',
        data: [1.6, 1.5, 1.6, 1.6, 1.8, 1.7]
      }, {
        name: '平安银行西街',
        type: 'line',
        data: [2, 2.2, 1.7, 1.9, 1.6, 1.8]
      },{
        name: '长泰广场1座后街',
        type: 'line',
        data: [1.8, 1.7, 1.6, 1.5, 1.7, 1.5]
      },

    ]
  }
  myChartSpeed.setOption(option1);
}

function initDensitySpeed(yData) {
  var myChartDensitySpeed = echarts.init(mainEchartsDensitySpeed.value);
  var option2 = {
    title: {
      text: '人群密度与速度柱状图'
    },
    tooltip: {},
    legend: {
      orient: 'vertical',
      right: 10,
      top: '0'
    },
    xAxis: {
      axisLine: {
        symbol: ['none', 'arrow']
      },
      name: '地图组',
      // data: ['2023-10-01 17:32:00', '2023-10-01 17:33:00', '2023-10-01 17:34:00', '2023-10-01 17:35:00', '2023-10-01 17:36:00', '2023-10-01 17:37:00']
      data: xAxisDate
    },
    yAxis: {
      axisLine: {
        show: true,
        symbol: ['none', 'arrow']
      },
      name: 'm²/人  m/s',
      type: 'value'
    },
    series: [
      {
        // name: '金街 1 号速度',
        type: 'bar',
        data: yData.changtaipqcenter.avgSpeed
      }, {
        // name: '金街 2 号速度',
        type: 'bar',
        data: yData.changtaipqcenter.avgDensity
      }
    ]
  }
  myChartDensitySpeed.setOption(option2);
}
const getChartData = () => {
  return new Promise((res, rej) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:8081/calculation/queryDate', true); // 第三个参数true表示异步请求，false表示同步请求（不推荐使用）
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    const data = {
      monitorId: "all"
    };
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          // console.log('success', xhr.responseText); // 响应内容
          res(JSON.parse(xhr.responseText))
        } else {
          console.error('Error:', xhr.status); // 请求出错
        }
      }
    };
    xhr.send(JSON.stringify(data));
  })
}
</script>
<style scoped lang="scss">
.monitor_view {
  .monitor_choose {
    display: flex;
    align-items: center;
  }

  .minitor_view {
    text-align: left;
    margin-top: 20px;

    .block {
      padding-bottom: 5px;
      text-align: center;
      display: inline-block;
      width: 25%;
      box-sizing: border-box;
      vertical-align: top;
    }

    // .block:last-child {
    //   border-right: none;
    // }
    .demonstration {
      display: block;
      color: var(--el-text-color-secondary);
      font-size: 14px;
      margin-bottom: 10px;
    }
  }
  .monitor_charts {
    // display: flex;
    // justify-content: space-around;
  }
}
</style>