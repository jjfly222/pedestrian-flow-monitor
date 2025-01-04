<template>
  <div class="monitor_view_info">
    <div class="monitor">
      <div class="monitor_video">
        <div style="position:relative; height:32px;">
          <el-button type="primary" style="position:absolute; left:0;" @click="handleCheck">切换</el-button>
          <span style=" font-size:20px;font-weight: bold;" >{{ monitorData.monitorName }}</span>
        </div>
        <el-image
            v-if="monitorData.monitorName!=='喷泉中心1' && showImg"
            style="width: 100%; height: 400px"
            :src="monitorData.url"
            fit="contain"
        />
        <video v-if="monitorData.monitorName==='喷泉中心1' && showImg" controls width=100% height=400px>
          <source :src="monitorData.videoUrl" type="video/mp4">
        </video>
        <el-image
            v-if="monitorData.monitorName!=='喷泉中心1' && !showImg"
            style="width: 100%; height: 400px"
            :src="monitorData.url"
            fit="contain"
        />
        <video v-if="monitorData.monitorName==='喷泉中心1' &&!showImg" controls width=100% height=400px>
          <source src="http://localhost:8081/video/temple_1.mp4" type="video/mp4">
        </video>
        <!--        <video v-if="!showImg" width=100% height=400px controls>-->
        <!--          &lt;!&ndash; 指定视频文件的路径 &ndash;&gt;-->
        <!--          <source src="http://localhost:8081/video/喷泉中心.mp4" type="video/mp4">-->
        <!--        </video>-->
        <!--        <video :src="monitorData.videoUrl" v-if="!showImg" width="200" height="150"></video>-->
      </div>
      <el-divider direction="vertical" style="height: 400px;" />
      <div class="monitor_info">
        <!-- <el-descriptions
          title="监控详情"
          :column="3"
        >
          <template>
              <el-descriptions-item label="监控名称">{{ monitorData.monitorName }}</el-descriptions-item>
              <el-descriptions-item label="录入时间">{{ monitorData.inputTime }}</el-descriptions-item>
              <el-descriptions-item label="所属分组">{{ monitorData.mapGroupName }}</el-descriptions-item>
              <el-descriptions-item label="区域形状">{{ monitorData.regionShape }}</el-descriptions-item>
              <el-descriptions-item label="区域面积">{{ monitorData.acreage==='circle'?'圆形':monitorData.acreage==='rectangle'?'长方形':'梯形' }}</el-descriptions-item>
              <el-descriptions-item label="标准长度">{{ monitorData.standardLength }}</el-descriptions-item>
              <el-descriptions-item label="占用像素" :span="3">{{ monitorData.occupiedPixel }}</el-descriptions-item>
              <el-descriptions-item :span="3">
                <el-divider style="margin: 0;" />
              </el-descriptions-item>
              <template v-for="(item, index) in monitorData.regionForm" :key="index">
                <el-descriptions-item :label="'时间范围' + (index + 1)">{{ item.time_start + '--' + item.time_end }}</el-descriptions-item>
                <el-descriptions-item label="最大人数">{{ item.max_people_num }}</el-descriptions-item>
                <el-descriptions-item label="密度">{{ item.max_people_density }}</el-descriptions-item>
                <el-descriptions-item label="对应平均最小移动速度" :span="2">{{ item.max_people_speed }}</el-descriptions-item>
              </template>
          </template>
        </el-descriptions> -->
        <div ref="pedestrianFlowMonitoring" style="width: 100%; height: 400px; margin-top:20px;"></div>
      </div>
    </div>
    <el-divider content-position="left">监控情况</el-divider>
    <div class="monitor_charts">
      <div ref="monitorSituationToday" style="width: 100%; height: 400px; margin-top:20px;"></div>
      <div ref="monitorSpeedSituation" style="width: 100%; height: 400px; margin-top:20px;"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from "echarts"
import { ref, reactive, onMounted, onUnmounted } from 'vue'
let monitorData = ref({})
const pedestrianFlowMonitoring = ref()
const monitorSituationToday = ref()
const monitorSpeedSituation = ref()
const showImg = ref(true)
let monitorSpeedSituationChart = null
let speedChartData: Array<Object> = []
let peopleFlowData: Array<Object> = []
onMounted(() => {
  if (history.state.rowData) {
    monitorData.value = JSON.parse(JSON.stringify(history.state.rowData))
  }
  // initMonitorSituation()
  // initMonitorSpeedSituation()
  window.addEventListener('resize', resizeChart);
  handleQueryDate()
  handleQueryPeopleDate()
})

onUnmounted(() => {
  window.removeEventListener('resize', resizeChart);
});

const resizeChart = () => {
  if (monitorSpeedSituationChart) {
    monitorSpeedSituationChart.resize();
  }
};
const handleQueryDate = () => {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://localhost:8081/calculation/queryDate', true); // 第三个参数true表示异步请求，false表示同步请求（不推荐使用）
  // xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        // console.log('success', xhr.responseText); // 响应内容
        speedChartData = JSON.parse(xhr.responseText)
        initMonitorSituation()
        initMonitorSpeedSituation()
      } else {
        console.error('Error:', xhr.status); // 请求出错
      }
    }
  };
  // ${monitorData.value.monitorDataId}
  console.log('monitorData.value', monitorData)
  const params = 'monitorId=' + monitorData.value.monitorDataId;
  xhr.send(params);
}
const handleQueryPeopleDate = () => {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://localhost:8081/calculation/queryPeopleDate', true); // 第三个参数true表示异步请求，false表示同步请求（不推荐使用）
  // xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        // console.log('success', xhr.responseText); // 响应内容
        peopleFlowData = JSON.parse(xhr.responseText)
        initPedestrianFlowMonitoring()
      } else {
        console.error('Error:', xhr.status); // 请求出错
      }
    }
  };
  // ${monitorData.value.monitorDataId}
  console.log('monitorData.value', monitorData)
  const params = 'monitorId=' + monitorData.value.monitorDataId;
  xhr.send(params);
}
const initMonitorSituation = () => {
  const monitorSituationTodayChart = echarts.init(monitorSituationToday.value)
  let base = +new Date(2023, 1, 1);
  let oneDay = 24 * 3600 * 1000;

  // let data = [[base, Math.random() * 300]];
  let data = [];

  for (let i = 0; i < speedChartData.length; i++) {
    // let now = new Date((base += oneDay));
    let now = new Date(speedChartData[i].startTime)
    // data.push([+now, Math.abs(Math.round((Math.random() - 0.5) * 20 + data[i - 1][1]))]);
    data.push([+now, speedChartData[i].avgNum]);
  }


  const option = {
    tooltip: {
      trigger: 'axis',
      position: function (pt) {
        return [pt[0], '10%'];
      }
    },
    title: {
      left: 'center',
      text: '人群数量与时间关系'
    },
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: 'none'
        },
        restore: {},
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'time',
      boundaryGap: false
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, '100%']
    },
    dataZoom: [
      {
        type: 'inside',
        start: 0,
        end: 20
      },
      {
        start: 0,
        end: 20
      }
    ],
    series: [
      {
        name: '人流量',
        type: 'line',
        smooth: true,
        symbol: 'none',
        areaStyle: {},
        data: data
      }
    ]
  };
  monitorSituationTodayChart.setOption(option)
}

const initMonitorSpeedSituation = () => {
  monitorSpeedSituationChart = echarts.init(monitorSpeedSituation.value)
  let base = +new Date(2023, 1, 1);
  let oneDay = 24 * 3600 * 1000;

  let data = [];

  for (let i = 0; i < speedChartData.length; i++) {
    // let now = new Date((base += oneDay));
    let now = new Date(speedChartData[i].startTime)
    // data.push([+now, Math.abs(Math.round((Math.random() - 0.5) * 20 + data[i - 1][1]))]);
    data.push([+now, speedChartData[i].avgSpeed]);
  }

  const option = {
    tooltip: {
      trigger: 'axis',
      position: function (pt) {
        return [pt[0], '10%'];
      }
    },
    title: {
      left: 'center',
      text: '人群速度与时间关系'
    },
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: 'none'
        },
        restore: {},
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'time',
      boundaryGap: false
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, '100%']
    },
    dataZoom: [
      {
        type: 'inside',
        start: 0,
        end: 20
      },
      {
        start: 0,
        end: 20
      }
    ],
    series: [
      {
        name: '人群速度',
        type: 'line',
        smooth: true,
        symbol: 'none',
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(70,255,113)'
            },
            {
              offset: 1,
              color: 'rgb(70,255,107)'
            }
          ])
        },
        data: data,
        itemStyle: {
          color: 'rgb(132,255,70)'
        },

      }
    ]
  };
  monitorSpeedSituationChart.setOption(option)
}
const initPedestrianFlowMonitoring = () => {
  const pedestrianFlowMonitoringChart = echarts.init(pedestrianFlowMonitoring.value)
  let base = +new Date(2023, 1, 1);
  let oneDay = 24 * 3600 * 1000;

  let data = [];

  for (let i = 0; i < peopleFlowData.length; i++) {
    // let now = new Date((base += oneDay));
    let now = new Date(peopleFlowData[i].startTime)
    // data.push([+now, Math.abs(Math.round((Math.random() - 0.5) * 20 + data[i - 1][1]))]);
    data.push([+now, peopleFlowData[i].avgNum]);

  }

  const option = {
    tooltip: {
      trigger: 'axis',
      position: function (pt) {
        return [pt[0], '10%'];
      },
      axisPointer: {
        type: 'shadow',
        label: {
          show: true
        }
      }
    },
    title: {
      left: 'center',
      text: '客流量监控'
    },
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: 'none'
        },
        restore: {},
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'time',
      boundaryGap: false,
      nameTextStyle: {
        fontSize: 16,  // 设置x轴名称的字体大小
        color: '#333', // 设置x轴名称的颜色（可选）
        fontWeight: 'bold' // 设置字体加粗（可选）
      },
      axisLabel: {
        fontSize: 18,  // 设置x轴刻度值的字体大小
        color: '#666', // 设置x轴刻度值的颜色（可选）
        // rotate: 45     // 设置x轴刻度值旋转角度（可选）
      },
    },
    yAxis: {
      type: 'value',
      name: '客流量（人次）',
      scale: true,
      nameTextStyle: {
        fontSize: 16,  // 设置y轴名称的字体大小
        color: '#333', // 设置y轴名称的颜色（可选）
        fontWeight: 'bold' // 设置字体加粗（可选）
      },
      axisLabel: {
        fontSize: 20,  // 设置y轴刻度值的字体大小
        color: '#666'  // 设置y轴刻度值的颜色（可选）
      }

    },
    dataZoom: [
      {
        type: 'inside',
        start: 0,
        end: 20
      },
      {
        start: 0,
        end: 20
      }
    ],
    series: [
      {
        name: '客流量',
        type: 'bar',
        smooth: true,
        symbol: 'none',

        // areaStyle: {
        //   color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        //     {
        //       offset: 0,
        //       color: 'rgb(70,255,113)'
        //     },
        //     {
        //       offset: 1,
        //       color: 'rgb(70,255,107)'
        //     }
        //   ])
        // },
        data: data,
        itemStyle: {
          color: 'rgb(135, 206, 235)'
        },

      }
    ]
  };
  pedestrianFlowMonitoringChart.setOption(option)
}
const handleCheck = () => {
  showImg.value = !showImg.value
}

</script>
<style scoped lang="scss">
.monitor_view_info{
  color: #000;
  .monitor {
    display: flex;
    .monitor_video {
      width: 50%;
    }
    .monitor_info {
      width: 50%;
      height: 300px;
    }
  }
  .monitor_charts {
    display: flex;
  }
}
</style>