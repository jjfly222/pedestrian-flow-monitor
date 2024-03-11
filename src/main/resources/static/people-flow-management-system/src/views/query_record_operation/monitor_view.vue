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
        <el-image style="width: 250px; height: 180px" :src="item.url" fit="contain"/>
<!--        <video width="220" height="180" controls>-->
<!--          &lt;!&ndash; 使用动态属性绑定指定视频文件的路径 &ndash;&gt;-->
<!--          <source :src="item.url" type="video/mp4"> -->
<!--        </video>-->
      </div>
    </el-card>
    <div ref="mainEchartsDensity" style="width: 100%; height: 400px; margin-top:20px;"></div>
    <div ref="mainEchartsSpeed" style="width: 100%; height: 400px; margin-top:20px;"></div>
    <div ref="mainEchartsDensitySpeed" style="width: 100%; height: 400px; margin-top:20px;"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import {ref, reactive, onMounted} from 'vue'

const mapGroup = ref('1')
const videoUrl= 'http://localhost:8081/video/喷泉中心.mp4'
const mapGroupOptions = reactive([
  {
    label: '长泰广场',
    value: '1'
  },
  {
    label: '金桥太茂商业中心',
    value: '2'
  },
])
const monitorList: object = reactive({
  '1': [
    {
      name: '喷泉中心',
      // url: 'http://localhost:8081/video/喷泉中心.mp4'
      url: 'http://localhost:8081/picture/喷泉中心.jpg'
    },
    {
      name: '东庭院南街',
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    },
    {
      name: '盒马鲜生拐角',
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    },
    {
      name: '一汽大众东街',
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    },
    {
      name: '长泰E座转角',
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    },
    {
      name: '平安银行西街',
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    },
    {
      name: '长泰广场1座后街',
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    }
  ],
  '2': [
    {
      name: '喜茶南门街',
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    },
    {
      name: '多乐东南角',
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    },
    {
      name: '特斯拉西北街',
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    },
    {
      name: 'oppo东北门街道',
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    },
    {
      name: '小米东街',
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    },
    {
      name: '南门入口区',
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    },
    {
      name: '中庭公共区',
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
      text: '人流量与时间关系图'
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
      name: '人群密度 人/100平方米',
      type: 'value'
    },
    series: [
      {
        name: '喷泉中心',
        type: 'line',
        data: [5, 20, 36, 10, 10, 20]
      }, {
        name: '东庭院南街',
        type: 'line',
        data: [2, 3, 20, 19, 19, 19]
      }, {
        name: '盒马鲜生拐角',
        type: 'line',
        data: [19, 23, 8, 3, 0, 0]
      }, {
        name: '一汽大众东街',
        type: 'line',
        data: [8, 8, 9, 10, 12, 9]
      }, {
        name: '长泰E座转角',
        type: 'line',
        data: [9, 7, 3, 6, 10, 9]
      }, {
        name: '平安银行西街',
        type: 'line',
        data: [18, 22, 25, 29, 30, 32]
      },{
        name: '长泰广场1座后街',
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

function initDensitySpeed() {
  var myChartDensitySpeed = echarts.init(mainEchartsDensitySpeed.value);
  var option2 = {
    title: {
      text: '人流量与速度柱状图'
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
      }, {
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