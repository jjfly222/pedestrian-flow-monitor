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
      <el-table-column property="title" label="标题" width="120" />
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
              <!-- <el-descriptions-item label="地图组">
                <el-check-tag size="small" :checked="checked" @change="onChange('map_group')">map_group</el-check-tag>
              </el-descriptions-item>
              <el-descriptions-item label="面积">
                <el-check-tag size="small" :checked="checked" @change="onChange('area')">area</el-check-tag>
              </el-descriptions-item>
              <el-descriptions-item label="监控代号">
                <el-check-tag size="small" :checked="checked" @change="onChange('monitor_name')">monitor_name</el-check-tag>
              </el-descriptions-item>
              <el-descriptions-item label="人员数量">
                <el-check-tag size="small" :checked="checked" @change="onChange('people_num')">people_num</el-check-tag>
              </el-descriptions-item>
              <el-descriptions-item label="时间">
                <el-check-tag size="small" :checked="checked" @change="onChange('occur_time')">occur_time</el-check-tag>
              </el-descriptions-item>
              <el-descriptions-item label="密度">
                <el-check-tag size="small" :checked="checked" @change="onChange('midu')">midu</el-check-tag>
              </el-descriptions-item>
              <el-descriptions-item label="最快速度">
                <el-check-tag size="small" :checked="checked" @change="onChange('fast_sudu')">fast_sudu</el-check-tag>
              </el-descriptions-item>
              <el-descriptions-item label="速度">
                <el-check-tag size="small" :checked="checked" @change="onChange('sudu')">sudu</el-check-tag>
              </el-descriptions-item> -->
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
import { ElTable, ElMessageBox } from 'element-plus'

interface User {
  title: string,
  content: string
}
const tableData = ref<User[]>([
  {
    title: 'xxx',
    content: 'xxxxxxxxxxxxxxx'
  }
])
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
    label: '监控代号',
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
    enName: 'midu'
  },
  {
    label: '最快速度',
    enName: 'fast_sudu'
  },
  {
    label: '速度',
    enName: 'sudu'
  }
])
const addTemDialogVisible = ref(false)
const checked = ref(true)
const focusEl = ref('')
const titleContent = ref('')
const textarea2 = ref('')
let isAdd = true
let tableIndex = 0

const handleAddTem = () => {
  addTemDialogVisible.value = true
  isAdd = true
}
const handleDel = (index: number) => {
  tableData.value.splice(index, 1)
}

const handleEdit = (row: User, index: number) => {
  console.log(row)
  isAdd = false
  tableIndex = index
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
    tableData.value.push({
      title: titleContent.value,
      content: textarea2.value
    })
  } else {
    tableData.value.splice(tableIndex, 1, {
      title: titleContent.value,
      content: textarea2.value
    })
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