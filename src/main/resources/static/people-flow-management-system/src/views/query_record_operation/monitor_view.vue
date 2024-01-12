<template>
 <div class="monitor_view">
  <div class="monitor_choose">
    <span style="margin-right:10px;">地图组</span>
    <el-select v-model="mapGroup" class="m-2" placeholder="请选择">
      <el-option
        v-for="item in mapGroupOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </div>
  <el-card class="minitor_view">
    <div v-for="(item, index) in monitorList[mapGroup]" :key="index" class="block">
      <span class="demonstration">{{ item.name }}</span>
      <el-image style="width: 100px; height: 100px" :src="item.url" fit="contain" />
    </div>
  </el-card>
  <div ref="mainEchartsDensity" style="width: 100%; height: 400px; margin-top:20px;"></div>
  <div ref="mainEchartsSpeed" style="width: 100%; height: 400px; margin-top:20px;"></div>
  <div ref="mainEchartsDensitySpeed" style="width: 100%; height: 400px; margin-top:20px;"></div>
 </div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { ref, reactive, onMounted } from 'vue'

const mapGroup = ref('1')

const mapGroupOptions = reactive([
  {
    label: '老庙黄金',
    value: '1'
  },
  {
    label: '苏州观前街',
    value: '2'
  },
])
const monitorList:object = reactive({
  '1': [
          {
            name: '金街 1 号',
            url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
          },
          {
            name: '金街 2 号',
            url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
          },
          {
            name: '金街 3 号',
            url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
          },
          {
            name: '金街 4 号',
            url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
          },
          {
            name: '金街 5 号',
            url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
          },
          {
            name: '金街 6 号',
            url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
          }
        ],
  '2': [
          {
            name: '观前街 1 号',
            url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
          },
          {
            name: '观前街 2 号',
            url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
          }
  ]
})
const mainEchartsDensity = ref()
const mainEchartsSpeed = ref()
const mainEchartsDensitySpeed = ref()
onMounted(() => {
  initDensity()
  initSpeed()
  initDensitySpeed()
})
function initDensity() {
  // 基于准备好的dom，初始化echarts实例
  var myChartDensity = echarts.init(mainEchartsDensity.value);

  // 指定图表的配置项和数据
  var option = {
    title: {
      text: 'ECharts 入门示例'
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
      name: '人群密度 人/平方米',
      type: 'value'
    },
    series: [
      {
        name: '金街 1 号人流量',
        type: 'line',
        data: [5, 20, 36, 10, 10, 20]
      },{
        name: '金街 2 号人流量',
        type: 'line',
        data: [2, 3, 20, 19, 19, 19]
      },{
        name: '金街 3 号人流量',
        type: 'line',
        data: [19, 23, 8, 3, 0, 0]
      },{
        name: '金街 4 号人流量',
        type: 'line',
        data: [8, 8, 9, 10, 12, 9]
      },{
        name: '金街 5 号人流量',
        type: 'line',
        data: [9, 7, 3, 6, 10, 9]
      },{
        name: '金街 6 号人流量',
        type: 'line',
        data: [18, 22, 25, 29, 30, 32]
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
      text: 'ECharts 入门示例'
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
        name: '金街 1 号速度',
        type: 'line',
        data: [5, 20, 36, 10, 10, 20]
      },{
        name: '金街 2 号速度',
        type: 'line',
        data: [2, 3, 20, 19, 19, 19]
      },{
        name: '金街 3 号速度',
        type: 'line',
        data: [19, 23, 8, 3, 0, 0]
      },{
        name: '金街 4 号速度',
        type: 'line',
        data: [8, 8, 9, 10, 12, 9]
      },{
        name: '金街 5 号速度',
        type: 'line',
        data: [9, 7, 3, 6, 10, 9]
      },{
        name: '金街 6 号速度',
        type: 'line',
        data: [18, 22, 25, 29, 30, 32]
      },

    ]
  }
  myChartSpeed.setOption(option1);
}
function initDensitySpeed() {
  var myChartDensitySpeed = echarts.init(mainEchartsDensitySpeed.value);
  var option2 = {
    title: {
      text: 'ECharts 入门示例'
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
      data: ['2023-10-01 17:32:00', '2023-10-01 17:33:00', '2023-10-01 17:34:00', '2023-10-01 17:35:00', '2023-10-01 17:36:00', '2023-10-01 17:37:00']
    },
    yAxis: {
      axisLine: {
        show: true,
        symbol: ['none', 'arrow']
      },
      // name: ' 平均速度 km/h',
      // type: 'value'
    },
    series: [
      {
        // name: '金街 1 号速度',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      },{
        // name: '金街 2 号速度',
        type: 'bar',
        data: [2, 3, 20, 19, 19, 19]
      }
    ]
  }
  myChartDensitySpeed.setOption(option2);
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
      padding: 30px 0;
      text-align: center;
      // border-right: solid 1px var(--el-border-color);
      display: inline-block;
      width: 20%;
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
      margin-bottom: 20px;
    }
  }
}
</style>