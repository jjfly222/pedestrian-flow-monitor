<template>
  <div class="approve_manage">
    <el-form :model="approveForm">
      <el-row>
        <el-col :span="8">
          <el-form-item label="事件名称">
            <el-input v-model="approveForm.name" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="复核状态" label-width="80">
            <el-select v-model="approveForm.reviewStatus" placeholder="please select your zone">
              <el-option label="全部" value="0" />
              <el-option label="待复核" value="1" />
              <el-option label="复核通过" value="2" />
              <el-option label="复核拒绝" value="3" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10">  
          <el-form-item class="on_search" label-width="10">
            <el-button type="primary" @click="onSearch">查询</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="tableData" stripe border style="width: 100%">
      <el-table-column prop="name" label="事件名称" width="180" />
      <el-table-column prop="submitTime" label="提交时间" width="180" />
      <el-table-column prop="status" label="复核状态" width="180" />
      <el-table-column prop="reviewer" label="复核人" />
      <el-table-column label="操作">
        <template #default="scope">
          <div>
            <el-button class="add_button" type="primary"
                       :disabled="scope.row.status!=='待复核'"
                       @click="onAgree(scope.row, scope.$index)">复核通过</el-button>
            <el-button class="add_button" type="warning"
                       :disabled="scope.row.status!=='待复核'"
                       @click="onReject(scope.row, scope.$index)">拒绝</el-button>
          </div>
        </template>
      </el-table-column>


    </el-table>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const approveForm = reactive({
  name: '',
  reviewStatus: '0'
})

const tableData = reactive([
  {
    name: '新增用户赵六',
    submitTime: '2024-02-01 12:15:10',
    status: '待复核',
    reviewStatus: '0',
    reviewer: '张三'
  },
  {
    name: '新增用户王五',
    submitTime: '2024-02-01 12:12:20',
    status: '复核通过',
    reviewStatus: '0',
    reviewer: '张三'
  },
  {
    name: '新增用户王朝',
    submitTime: '2024-02-01 12:08:09',
    status: '复核通过',
    reviewer: '李四'
  },
  {
    name: '用户张龙修改个人信息',
    submitTime: '2024-02-01 12:33:24',
    status: '待复核',
    reviewer: '李四'
  },
  {
    name: '用户赵虎修改个人信息',
    submitTime: '2024-02-01 12:35:26',
    status: '复核拒绝',
    reviewer: '李四'
  },
])

const onSearch = () => {
  console.log(approveForm)
}

const onAgree = (row: any, index: number) => {
  console.log(row, index)
  row.status = '复核通过'
}

const onReject = (row: any, index: number) => {
  console.log(row, index)
  row.status = '复核拒绝'
}
</script>
<style scoped lang="scss">
.approve_manage {
  .on_search {
    text-align: left;
  }
}
</style>