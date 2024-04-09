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
          <el-table-column label="时间" width="240">
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
          <el-table-column label="时间" width="240">
            <template #default="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column property="averageNum" label="人群数量" show-overflow-tooltip />
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
    label: '长泰广场',
    value: '1',
  },
  {
    label: '金桥太茂商业中心',
    value: '2',
  },
])
const monitoryPointList = reactive([
  {
    label: '喷泉中心',
    value: '1-1',
  },
  {
    label: '东庭院南街',
    value: '1-2',
  },
  {
    label: '多乐东南角',
    value: '2-1',
  },
  {
    label: '特斯拉西北街',
    value: '2-2',
  }
])
interface User {
  mapGroup: string
  monitoryPointName: string
  date: string
  averageNum: string
  averageSpeed: string
  crowdDensity: string
}
interface MapGroup {
  mapGroup: string
  date: string
  averageNum: string
  averageSpeed: string
  crowdDensity: string
}

const tableData:User[] = [
  {
    mapGroup: '长泰广场',
    monitoryPointName: '喷泉中心',
    date: '2024-04-01 16:56:25',
    averageNum: '25',
    averageSpeed: '1.28',
    crowdDensity: '0.63'
  },
  {
    mapGroup: '长泰广场',
    monitoryPointName: '喷泉中心',
    date: '2024-04-01 16:56:30',
    averageNum: '27',
    averageSpeed: '1.24',
    crowdDensity: '0.68'
  },
  {
    mapGroup: '长泰广场',
    monitoryPointName: '喷泉中心',
    date: '2024-04-01 16:56:35',
    averageNum: '28',
    averageSpeed: '0.85',
    crowdDensity: '10.69'
  },
  {
    mapGroup: '长泰广场',
    monitoryPointName: '多乐东南角',
    date: '2024-04-01 16:56:40',
    averageNum: '23',
    averageSpeed: '1.08',
    crowdDensity: '0.58'
  }
]
const mapGroupData:MapGroup[] = [
  {
    mapGroup: '长泰广场',
    date: '2024-04-01 16:56:45',
    averageNum: '24',
    averageSpeed: '0.86',
    crowdDensity: '0.59'
  },
  {
    mapGroup: '长泰广场',
    date: '2024-04-01 16:56:50',
    averageNum: '15',
    averageSpeed: '0.74',
    crowdDensity: '0.38'
  },
  {
    mapGroup: '长泰广场',
    date: '2024-04-01 16:56:55',
    averageNum: '12',
    averageSpeed: '0.53',
    crowdDensity: '0.3'
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