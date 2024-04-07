<template>
  <div class="monitor_view_info">
    <div class="monitor">
      <div class="monitor_video">
        <div style="position:relative; height:32px;">
          <el-button type="primary" style="position:absolute; left:0;">切换</el-button>
          <span>{{ monitorData.monitorName }}</span>
        </div>
        <el-image
          style="width: 100%; height: 400px" 
          :src="monitorData.url" 
          fit="contain"
        />
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
        <div ref="monitorSpeedSituation" style="width: 100%; height: 400px; margin-top:20px;"></div>
      </div>
    </div>
    <el-divider content-position="left">监控情况</el-divider>
    <div class="monitor_charts">
      <div ref="monitorSituationToday" style="width: 100%; height: 400px; margin-top:20px;"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from "echarts"
import { ref, reactive, onMounted, onUnmounted } from 'vue'
let monitorData = ref({})
const monitorSituationToday = ref()
const monitorSpeedSituation = ref()
let monitorSpeedSituationChart = null
let speedChartData: Array<Object> = []
onMounted(() => {
  if (history.state.rowData) {
    monitorData.value = JSON.parse(JSON.stringify(history.state.rowData))
  }
  // initMonitorSituation()
  // initMonitorSpeedSituation()
  window.addEventListener('resize', resizeChart);
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://localhost:8081/calculation/queryDate', true); // 第三个参数true表示异步请求，false表示同步请求（不推荐使用）
  xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
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
  xhr.send();
})

onUnmounted(() => {
  window.removeEventListener('resize', resizeChart);
});

const resizeChart = () => {
  if (monitorSpeedSituationChart) {
    monitorSpeedSituationChart.resize();
  }
};
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
}
</style>