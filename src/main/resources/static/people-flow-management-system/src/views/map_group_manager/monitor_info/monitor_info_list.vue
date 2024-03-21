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
      <el-table-column property="monitorName" label="监控名称" width="200" />
      <el-table-column property="inputTime" label="录入时间" show-overflow-tooltip />
      <el-table-column property="mapGroupName" label="所属分组" width="120" />
      <el-table-column property="regionShape" label="区域形状" width="120" :formatter="handleregionShape" />
      <el-table-column property="acreage" label="区域面积" width="120" />
      <el-table-column property="standardLength" label="标准长度" width="120" />
      <el-table-column property="occupiedPixel" label="占用像素" width="120" />
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
import { useMonitorStore } from '@/stores/monitor'

interface RowData {
  // 定义 rowData 的结构
  monitorId: string;
  monitorName: string;
  inputTime: string;
  mapGroupId: string;
  mapGroupName: string;
  regionShape: string; // circle: 圆形; rectangle: 长方形; trapezoid: 梯形
  acreage: string;
  standardLength: string;
  occupiedPixel: string;
  url: string;
  regionForm: Array<{
    time_start: string;
    time_end: string;
    max_people_num: string;
    max_people_density: string;
    max_people_speed: string;
  }>;
}
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
const tableData = useMonitorStore().monitorInfoList


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

const handleregionShape = (rowData: RowData) => {
  switch (rowData.regionShape) {
    case 'circle':
      return '圆形'
    case 'rectangle':
      return '长方形'
    case 'trapezoid':
      return '梯形'
  }
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