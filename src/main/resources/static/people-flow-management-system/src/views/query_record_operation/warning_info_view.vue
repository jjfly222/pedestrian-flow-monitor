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
      <el-table-column type="selection" width="55" />
      <el-table-column type="index" width="60" label="序号"/>
      <el-table-column property="warningTitle" label="告警标题" width="120" />
      <el-table-column property="sendTime" label="发送时间" width="180" />
      <el-table-column property="warningType" label="类型" width="120" />
      <el-table-column property="mapGroup" label="地图分组" width="120" />
      <el-table-column property="monitorName" label="监控代号" width="120" />
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
      <el-table-column property="alarmDetails" label="处理详情"  show-overflow-tooltip />
<!--      <el-table-column property="handleTime" label="处理时间" width="180" show-overflow-tooltip />-->
      <el-table-column label="操作" width="180">
        <template #default="scope">
          <div>
            <el-button class="add_button" type="primary" @click="handleDeal(scope.row, scope.$index)">处理</el-button>
            <el-button class="add_button" type="warning" @click="handleToDetail(scope.row, scope.$index)">详情</el-button>
          </div>
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
    <el-dialog
      v-model="detailDialogVisible"
      title="告警详情"
      width="70%"
    >
      <div class="handle_alarm_info">
        <div class="handle_condition">
          <span class="conditon_title">标题</span>
          <el-input
            ref="inputtag"
            type="text"
            v-model="alarmMsgForm.title"
            class="new-tag"
            :disabled="true"
          />
        </div>
        <div class="handle_details">
          <span class="conditon_title">正文</span>
          <el-input
            v-model="alarmMsgForm.alarmContent"
            :autosize="{ minRows: 2, maxRows: 4 }"
            type="textarea"
            placeholder="请输入处理详情"
            style="flex: 1;"
            :disabled="true"
          />
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="detailDialogVisible = false">关闭</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElTable } from 'element-plus'
import { useAlarmStore } from '@/stores/alarm'
import { useMonitorStore } from '@/stores/monitor'



interface User {
  alarmListInfoId: string,
  warningTitle: string,
  sendTime: string,
  warningType: string,
  mapGroup: string,
  monitorId: string,
  monitorName: string,
  handleInfo: string,
  handleTime: string,
  alarmDetails: string,
  alarmInfoId: string,
  people_num: string,
  midu: string,
  sudu: string,
  max_people_speed: string
}

const alarmStore = useAlarmStore()
const useMonitor = useMonitorStore()

const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const multipleSelection = ref<User[]>([])
const { alarmInfoList, handleAlarmInfo, alarmInfo } = alarmStore
const { monitorInfoList } = useMonitor

const detailDialogVisible = ref(false)
const alarmMsgForm = reactive({
  title: '',
  alarmContent: ''
})

const handleSelectionChange = (val: User[]) => {
  multipleSelection.value = val
}
const tableData: User[] = alarmInfoList
// const tableData: User[] = reactive([
//   {
//     warningTitle: '人群聚集告警',
//     sendTime: '2023-12-20 16:00:05',
//     warningType: '聚集告警',
//     mapGroup: '长泰广场',
//     monitorNo: '喷泉中心',
//     handleInfo: '未处理',
//     handleTime: '',
//     alarmDetails: ''
//   },
//   {
//     warningTitle: '人群速度缓慢',
//     sendTime: '2023-12-20 16:00:05',
//     warningType: '移动速度告警',
//     mapGroup: '长泰广场',
//     monitorNo: '东庭院南街',
//     handleInfo: '已安排疏通',
//     handleTime: '2023-12-20 17:25:05',
//     alarmDetails: ''
//   },
//   {
//     warningTitle: '人群聚集告警',
//     sendTime: '2023-12-20 14:00:05',
//     warningType: '聚集告警',
//     mapGroup: '长泰广场',
//     monitorNo: '盒马鲜生拐角',
//     handleInfo: '忽略',
//     handleTime: '',
//     alarmDetails: ''
//   },
//   {
//     warningTitle: '人群聚集告警',
//     sendTime: '2023-12-20 16:00:05',
//     warningType: '聚集告警',
//     mapGroup: '金桥太茂商业中心',
//     monitorNo: '喜茶南门街',
//     handleInfo: '未处理',
//     handleTime: '',
//     alarmDetails: ''
//   },
//   {
//     warningTitle: '人群聚集告警',
//     sendTime: '2023-12-20 16:00:05',
//     warningType: '聚集告警',
//     mapGroup: '金桥太茂商业中心',
//     monitorNo: '多乐东南角',
//     handleInfo: '重发',
//     handleTime: '',
//     alarmDetails: ''
//   }
// ])

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
let dataIndex:number = 0

const handleDeal = (row: User, index: number) => {
  // row.dealFlag = true
  alarmInfoForm.alarmInfoSelect = row.handleInfo
  alarmInfoForm.alarmDetails = row.alarmDetails
  dialogVisible.value = true
  dataIndex = index
}
const handleToDetail = (row: User) => {
  detailDialogVisible.value = true
  const alarmMsg = alarmInfo.filter(element => {
    return element.alarmInfoId = row.alarmInfoId
  })
  if(alarmMsg.length !== 0) {
    const monitorElement = monitorInfoList.filter(item => {
      return item.monitorId === row.monitorId
    })

    const replacements = {
      map_group: row.mapGroup,
      monitor_name: row.monitorName,
      occur_time: row.sendTime,
      area: monitorElement[0].acreage || '',
      people_num: row.people_num,
      midu: row.midu,
      sudu: row.sudu,
      max_people_speed: row.max_people_speed
    };
    let title = alarmMsg[0].title
    title = title.replace(/\[(.*?)\]/g, (match, p1) => {
      return replacements[p1] || match
    });
    let alarmContent = alarmMsg[0].content
    alarmContent = alarmContent.replace(/\[(.*?)\]/g, (match, p1) => {
      return replacements[p1] || match
    });
    alarmMsgForm.title = title
    alarmMsgForm.alarmContent = alarmContent
  }
}

const handleAddAlarmInfoSave = () => {
  handleAlarmInfo(alarmInfoForm, dataIndex)
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
    .new-tag {
      flex: 1
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