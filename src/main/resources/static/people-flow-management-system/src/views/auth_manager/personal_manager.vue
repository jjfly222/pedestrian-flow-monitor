<template>
  <div class="personal_manager">
    <el-form :model="form" label-width="120px" style="width:600px;">
      <el-form-item label="用户名">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="权限">
        <el-select v-model="form.permission" placeholder="请选择">
          <el-option label="管理员" value="administrator" />
          <el-option label="普通用户" value="normalUser" />
        </el-select>
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="form.address" autocomplete="off" />
      </el-form-item>
      <el-form-item label="地址区域">
          <el-input v-model="form.region" autocomplete="off" />
        </el-form-item>
      <el-form-item label="身份证">
        <el-input v-model="form.IDnumber" autocomplete="off" />
      </el-form-item>
      <el-form-item label="紧急联系人">
        <el-input v-model="form.emergencyContact" autocomplete="off" />
      </el-form-item>
      <el-form-item label="紧急联系人电话">
        <el-input v-model="form.emergencyContactNumber" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

// do not use same name with ref
const form = reactive({
  name: '',
  permission: '',
  address: '',
  region: '',
  IDnumber: '',
  emergencyContact: '',
  emergencyContactNumber: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})
</script>
<style scoped lang="scss">
.personal_manager {

}
</style>