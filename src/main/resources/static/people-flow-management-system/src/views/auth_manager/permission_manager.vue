<template>
  <div class="map_group_permission_assignment">
    <div class="add_map_group">
      <el-button class="add_button" type="primary" @click="handleAddMapGroup">新增地图组</el-button>
    </div>
    <el-card
     class="box-card"
     v-for="(item, index) in numOfMapGroup"
      :key="index"
    >
      <template #header>
        <div class="card-header">
          <el-form :model="item.groupFormInfo">
            <el-row>
              <el-col :span="12">
                <el-form-item label="地图组" label-width="100">
                  <el-input v-model="item.groupFormInfo.mapGroupName" autocomplete="off" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="人员权限" label-width="100">
                  <el-select v-model="item.groupFormInfo.permission" placeholder="请选择">
                    <el-option label="管理员" value="administrator" />
                    <el-option label="普通用户" value="normalUser" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>

          <el-button class="button" @click="handleInfoSave(index)">保存</el-button>
        </div>
      </template>
      <div class="card-content">
        <span>人员列表：</span>
        <el-table :data="item.tableData" border style="width: 100%; flex: 1;">
          <el-table-column type="index" width="50" />
          <el-table-column prop="name" label="名字" />
          <el-table-column prop="phoneNumber" label="电话" />
          <el-table-column prop="permission" label="权限" />
          <el-table-column prop="region" label="区域" />
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive } from 'vue'
  const numOfMapGroup = reactive([
    {
      groupFormInfo : {
        mapGroupName: '地图组1',
        permission: '管理员'
      },
      tableData: [
        {
          name: '刘鹏飞',
          phoneNumber: '12345678901',
          permission: '管理员',
          region: '北京市海淀区'
        }
      ]
    },
    {
      groupFormInfo : {
        mapGroupName: '地图组2',
        permission: '管理员'
      },
      tableData: [
        {
          name: '刘鹏飞hhh',
          phoneNumber: '284984938',
          permission: '管理员',
          region: '西伯利亚地区'
        }
      ]
    }
  ])

  const handleAddMapGroup = () => {
    numOfMapGroup.push({
      groupFormInfo : {
        mapGroupName: '',
        permission: ''
      },
      tableData: []
    })
  }
  const handleInfoSave = (index) => {
    console.log('保存')
    
    numOfMapGroup[index].tableData.push({
      name: numOfMapGroup[index].groupFormInfo.permission,
      phoneNumber: '284984938',
      permission: '管理员',
      region: '西伯利亚地区'
    })
  }
</script>
<style scoped lang="scss">
.map_group_permission_assignment {
  .add_map_group {
    text-align: left;
    margin-bottom: 20px;
  }
  .box-card {
    height: 400px;
    margin-bottom: 20px;
  }
  .card-header {
    display: flex;
    justify-content: space-between;
  }
  .card-content {
    display: flex;
  }
}
</style>