<template>
  <div class="alarm_info_manager">
    <div class="export_info">
      <el-button type="warning">导出</el-button>
    </div>
    <el-table
        ref="multipleTableRef"
        :data="tableData"
        style="width: 100%"
        @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"/>
      <el-table-column type="index" width="70" label="序号"/>
      <el-table-column property="warningTitle" label="告警标题" width="120"/>
      <el-table-column property="sendTime" label="发送时间" show-overflow-tooltip/>
      <el-table-column property="warningType" label="类型" width="120"/>
      <el-table-column property="mapGroup" label="地图分组" width="120"/>
      <el-table-column property="monitorNo" label="监控代号" width="120"/>
      <el-table-column property="handleInfo" label="处理情况" width="120">
        <!-- <template #default="scope">
          <span v-if="!scope.row.dealFlag">{{ scope.row.handleInfo }}</span>
          <el-select v-else v-model="scope.row.handleInfoSelect" class="m-2" placeholder="请选择" size="small">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </template> -->
      </el-table-column>
      <el-table-column property="alarmDetails" label="处理详情" width="180" show-overflow-tooltip/>
      <el-table-column property="handleTime" label="处理时间" width="180" show-overflow-tooltip/>
      <el-table-column label="操作" width="180">
        <template #default="scope">
          <div>
            <el-button class="add_button" type="primary" @click="handleDeal(scope.row, scope.$index)">处理</el-button>
            <el-button class="add_button" type="warning" @click="handleResend(scope.row)">重发</el-button>
          </div>
          <!-- <div v-else>
            <el-button class="add_button" type="primary" @click="handleSave(scope.row)">保存</el-button>
            <el-button class="add_button" @click="handleCancel(scope.row)">取消</el-button>
          </div> -->
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
        v-model="dialogVisible"
        title="处理告警信息"
        width="70%"
    >
      <div class="handle_alarm_info">
        <div class="handle_condition">
          <span class="conditon_title">处理情况</span>
          <el-select v-model="alarmInfoForm.alarmInfoSelect" class="m-2" placeholder="请选择">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </div>
        <div class="handle_details">
          <span class="conditon_title">处理详情</span>
          <el-input
              v-model="alarmInfoForm.alarmDetails"
              :autosize="{ minRows: 2, maxRows: 4 }"
              type="textarea"
              placeholder="请输入处理详情"
              style="margin-left: 10px;"
          />
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleAddAlarmInfoSave">
            保存
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import {reactive, ref} from 'vue'
import {ElTable, ElMessageBox} from 'element-plus'

interface User {
  warningTitle: string,
  sendTime: string,
  warningType: string,
  mapGroup: string,
  monitorNo: string,
  handleInfo: string,
  handleTime: string,
  alarmDetails: string
}

const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const multipleSelection = ref<User[]>([])

const handleSelectionChange = (val: User[]) => {
  multipleSelection.value = val
}

const tableData: User[] = reactive([
  {
    warningTitle: '人群聚集告警',
    sendTime: '2024-03-03 20:12:05',
    warningType: '聚集告警',
    mapGroup: '长泰广场',
    monitorNo: '喷泉中心',
    handleInfo: '未处理',
    handleTime: '',
    alarmDetails: ''
  },
  {
    warningTitle: '人群聚集告警',
    sendTime: '2024-03-03 20:15:05',
    warningType: '移速过缓告警',
    mapGroup: '长泰广场',
    monitorNo: '喷泉中心',
    handleInfo: '已安排疏通',
    handleTime: '2024-03-03 20:22:05',
    alarmDetails: ''
  },
  {
    warningTitle: '人群聚集告警',
    sendTime: '2024-03-03 20:25:33',
    warningType: '聚集告警',
    mapGroup: '长泰广场',
    monitorNo: '东庭院南街',
    handleInfo: '忽略',
    handleTime: '',
    alarmDetails: ''
  },
  {
    warningTitle: '人群聚集告警',
    sendTime: '2024-03-03 20:25:24',
    warningType: '聚集告警',
    mapGroup: '长泰广场',
    monitorNo: '盒马鲜生拐角',
    handleInfo: '未处理',
    handleTime: '',
    alarmDetails: ''
  },
  {
    warningTitle: '人群聚集告警',
    sendTime: '2024-03-03 17:50:24',
    warningType: '聚集告警',
    mapGroup: '长泰广场',
    monitorNo: '长泰E座转角',
    handleInfo: '重发',
    handleTime: '',
    alarmDetails: ''
  }
])

const options = [
  {
    value: '忽略',
    label: '忽略',
  },
  {
    value: '未处理',
    label: '未处理',
  },
  {
    value: '已安排疏通',
    label: '已安排疏通',
  }
]
const alarmInfoForm = reactive({
  alarmInfoSelect: '',
  alarmDetails: ''
})
const dialogVisible = ref(false)
let dataIndex: number = 0
const handleDeal = (row: User, index) => {
  // row.dealFlag = true
  alarmInfoForm.alarmInfoSelect = row.handleInfo
  alarmInfoForm.alarmDetails = row.alarmDetails
  dialogVisible.value = true
  dataIndex = index
}
const handleResend = (row: User) => {
  console.log(row)
}
// const handleSave = (row: User) => {
// }
// const handleCancel = (row: User) => {
// }
const handleAddAlarmInfoSave = () => {
  tableData[dataIndex].handleInfo = alarmInfoForm.alarmInfoSelect
  tableData[dataIndex].alarmDetails = alarmInfoForm.alarmDetails
  dialogVisible.value = false
}
</script>
<style scoped lang="scss">
.alarm_info_manager {
  .export_info {
    margin-bottom: 20px;
    text-align: left;
  }

  .handle_condition {
    display: flex;
    margin-bottom: 20px;

    .conditon_title {
      width: 80px;
    }
  }

  .handle_details {
    display: flex;

    .conditon_title {
      width: 80px;
    }
  }
}
</style>