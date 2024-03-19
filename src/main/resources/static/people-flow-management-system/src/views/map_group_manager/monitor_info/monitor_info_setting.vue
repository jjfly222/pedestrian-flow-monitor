<template>
  <div class="monitor_info_setting">
    <div class="select_tem">
      <span>选择模版</span>
      <el-select
        v-model="temInfo"
        class="m-2"
        placeholder="请选择"
        value-key="temId"
        @change="handleSelectChange"
        style="width: 240px"
      >
        <el-option
          v-for="item in paramTemplateList"
          :key="item.temId"
          :label="item.name"
          :value="item"
        />
      </el-select>
    </div>
    
    <el-card class="box-card">
      <div class="monitor_media">
        <div class="monitor_item">
          <span>{{ temInfo.monitorName }}</span>
          <el-image
            style="width: 300px; height: 200px"
            src="https://element.eleme.cn/2.15/#/zh-CN/component/image"
            fit="cover"
          ></el-image>
        </div>
        <div class="monitor_item">
          <span>{{ temInfo.monitorName }}例图</span>
          <el-image
            style="width: 300px; height: 200px"
            src="https://element.eleme.cn/2.15/#/zh-CN/component/image"
            fit="cover"
          ></el-image>
        </div>
      </div>
      <el-descriptions
        title="监控详情"
        :column="2"
      >
        <template #extra>
          <el-button type="primary" @click="handleDetail">详情</el-button>
        </template>
        <template v-if="isCollapse">
          <!-- <el-descriptions-item label="选择模版" span="2">
            <el-select
              v-model="temInfo"
              class="m-2"
              placeholder="请选择"
              value-key="temId"
              size="large"
              style="width: 240px"
            >
              <el-option
                v-for="item in paramTemplateList"
                :key="item.temId"
                :label="item.name"
                :value="item"
              />
            </el-select>
          </el-descriptions-item> -->
            <el-descriptions-item label="监控名称">{{ temInfo.name }}</el-descriptions-item>
            <el-descriptions-item label="录入时间">{{ temInfo.inputTime }}</el-descriptions-item>
            <el-descriptions-item label="所属分组">{{ temInfo.belongGroup }}</el-descriptions-item>
            <el-descriptions-item label="区域形状">{{ temInfo.regionShape }}</el-descriptions-item>
            <el-descriptions-item label="区域面积">{{ temInfo.area }}</el-descriptions-item>
            <el-descriptions-item label="标准长度">{{ temInfo.standardLength }}</el-descriptions-item>
            <el-descriptions-item label="占用像素" :span="2">{{ temInfo.occupiedPixel }}</el-descriptions-item>
            <el-descriptions-item :span="2">
              <el-divider style="margin: 0;" />
            </el-descriptions-item>
            <template v-for="(item, index) in temInfo.regionForm" :key="index">
              <el-descriptions-item :label="'时间范围' + (index + 1)">{{ item.time_start + '--' + item.time_end }}</el-descriptions-item>
              <el-descriptions-item label="最大人数">{{ item.max_people_num }}</el-descriptions-item>
              <el-descriptions-item label="密度">{{ item.max_people_density }}</el-descriptions-item>
              <el-descriptions-item label="对应平均最小移动速度" :span="2">{{ item.max_people_speed }}</el-descriptions-item>
            </template>
            <!-- <el-descriptions-item label="时间范围 1">19:48--19:48</el-descriptions-item>
            <el-descriptions-item label="最大人数">苏州观前街</el-descriptions-item>
            <el-descriptions-item label="密度">苏州观前街</el-descriptions-item>
            <el-descriptions-item label="对应平均最小移动速度" :span="2">苏州观前街</el-descriptions-item>
            <el-descriptions-item :span="2">
              <el-divider style="margin: 0;" />
            </el-descriptions-item>
            <el-descriptions-item label="时间范围 2">苏州观前街</el-descriptions-item>
            <el-descriptions-item label="最大人数">苏州观前街</el-descriptions-item>
            <el-descriptions-item label="密度">苏州观前街</el-descriptions-item>
            <el-descriptions-item label="对应平均最小移动速度">苏州观前街</el-descriptions-item>
            <el-descriptions-item label="详细描述">苏州观前街</el-descriptions-item> -->
        </template>
      </el-descriptions>
    </el-card>
    <span class="footer">
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="handleSave" :disabled="disabled">确定</el-button>
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

type Option = {
  temId: string
  name: string
  monitorName: string
  belongGroup: string
  inputTime: string
  desc: string
  standardLength: string
  regionShape: string
  area: string
  occupiedPixel: string
  param1: string
  param2: string
  regionForm: {
    time_start: string
    time_end: string
    max_people_num: string
    max_people_density: string
    max_people_speed: string
  }[]
}
const router = useRouter()
const isCollapse = ref(false)
const temInfo = ref<Option>({
  temId: '',
  name: '',
  monitorName: '',
  belongGroup: '',
  inputTime: '',
  desc: '',
  standardLength: '',
  regionShape: '',
  area: '',
  param1: '',
  param2: '',
  occupiedPixel: '',
  regionForm: []
})
const disabled = ref(true)
const paramTemplateList = ref([
  {
    temId: '000',
    name: '模版 1',
    monitorName: '监控 1',
    belongGroup: '苏州观前街',
    inputTime: '2023-01-01',
    desc: '',
    standardLength: '2',
    regionShape: 'circle',
    area: '100 平方米',
    param1: '',
    param2: '',
    occupiedPixel: '100px',
    regionForm: [
      {
        time_start: '',
        time_end: '',
        max_people_num: '',
        max_people_density: '',
        max_people_speed: ''
      }
    ]
  },
  {
    temId: '001',
    name: '模版 2',
    monitorName: '监控 2',
    belongGroup: '老庙黄金组',
    inputTime: '2023-01-02',
    desc: '',
    standardLength: '2',
    regionShape: 'circle',
    area: '100 平方米',
    param1: '',
    param2: '',
    occupiedPixel: '200px',
    regionForm: [
      {
        time_start: '',
        time_end: '',
        max_people_num: '',
        max_people_density: '',
        max_people_speed: ''
      }
    ]
  },
  {
    temId: '002',
    name: '模版 3',
    monitorName: '监控 3',
    belongGroup: '杭州西湖区',
    inputTime: '2023-01-03',
    desc: '',
    standardLength: '2',
    regionShape: 'circle',
    area: '100 平方米',
    param1: '',
    param2: '',
    occupiedPixel: '500px',
    regionForm: [
      {
        time_start: '',
        time_end: '',
        max_people_num: '',
        max_people_density: '',
        max_people_speed: ''
      }
    ]
  }
])
onMounted(() => {
  if (history.state.rowData) {
    const newRowData = JSON.parse(JSON.stringify(history.state.rowData))
    const newRegionForm = paramTemplateList.value.filter(item => {
      return item.temId === newRowData.temId
    })
    if (newRegionForm.length !== 0) {
      temInfo.value = newRegionForm[0]
      disabled.value = false
    }
  }
})
const handleSelectChange = ( val: Option ) => {
  temInfo.value = val
  disabled.value = false
}
const handleDetail = () => {
  isCollapse.value = !isCollapse.value
}


const handleCancel = () => {
  router.back()
}

const handleSave = () => {
  router.back()
}
</script>
<style scoped lang="scss">
.monitor_info_setting {
  .select_tem {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    span {
      color: #000;
      font-size: 14px;
      margin-right: 10px;
    }
  }
  .box-card {
    .monitor_media {
      display: flex;
      justify-content: space-around;
    }
    .monitor_item {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 10px;
    }
  }
  .footer {
    display: block;
    margin-top: 20px;
    text-align: right;
  }
}
</style>