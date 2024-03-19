<template>
  <div class="user_manager">
    <el-button class="add_button" type="primary" @click="handleAdd">新增</el-button>
    <el-table :data="tableData" border stripe style="width: 100%">
      <el-table-column prop="serialNumber" label="序号" width="80" />
      <el-table-column prop="name" label="用户名" width="80" />
      <el-table-column prop="permission" label="权限" :formatter="operationFormatter" />
      <el-table-column prop="phoneNumber" label="电话" />
      <el-table-column prop="region" label="地址区域" />
      <el-table-column prop="inputTime" label="录入时间" width="200" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="handleCheck(scope.row)">查看</el-button>
          <el-button link type="primary" size="small" @click="handleEdit(scope.row)">修改</el-button>
          <el-button link type="primary" size="small" @click="handleDelete(scope.row)">删除</el-button>

        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="dialogFormVisible" title="用户信息">
      <el-form :model="form" :disabled="formDisable">
        <el-form-item label="用户名" label-width="100">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="权限" label-width="100">
          <el-select v-model="form.permission" placeholder="请选择">
            <el-option label="管理员" value="administrator" />
            <el-option label="普通用户" value="normalUser" />
          </el-select>
        </el-form-item>
        <el-form-item label="电话" label-width="100">
          <el-input v-model="form.phoneNumber" autocomplete="off" />
        </el-form-item>
        <el-form-item label="地址区域" label-width="100">
          <el-input v-model="form.region" autocomplete="off" />
        </el-form-item>
        <el-form-item label="身份证号" label-width="100">
          <el-input v-model="form.IDnumber" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer" v-if="!formDisable">
          <el-button type="primary" @click="handleSubmit">
            提交
          </el-button>
          <el-button @click="handleReset">重置</el-button>
        </span>
        <span class="dialog-footer" v-if="formDisable">
          <el-button type="primary" @click="handleCheckClose">
            关闭
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive } from 'vue'
  import { ElMessage } from 'element-plus'
  // import { storeToRefs } from 'pinia'
  import { useUserStore } from '@/stores/user'
  import { v4 as uuidv4 } from 'uuid';
  // const userList: any
  // const userList: Store<"userInfo", {
  //   userInfo: UserInfo[];
  // }, {}, {
  //   addUser(newInfo: UserInfo): void;
  //   editUser(newInfo: UserInfo): void;
  // }>
  const dialogFormVisible = ref(false)
  const formDisable = ref(false)
  let editFlag = false
  let dataNo = 0
  const userStore = useUserStore()
  // const { userInfo } = storeToRefs(userList)
  const { addUser, editUser, deleteUser } = userStore

  // const tableData = reactive([
  //   {
  //     serialNumber: 1,
  //     name: '刘鹏飞',
  //     permission: '管理员',
  //     phoneNumber: '12345678901',
  //     region: '北京市海淀区',
  //     inputTime: '2021-08-01 12:00:00',
  //     IDnumber: '123456789012345678'
  //   }
  // ])
  const tableData = userStore.userInfo
  let form = reactive({
    userId: '',
    name: '',
    permission: '',
    phoneNumber: '',
    region: '',
    IDnumber: ''
  })
  const handleAdd = () => {
    dialogFormVisible.value = true
  }
  const handleCheck = (rowData) => {
    dialogFormVisible.value = true
    formDisable.value = true
    form.name = rowData.name
    form.permission = rowData.permission
    form.phoneNumber = rowData.phoneNumber
    form.region = rowData.region
    form.IDnumber = rowData.IDnumber
  }
  const handleEdit = (rowData) => {
    editFlag = true
    dataNo = rowData.serialNumber - 1
    dialogFormVisible.value = true
    formDisable.value = false
    form.userId = rowData.userId
    form.name = rowData.name
    form.permission = rowData.permission
    form.phoneNumber = rowData.phoneNumber
    form.region = rowData.region
    form.IDnumber = rowData.IDnumber
  }
  const handleSubmit = () => {
    const newPersonalInfo = {
      userId: '',
      serialNumber: tableData.length + 1,
      name: form.name,
      permission: form.permission,
      phoneNumber: form.phoneNumber,
      region: form.region,
      inputTime: '2021-08-01 12:00:00',
      IDnumber: form.IDnumber
    }
    if (editFlag) {
      newPersonalInfo.userId = form.userId
      newPersonalInfo.serialNumber = dataNo + 1
      editUser(newPersonalInfo)
      // tableData[dataNo].name = form.name
      // tableData[dataNo].permission = form.permission
      // tableData[dataNo].phoneNumber = form.phoneNumber
      // tableData[dataNo].region = form.region
      // tableData[dataNo].IDnumber = form.IDnumber
    } else {
      newPersonalInfo.userId = uuidv4()
      // tableData.push({
      //   serialNumber: tableData.length + 1,
      //   name: form.name,
      //   permission: form.permission,
      //   phoneNumber: form.phoneNumber,
      //   region: form.region,
      //   inputTime: '2021-08-01 12:00:00',
      //   IDnumber: form.IDnumber
      // })
      
      addUser(newPersonalInfo)
    }
    dialogFormVisible.value = false
    ElMessage({
      message: '提交成功',
      type: 'success',
    })
    editFlag = false
  }
  const handleDelete = (rowData) => {
    deleteUser(rowData)
  }
  const operationFormatter = (row, column, cellValue, index) => {
    switch(row.permission) {
      case 'administrator':
        return '管理员'
        break
      case 'normalUser':
        return '普通用户'
        break
      default:
        return ''
    }
  }
  const handleReset = () => {
    form.name = ''
    form.permission = ''
    form.phoneNumber = ''
    form.region = ''
    form.IDnumber = ''
  }
  const handleCheckClose = () => {
    dialogFormVisible.value = false
    formDisable.value = false
    handleReset()
  }
</script>
<style scoped lang="scss">
.user_manager {
  .add_button {
    margin-bottom: 20px;
  }
}
</style>