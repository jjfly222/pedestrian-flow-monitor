<template>
  <div class="home">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="box-card">
          <div ref="monitorSituationToday" style="width: 100%; height: 400px; margin-top:20px;"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <div ref="mapGroupMonitorsData" style="width: 100%; height: 400px; margin-top:20px;"></div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span> 历年预警统计 </span>
            </div>
          </template>
          <div ref="warningSituationOverYears" style="width: 100%; height: 581px; margin-top:20px;"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <el-calendar ref="calendar">
            <template #header="{ date }">
              <span>预警处理日历</span>
              <span>{{ date }}</span>
              <el-button-group>
                <el-button size="small" @click="selectDate('prev-year')">
                  上一年
                </el-button>
                <el-button size="small" @click="selectDate('prev-month')">
                  前一个月
                </el-button>
                <el-button size="small" @click="selectDate('today')">今天</el-button>
                <el-button size="small" @click="selectDate('next-month')">
                  后一个月
                </el-button>
                <el-button size="small" @click="selectDate('next-year')">
                  下一年
                </el-button>
              </el-button-group>
            </template>
            <template #date-cell="{ data }">
              <el-tooltip
                class="box-item"
                effect="dark"
                content="Top Center prompts info"
                placement="top"
              >
                <template #content>
                  预警地图组数量：{{ 10 }}
                  <br />
                  预警监控点数量：{{ 20 }}
                  <br />
                  未处理预警数量：{{ 5 }}
                </template>
                <p
                  :class="data.isSelected ? 'is-selected' : ''"
                  @click="handleCalendarClick(data)"
                >
                  {{ data.day.split('-').slice(1).join('-') }}
                  <!-- {{ data.isSelected ? '✔️' : '' }} -->
                </p>
              </el-tooltip>
            </template>
          </el-calendar>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import * as echarts from "echarts"
import { ref, reactive, onMounted } from 'vue'
import type { CalendarDateType, CalendarInstance } from 'element-plus'
import { useRouter, useRoute, onBeforeRouteUpdate} from 'vue-router'

const router = useRouter();
const monitorSituationToday = ref()
const mapGroupMonitorsData = ref()
const warningSituationOverYears = ref()
const calendar = ref<CalendarInstance>()
const selectDate = (val: CalendarDateType) => {
  if (!calendar.value) return
  calendar.value.selectDate(val)
}
onMounted(() => {
  initMonitorSituation()
  initMapGroupMonitorsData()
  initWarningSituationOverYears()
  // initSpeed()
  // initDensitySpeed()
})

const initMonitorSituation = () => {
  const monitorSituationTodayChart = echarts.init(monitorSituationToday.value)
  const option = {
    title: {
      text: '今日监控情况',
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['道路通畅（人员稀少）', '逐渐繁忙', '逐渐拥堵', '监控预警']
    },
    series: [
      {
        name: '今日监控情况',
        type: 'pie',
        data: [
          { value: 1548, name: '道路通畅（人员稀少）' },
          { value: 310, name: '逐渐繁忙' },
          { value: 310, name: '逐渐拥堵' },
          { value: 234, name: '监控预警' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
  monitorSituationTodayChart.setOption(option)
}

const initMapGroupMonitorsData = () => {
  const mapGroupMonitorsDataChart = echarts.init(mapGroupMonitorsData.value)
  const data: number[] = [];
  for (let i = 0; i < 5; ++i) {
    data.push(Math.round(Math.random() * 200));
  }

  const option = {
    title: {
      text: '地图组监控情况',
      left: 'center'
    },
    xAxis: {
      max: 'dataMax'
    },
    grid: {
      left: 70
    },
    yAxis: {
      type: 'category',
      data: ['苏州观前街', '老庙黄金组', '钱塘看潮台', '南京路步行街', '西湖风景区'],
      inverse: true,
      axisLabel: {
        show: true,
        fontSize: 10
      },
      animationDuration: 300,
      animationDurationUpdate: 300,
      // max: 2 // only the largest 3 bars will be displayed
    },
    series: [
      {
        realtimeSort: true,
        // name: '地图组监控情况',
        type: 'bar',
        data: data,
        label: {
          show: true,
          position: 'right',
          valueAnimation: true
        }
      }
    ],
    legend: {
      show: true
    },
    animationDuration: 0,
    animationDurationUpdate: 3000,
    animationEasing: 'linear',
    animationEasingUpdate: 'linear'
  };

  function run() {
    for (var i = 0; i < data.length; ++i) {
      if (Math.random() > 0.9) {
        data[i] += Math.round(Math.random() * 2000);
      } else {
        data[i] += Math.round(Math.random() * 200);
      }
    }
    mapGroupMonitorsDataChart.setOption(option);
  }

  setTimeout(function () {
    run();
  }, 0);
  setInterval(function () {
    run();
  }, 3000);
}

const initWarningSituationOverYears = () => {
  const warningSituationOverYearsChart = echarts.init(warningSituationOverYears.value)
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999'
        }
      }
    },
    toolbox: {
      // feature: {
      //   dataView: { show: true, readOnly: false },
      //   magicType: { show: true, type: ['line', 'bar'] },
      //   restore: { show: true },
      //   saveAsImage: { show: true }
      // }
    },
    grid: {
      left: 70,
      right: 70
    },
    legend: {
      data: ['预警', '已处理预警', '人流量']
    },
    xAxis: [
      {
        type: 'category',
        data: ['2018', '2019', '2020', '2021', '2022', '2023', '2024'],
        axisPointer: {
          type: 'shadow'
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: '次数',
        min: 0,
        max: 250,
        interval: 50,
        axisLabel: {
          formatter: '{value} 千次'
        }
      },
      {
        type: 'value',
        name: '人流量',
        min: 0,
        max: 25,
        interval: 5,
        axisLabel: {
          formatter: '{value} 百万人'
        }
      }
    ],
    series: [
      {
        name: '预警',
        type: 'bar',
        tooltip: {
          valueFormatter: function (value) {
            return value as number + ' 千次';
          }
        },
        data: [
          2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
        ]
      },
      {
        name: '已处理预警',
        type: 'bar',
        tooltip: {
          valueFormatter: function (value:number) {
            return value as number + ' 千次';
          }
        },
        data: [
        2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
        ]
      },
      {
        name: '人流量',
        type: 'line',
        yAxisIndex: 1,
        tooltip: {
          valueFormatter: function (value:number) {
            return value as number + ' 百万人';
          }
        },
        data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
      }
    ]
  };
  warningSituationOverYearsChart.setOption(option)
}

const handleCalendarClick = (data: any) => {
  router.push({ name: 'warning_info_view' })
}
</script>
<style scoped lang="scss">
.home{
  .el-row{
    margin-bottom: 20px;
  }
  .box-card{
    .text{
      padding: 10px;
      text-align: center;
      font-size: 20px;
    }
  }
  .is-selected {
    color: #1989fa;
  }
}
</style>