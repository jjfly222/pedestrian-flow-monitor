<template>
  <div class="alarm_info_template_manager">
    <div class="add_template">
      <el-button type="primary" @click="handleAddTem">新增模版</el-button>
    </div>
    <el-table
      ref="multipleTableRef"
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column type="index" width="70" label="序号"/>
      <el-table-column property="title" label="标题" width="360" show-overflow-tooltip />
      <el-table-column property="content" label="内容" show-overflow-tooltip />
      <el-table-column label="操作" width="180">
        <template #default="scope">
          <div>
            <el-button class="add_button" type="primary" @click.prevent="handleDel(scope.$index)">删除</el-button>
            <el-button class="add_button" type="warning" @click.prevent="handleEdit(scope.row, scope.$index)">修改</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      v-model="addTemDialogVisible"
      title="新增模版"
      width="70%"
    >
      <div>
        <el-card class="box-card">
          <div class="model_tag">
            <el-descriptions :column="2">
              <el-descriptions-item 
                v-for="(item, index) in tagList" 
                :key="index" 
                :label="item.label"
              >
                <el-check-tag size="small" :checked="checked" @change="onChange(item.enName)">{{ item.enName }}</el-check-tag>
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </el-card>
        <el-card class="box-card">
          <div class="box_card_title">
            <span class="title">标题</span>
            <div class="vue-input-tag-wrapper" @click="focusNewTag()">
              <input
                ref="inputtag"
                type="text"
                v-model="titleContent"
                class="new-tag"
              />
            </div>
          </div>
          <div class="box_card_body">
            <span class="title">正文</span>
            <el-input
              v-model="textarea2"
              :autosize="{ minRows: 2, maxRows: 4 }"
              type="textarea"
              @focus="handleBodyFocus"
            />
          </div>
        </el-card>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addTemDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSaveTem">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useAlarmStore } from '@/stores/alarm'
import { v4 as uuidv4 } from 'uuid';


import { ElTable, ElMessageBox } from 'element-plus'

interface User {
  alarmInfoId: string,
  title: string,
  content: string
}
const alarmStore = useAlarmStore()
const { alarmInfo, addAlarmInfo, editAlarmInfo, deleteAlarmInfo } = alarmStore
const tableData = alarmInfo

// const tableData = ref<User[]>([
//   {
//     title: '[map_group] 的 [monitor_name] 监控点位，发现人员拥挤现象',
//     content: '地图组 [map_group] 的 [monitor_name] 监控点，于 [occur_time] 发现人员拥挤现象，该监控点面积为：[area]，人员数量为：' +
//         '[people_num]，场地行人密度达到 [midu] 人/平方米，平均速度为 [sudu]，请及时前' +
//         '往现场疏通交通！！！'
//   },
//   {
//     title: '[map_group] 的 [monitor_name] 监控点位，发现人员移动过缓现象',
//     content: '地图组 [map_group] 的 [monitor_name] 监控点，于 [occur_time] 发现人员移动过缓现象，该监控点面积为：[area]，人员数量为：' +
//         '[people_num]，场地行人密度达到 [midu] 人/平方米，平均速度为 [sudu]，请及时前' +
//         '往现场疏通交通！！！'
//   }
// ])
const tagList = reactive([
  {
    label: '地图组',
    enName: 'map_group'
  },
  {
    label: '面积',
    enName: 'area'
  },
  {
    label: '监控名称',
    enName: 'monitor_name'
  },
  {
    label: '人员数量',
    enName: 'people_num'
  },
  {
    label: '时间',
    enName: 'occur_time'
  },
  {
    label: '密度',
    enName: 'density'
  },
  {
    label: '最快速度',
    enName: 'max_speed'
  },
  {
    label: '速度',
    enName: 'avg_speed'
  }
])
const addTemDialogVisible = ref(false)
const checked = ref(true)
const focusEl = ref('')
const alarmInfoId = ref('')
const titleContent = ref('')
const textarea2 = ref('')
let isAdd = true
let tableIndex = 0

const handleAddTem = () => {
  titleContent.value = ''
  textarea2.value = ''
  addTemDialogVisible.value = true
  isAdd = true

}
const handleDel = (index: number) => {
  deleteAlarmInfo(index)
}

const handleEdit = (row: User, index: number) => {
  isAdd = false
  tableIndex = index
  alarmInfoId.value = row.alarmInfoId
  titleContent.value = row.title
  textarea2.value = row.content
  addTemDialogVisible.value = true
}

const onChange = (enName: string) => {
  console.log('enName', enName)

  if (focusEl.value === 'title') {
    titleContent.value = titleContent.value.concat(`[${enName}]`)
  } else if (focusEl.value === 'body') {
    textarea2.value = textarea2.value.concat(`[${enName}]`)
  }
  console.log('textarea2.value', textarea2.value)
}
const handleSaveTem = () => {
  if (isAdd) {
    addAlarmInfo({
      alarmInfoId: uuidv4(),
      title: titleContent.value,
      content: textarea2.value
    })
  } else {
    console.log('tableIndex', tableIndex)
    console.log('tableData', tableData)
    const rowData = {
      alarmInfoId: alarmInfoId.value,
      title: titleContent.value,
      content: textarea2.value
    }
    editAlarmInfo(rowData)
    // tableData.value.splice(tableIndex, 1, {
    //   title: titleContent.value,
    //   content: textarea2.value
    // })
  }
  addTemDialogVisible.value = false
}
const focusNewTag = () => {
  focusEl.value = 'title'
  console.log('come')
}
const handleBodyFocus = () => {
  focusEl.value = 'body'
}
</script>
<style scoped lang="scss">
.alarm_info_template_manager {
  .add_template {
    margin-bottom: 20px;
    text-align: left;
  }
  .box-card {
    margin-top: 30px;
    .box_card_title {
      display: flex;
      .title {
        width: 50px;
      }
    }
    .box_card_body {
      margin-top: 20px;
      display: flex;
      .title {
        width: 50px;
      }
    }
  }
  .vue-input-tag-wrapper {
    flex: 1;
    background-color: #fff;
    border: 1px solid #ccc;
    overflow: hidden;
    padding-left: 4px;
    padding-top: 4px;
    cursor: text;
    text-align: left;
    -webkit-appearance: textfield;
    display: flex;
    flex-wrap: wrap;
    line-height: 30px;
    min-height: 30px;
  }
  .box-card_title {
    margin-bottom: 20px;
  }
  .new-tag {
    background: transparent;
    border: 0;
    color: #777;
    font-size: 13px;
    font-weight: 400;
    margin-bottom: 6px;
    margin-top: 1px;
    outline: none;
    padding: 4px;
    padding-left: 0;
    flex-grow: 1;
  }
}
</style>