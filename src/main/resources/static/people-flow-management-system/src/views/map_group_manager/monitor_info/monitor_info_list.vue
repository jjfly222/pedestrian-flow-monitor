<template>
  <div class="monitor_info_list">
    <!-- 新增页面去掉 -->
    <!-- <div class="add_monitor_info">
      <el-button type="primary" @click="addMonitorInfo">添加监控信息</el-button>
    </div> -->
    <el-table
        ref="multipleTableRef"
        :data="tableData"
        style="width: 100%"
    >
      <el-table-column property="monitorName" label="监控名称" width="200"/>
      <el-table-column property="inputTime" label="录入时间" show-overflow-tooltip/>
      <el-table-column property="mapGroup" label="所属分组" width="120"/>
      <el-table-column property="regionShape" label="区域形状" width="120"/>
      <el-table-column property="area" label="区域面积" width="120"/>
      <el-table-column property="standardLength" label="标准长度" width="120"/>
      <el-table-column property="occupiedPixel" label="占用像素" width="120"/>

      <el-table-column label="操作" width="260">
        <template #default="scope">
          <div>
            <el-button class="add_button" type="primary" @click="handleEdit(scope.row, scope.$index)">修改</el-button>
            <el-button class="add_button" type="warning" @click="handleDelete(scope.row, scope.$index)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import {reactive, ref} from 'vue'
import {ElTable} from 'element-plus'
import {useRouter, useRoute} from 'vue-router'

const router = useRouter()

interface Params {
  temId: string,
  monitorName: string,
  inputTime: string,
  mapGroup: string,
  regionShape: string,
  area: string,
  standardLength: string,
  occupiedPixel: string
}

const tableData = reactive([
  {
    temId: '001',
    monitorName: '喷泉中心',
    inputTime: '2024-02-25',
    mapGroup: '长泰广场',
    regionShape: '圆形',
    area: '450 平方米',
    standardLength: ' 1 米',
    occupiedPixel: '300px'
  },
  {
    temId: '002',
    monitorName: '东庭院南街',
    inputTime: '2024-02-25',
    mapGroup: '长泰广场',
    regionShape: '长方形',
    area: '800 平方米',
    standardLength: ' 1 米',
    occupiedPixel: ' 500px'
  },
  {
    temId: '003',
    monitorName: '盒马鲜生拐角',
    inputTime: '2024-02-26',
    mapGroup: '长泰广场',
    regionShape: '梯形',
    area: '500 平方米',
    standardLength: ' 1 米',
    occupiedPixel: ' 380px'
  },
  {
    temId: '004',
    monitorName: '一汽大众东街',
    inputTime: '2024-02-26',
    mapGroup: '长泰广场',
    regionShape: '长方形',
    area: '800 平方米',
    standardLength: ' 1 米',
    occupiedPixel: ' 520px'
  },
  {
    temId: '005',
    monitorName: '长泰E座转角',
    inputTime: '2024-02-26',
    mapGroup: '长泰广场',
    regionShape: '梯形',
    area: '500 平方米',
    standardLength: ' 1 米',
    occupiedPixel: '380px'
  },
  {
    temId: '006',
    monitorName: '平安银行西街',
    inputTime: '2024-02-26',
    mapGroup: '长泰广场',
    regionShape: '长方形',
    area: '700 平方米',
    standardLength: ' 1 米',
    occupiedPixel: '460 px'
  },
  {
    temId: '007',
    monitorName: '长泰广场1座后街',
    inputTime: '2024-02-26',
    mapGroup: '长泰广场',
    regionShape: '长方形',
    area: '700 平方米',
    standardLength: ' 1 米',
    occupiedPixel: '460 px'
  },
  {
    temId: '008',
    monitorName: '喜茶南门街',
    inputTime: '2024-02-26',
    mapGroup: '金桥太茂商业中心',
    regionShape: '长方形',
    area: '600 平方米',
    standardLength: ' 1 米',
    occupiedPixel: '420 px'
  },
  {
    temId: '009',
    monitorName: '多乐东南角',
    inputTime: '2024-02-26',
    mapGroup: '金桥太茂商业中心',
    regionShape: '梯形',
    area: '420 平方米',
    standardLength: ' 1 米',
    occupiedPixel: '340 px'
  },
  {
    temId: '010',
    monitorName: '特斯拉西北街',
    inputTime: '2024-02-26',
    mapGroup: '金桥太茂商业中心',
    regionShape: '长方形',
    area: '600 平方米',
    standardLength: ' 1 米',
    occupiedPixel: '420 px'
  }, {
    temId: '011',
    monitorName: 'oppo东北门街道',
    inputTime: '2024-02-26',
    mapGroup: '金桥太茂商业中心',
    regionShape: '长方形',
    area: '620 平方米',
    standardLength: ' 1 米',
    occupiedPixel: '430 px'
  }, {
    temId: '012',
    monitorName: '小米东街',
    inputTime: '2024-02-26',
    mapGroup: '金桥太茂商业中心',
    regionShape: '长方形',
    area: '600 平方米',
    standardLength: ' 1 米',
    occupiedPixel: '420 px'
  }, {
    temId: '013',
    monitorName: '南门入口区',
    inputTime: '2024-02-26',
    mapGroup: '金桥太茂商业中心',
    regionShape: '长方形',
    area: '400 平方米',
    standardLength: ' 1 米',
    occupiedPixel: '320 px'
  }, {
    temId: '014',
    monitorName: '中庭公共区',
    inputTime: '2024-02-26',
    mapGroup: '金桥太茂商业中心',
    regionShape: '圆形',
    area: '450 平方米',
    standardLength: ' 1 米',
    occupiedPixel: '330 px'
  }
])

const handleEdit = (row: Params, index: number) => {
  router.push({
    name: 'monitor_info_setting',
    state: {
      rowData: JSON.parse(JSON.stringify(row))
    }
  })
}

const handleDelete = (row: Params, index: number) => {
  console.log(row, index)
}

const addMonitorInfo = () => {
  router.push({
    name: 'monitor_info_setting'
    // state: {
    //   isCheck: 1,
    //   rowData: JSON.parse(JSON.stringify(rowData))
    // }
  })
}
</script>
<style scoped lang="scss">
.monitor_info_list {
  .add_monitor_info {
    margin-bottom: 20px;
    text-align: left;
  }
}
</style>