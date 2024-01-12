<template>
  <div class="report_view">
    <el-tabs type="border-card">
      <el-tab-pane label="监控点报表">
        <el-form :model="form" label-width="120px">
          <el-form-item label="时间间隔">
            <el-select v-model="form.timeInterval" placeholder="请选择时间间隔">
              <el-option 
                v-for="(item, index) in timeIntervalList"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-time-picker v-model="form.timeInterval" placeholder="请选择时间间隔" />
          </el-form-item>
          <el-form-item label="地图组">
            <el-select v-model="form.mapGroup" placeholder="请选择地图组">
              <el-option 
                v-for="(item, index) in mapGroupList"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="监控点">
            <el-select
              v-model="form.monitoryPoint"
              multiple
              collapse-tags
              collapse-tags-tooltip
              placeholder="请选择监控点"
              style="width: 240px"
            >
              <el-option
                v-for="(item, index) in monitoryPointList"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="时间范围">
            <el-col :span="11">
              <el-date-picker
                v-model="form.date1"
                type="date"
                placeholder="选择时间"
                style="width: 100%"
              />
            </el-col>
            <el-col :span="2" class="text-center">
              <span class="text-gray-500">-</span>
            </el-col>
            <el-col :span="11">
              <el-time-picker
                v-model="form.date2"
                placeholder="选择时间"
                style="width: 100%"
              />
            </el-col>
          </el-form-item>
        </el-form>
        <el-divider />
        <el-table
          ref="multipleTableRef"
          :data="tableData"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column property="mapGroup" label="地图组" width="120" />
          <el-table-column property="monitoryPointName" label="监控点名称" show-overflow-tooltip />
          <el-table-column label="时间" width="120">
            <template #default="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column property="averageSpeed" label="平均速度" show-overflow-tooltip />
          <el-table-column property="crowdDensity" label="人群密度" show-overflow-tooltip />

        </el-table>
        <el-button class="export_button" type="primary" @click="handleExport">导出</el-button>
      </el-tab-pane>
      <el-tab-pane label="地图组报表">
        <el-form :model="mapGroupForm" label-width="120px">
          <el-form-item label="时间间隔">
            <el-select v-model="mapGroupForm.timeInterval" placeholder="请选择时间间隔">
              <el-option 
                v-for="(item, index) in timeIntervalList"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-time-picker v-model="mapGroupForm.timeInterval" placeholder="请选择时间间隔" />
          </el-form-item>
          <el-form-item label="地图组">
            <el-select v-model="mapGroupForm.mapGroup" placeholder="请选择地图组">
              <el-option 
                v-for="(item, index) in mapGroupList"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="监控点">
            <el-select
              v-model="mapGroupForm.monitoryPoint"
              multiple
              collapse-tags
              collapse-tags-tooltip
              placeholder="请选择监控点"
              style="width: 240px"
            >
              <el-option
                v-for="(item, index) in monitoryPointList"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="时间范围">
            <el-col :span="11">
              <el-date-picker
                v-model="mapGroupForm.date1"
                type="date"
                placeholder="选择时间"
                style="width: 100%"
              />
            </el-col>
            <el-col :span="2" class="text-center">
              <span class="text-gray-500">-</span>
            </el-col>
            <el-col :span="11">
              <el-time-picker
                v-model="mapGroupForm.date2"
                placeholder="选择时间"
                style="width: 100%"
              />
            </el-col>
          </el-form-item>
        </el-form>
        <el-divider />
        <el-table
          ref="multipleTableRef"
          :data="mapGroupData"
          style="width: 100%"
          @selection-change="handleMapGroupSelectionChange"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column property="mapGroup" label="地图组" width="120" />
          <el-table-column label="时间" width="120">
            <template #default="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column property="averageSpeed" label="平均速度" show-overflow-tooltip />
          <el-table-column property="crowdDensity" label="人群密度" show-overflow-tooltip />

        </el-table>
        <el-button class="export_button" type="primary" @click="handleExport">导出</el-button>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElTable } from 'element-plus'

// do not use same name with ref
const form = reactive({
  timeInterval: '',
  mapGroup: '',
  monitoryPoint: '',
  date1: '',
  date2: ''
})
const mapGroupForm = reactive({
  timeInterval: '',
  mapGroup: '',
  monitoryPoint: '',
  date1: '',
  date2: ''
})

const timeIntervalList = reactive([
  {
    label: '1小时',
    value: '1',
  }
])

const mapGroupList = reactive([
  {
    label: '老庙黄金',
    value: '1',
  },
  {
    label: '苏州观前街',
    value: '2',
  },
])
const monitoryPointList = reactive([
  {
    label: '老庙黄金-1',
    value: '1-1',
  },
  {
    label: '老庙黄金-2',
    value: '1-2',
  },
  {
    label: '苏州观前街-1',
    value: '2-1',
  },
  {
    label: '苏州观前街-2',
    value: '2-2',
  }
])
interface User {
  mapGroup: string
  monitoryPointName: string
  date: string
  averageSpeed: string
  crowdDensity: string
}
interface MapGroup {
  mapGroup: string
  date: string
  averageSpeed: string
  crowdDensity: string
}

const tableData:User[] = [
  {
    mapGroup: '老庙黄金',
    monitoryPointName: '老庙黄金-1',
    date: '2021-08-01 12:00:00',
    averageSpeed: '1.2',
    crowdDensity: '1.2'
  },
  {
    mapGroup: '老庙黄金',
    monitoryPointName: '老庙黄金-2',
    date: '2021-08-01 12:00:00',
    averageSpeed: '1.2',
    crowdDensity: '1.2'
  },
  {
    mapGroup: '苏州观前街',
    monitoryPointName: '苏州观前街-1',
    date: '2021-08-01 12:00:00',
    averageSpeed: '1.2',
    crowdDensity: '1.2'
  },
  {
    mapGroup: '苏州观前街',
    monitoryPointName: '苏州观前街-2',
    date: '2021-08-01 12:00:00',
    averageSpeed: '1.2',
    crowdDensity: '1.2'
  }
]
const mapGroupData:MapGroup[] = [
  {
    mapGroup: '老庙黄金',
    date: '2021-08-01 12:00:00',
    averageSpeed: '1.2',
    crowdDensity: '1.2'
  },
  {
    mapGroup: '苏州观前街',
    date: '2021-08-01 12:00:00',
    averageSpeed: '1.2',
    crowdDensity: '1.2'
  }
]

const multipleSelection = ref<User[]>([])
const multipleSelectionMapGroup = ref<MapGroup[]>([])

const handleSelectionChange = (val: User[]) => {
  multipleSelection.value = val
}
const handleMapGroupSelectionChange = (val: MapGroup[]) => {
  multipleSelectionMapGroup.value = val
}
const handleExport = () => {
  console.log('handleExport!')
}
</script>
<style scoped lang="scss">
.report_view {
  .export_button {
    margin-top: 20px;
    margin-left: 0;
  }
}
</style>