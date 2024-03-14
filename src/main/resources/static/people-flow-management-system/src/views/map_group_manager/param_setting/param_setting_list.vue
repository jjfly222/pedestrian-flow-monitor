<template>
  <div class="param_setting_list">
    <el-button style="display: flex; margin-bottom: 20px;" type="primary" @click="onAddTemp">新增模版</el-button>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="name" label="模版名称" width="180"/>
      <el-table-column prop="standardLength" label="标准长度" width="180" :formatter="formatStandardLength"/>
      <el-table-column prop="regionShape" label="区域形状" :formatter="formatRegionShape"/>
      <el-table-column prop="area" label="区域面积"/>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="handleCheck(scope.row)">查看</el-button>
          <el-button link type="primary" size="small" @click="handleEdit(scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import {ref, reactive} from 'vue'
import {useRouter, useRoute} from 'vue-router'

const router = useRouter()
const route = useRoute()
const tableData = [
  {
    name: '圆形通用模板',
    standardLength: '1',
    regionShape: 'circle',
    area: '314 平方米',
    param1: '20',
    param2: '',
    regionForm: [
      {
        time_start: '8:30:00',
        time_end: '17:00:00',
        max_people_num: '600',
        max_people_density: '2',
        max_people_speed: '0.3'
      }
    ]
  },
  {
    name: '矩形通用模版',
    standardLength: '1',
    regionShape: 'rectangle',
    area: '200 平方米',
    param1: '10',
    param2: '20',
    regionForm: [{
      time_start: '8:30:00',
      time_end: '17:00:00',
      max_people_num: '400',
      max_people_density: '2',
      max_people_speed: '0.3'
    }]
  },
  {
    name: '梯形通用模版',
    standardLength: '1',
    regionShape: 'trapezoid',
    area: '300 平方米',
    param1: '',
    param2: '',
    regionForm: [
      {
        time_start: '8:30:00',
        time_end: '17:00:00',
        max_people_num: '300',
        max_people_density: '1',
        max_people_speed: '0.3'
      }
    ]
  },
]

const formatStandardLength = (row: any) => {
  return row.standardLength + ' 米'
}
const formatRegionShape = (row: any) => {
  if (row.regionShape === 'rectangle') {
    return '长方形'
  } else if (row.regionShape === 'circle') {
    return '圆形'
  } else if (row.regionShape === 'trapezoid') {
    return '梯形'
  }
  return row.regionShape === 'rectangle' ? '矩形' : '圆形'
}
const handleCheck = (rowData: any) => {
  console.log(rowData)
  router.push({
    name: 'param_setting_add',
    state: {
      isCheck: 1,
      rowData: JSON.parse(JSON.stringify(rowData))
    }
  })
}

const handleEdit = (rowData: any) => {
  console.log('rowData', JSON.stringify(rowData))
  router.push({
    name: 'param_setting_add',
    state: {
      isCheck: 0,
      rowData: JSON.parse(JSON.stringify(rowData))
    }
  })
}
const onAddTemp = () => {
  router.push({
    name: 'param_setting_add',
    state: {
      isCheck: 2
    }
  })
}
</script>
<style scoped lang="scss">

</style>