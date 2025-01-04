<template>
  <div class="map_group_permission_assignment">
    <div class="add_map_group">
      <el-button class="add_button" type="primary" @click="handleAddMapGroup">新增监控组</el-button>
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      empty-text="暂无数据"
    >
      <el-table-column prop="groupName" label="监控组名称" />
      <el-table-column label="人员">
        <template #default="scope">
          <el-tooltip
            class="box-item"
            effect="dark"
            :content="scope.row.personnelAuthority.join(', ')"
            placement="top"
          >
            <!-- <el-table-column prop="personnelNum" label="人员" width="180" /> -->
            <span>{{ scope.row.personnelNum }}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      v-model="dialogVisible"
      title="监控组"
      width="70%"
      :before-close="handleClose"
    >
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <el-form :model="mapGroupDetail.groupFormInfo">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="监控组" label-width="100">
                    <el-input v-model="mapGroupDetail.groupFormInfo.mapGroupName" autocomplete="off" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="人员权限" label-width="100">
                    <el-select v-model="mapGroupDetail.groupFormInfo.permission" placeholder="请选择">
                      <el-option label="管理员" value="管理员" />
                      <el-option label="普通用户" value="普通用户" />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </template>
        <div class="card-content">
          <span style="display:inline-block; width: 100px;">人员列表：</span>
          <el-select v-model="member" placeholder="请选择">
            <el-option
              v-for="(item, index) in memberList"
              :key="index"
              :label="item.name" 
              :value="index"
            />
          </el-select>
          <el-button style="margin-left: 10px;" type="primary" @click="handleMemberSave">添加</el-button>
        </div>
        <el-table
          :data="mapGroupDetail.tableData"
          border
          style="width: 100%; flex: 1;"
          empty-text="暂无数据"
        >
          <el-table-column type="index" width="50" />
          <el-table-column prop="name" label="名字" />
          <el-table-column prop="phoneNumber" label="电话" />
          <el-table-column prop="permission" label="权限" />
          <el-table-column prop="region" label="区域" />
          <el-table-column label="操作">
            <template #default="scope">
              <el-button type="danger" size="small" @click="handleMemberDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
          
        </el-table>
      </el-card>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleGroupMapSave">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
  import { useInfoStore } from '@/stores/user'
  import { ref, reactive, watch } from 'vue'
  import { ElMessage } from 'element-plus'

  interface PersonList {
    personId: string,
    name: string,
    phoneNumber: string,
    permission: string,
    region: string
  }
  interface TableData {
    id: string,
    groupName: string,
    personnelAuthority: string[],
    personnelNum: number,
    personList: Array<PersonList>
  }
  const dialogVisible = ref(false)
  const member = ref()
  const groupFormIndex = ref(0)
  const tableData = ref([
    {
      id: '000',
      groupName: '长泰广场',
      personnelAuthority: ['张三', '王朝', '马汉'],
      personnelNum: 3,
      personList: [
        {
          personId: '000',
          name: '张三',
          phoneNumber: '12345678901',
          permission: '管理员',
          region: '北京市海淀区'
        },
        {
          personId: '111',
          name: '王朝',
          phoneNumber: 'normalUser',
          permission: '普通用户',
          region: '上海市浦东新区'
        },
        {
          personId: '222',
          name: '马汉',
          phoneNumber: '18078951235',
          permission: '普通用户',
          region: '上海市浦东新区'
        },
      ]
    },
    {
      id: '001',
      groupName: '金桥太茂商业中心',
      personnelAuthority: ['李四', '赵六', '赵四'],
      personnelNum: 3,
      personList: [
        {
          personId: '333',
          name: '李四',
          phoneNumber: '12345678901',
          permission: '管理员',
          region: '北京市通州区'
        },
        {
          personId: '444',
          name: '赵六',
          phoneNumber: '13912342345',
          permission: '普通用户',
          region: '北京市通州区'
        },
        {
          personId: '555',
          name: '赵四',
          phoneNumber: '13914749636',
          permission: '普通用户',
          region: '北京市朝阳区'
        }
      ]
    }
  ])
  const mapGroupDetail = ref({
    groupFormInfo : {
      id: '',
      mapGroupName: '',
      permission: ''
    },
    tableData: [
      {
        personId: '',
        name: '',
        phoneNumber: '',
        permission: '',
        region: ''
      }
    ]
  })
  const memberList:Array<PersonList> = reactive([
    {
      personId: '000',
      name: '张三',
      phoneNumber: '12345678901',
      permission: '管理员',
      region: '北京市海淀区'
    },
    {
      personId: '111',
      name: '王朝',
      phoneNumber: 'normalUser',
      permission: '普通用户',
      region: '上海市浦东新区'
    },
    {
      personId: '222',
      name: '马汉',
      phoneNumber: '18078951235',
      permission: '普通用户',
      region: '上海市浦东新区'
    },
    {
      personId: '333',
      name: '李四',
      phoneNumber: '12345678901',
      permission: '管理员',
      region: '北京市通州区'
    },
    {
      personId: '444',
      name: '赵六',
      phoneNumber: '13912342345',
      permission: '普通用户',
      region: '北京市通州区'
    },
    {
      personId: '555',
      name: '赵四',
      phoneNumber: '13914749636',
      permission: '普通用户',
      region: '北京市朝阳区'
    }
  ])

  watch(dialogVisible, (newValue) => {
    if (newValue) {
      member.value = null
    }
  })
  const handleAddMapGroup = () => {
    groupFormIndex.value = tableData.value.length
    mapGroupDetail.value= {
      groupFormInfo : {
        id: '',
        mapGroupName: '',
        permission: ''
      },
      tableData: []
    }
    dialogVisible.value = true

  }
  const handleMemberSave = () => {
    if (!member.value && member.value!==0) {
      return
    }
    memberList[member.value].personId
    const tableData0 = mapGroupDetail.value.tableData
    const isHave = tableData0.some((item) => item.personId === memberList[member.value].personId)
    if (isHave) {
      return
    }
    mapGroupDetail.value.tableData.push({
      personId: memberList[member.value].personId,
      name: memberList[member.value].name,
      phoneNumber: memberList[member.value].phoneNumber,
      permission: memberList[member.value].permission,
      region: memberList[member.value].region
    })
  }
  const handleEdit = (index:number, row:TableData) => {
    groupFormIndex.value = index
    mapGroupDetail.value = {
      groupFormInfo : {
        id: row.id,
        mapGroupName: row.groupName,
        permission: row.personnelAuthority
      },
      tableData: row.personList
    }
    dialogVisible.value = true
  }
  const handleDelete = (index:number) => {
    tableData.value.splice(index, 1)
  }
  const handleMemberDelete = (index:number, row: PersonList) => {
    mapGroupDetail.value.tableData.splice(index, 1)
  }
  const handleGroupMapSave = () => {
    if (groupFormIndex.value === tableData.value.length) {
      const tableNewRow = {
        id: mapGroupDetail.value.groupFormInfo.id,
        groupName: mapGroupDetail.value.groupFormInfo.mapGroupName,
        personnelAuthority: mapGroupDetail.value.groupFormInfo.permission,
        personList: mapGroupDetail.value.tableData
      }
      tableData.value.push(tableNewRow)
    }
    tableData.value[groupFormIndex.value].id = mapGroupDetail.value.groupFormInfo.id
    tableData.value[groupFormIndex.value].groupName = mapGroupDetail.value.groupFormInfo.mapGroupName
    tableData.value[groupFormIndex.value].personnelAuthority = mapGroupDetail.value.groupFormInfo.permission
    tableData.value[groupFormIndex.value].personList = mapGroupDetail.value.tableData
    dialogVisible.value = false
    ElMessage({
      message: '保存成功',
      type: 'success',
    })
  }
  const handleClose = (done:any) => {
    done()
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
    align-items: center;
    margin-bottom: 20px;
  }
}
</style>