<template>
  <div class="param_setting_add">
    <el-form :model="form" :disabled="isCheck" label-width="120px">
      <el-form-item label="模版名称">
        <el-input v-model="form.name" placeholder="请输入模版名称"/>
      </el-form-item>
      <el-form-item label="标准长度">
        <el-radio-group v-model="form.standardLength" class="ml-4">
          <el-radio label="1" size="large">1 米</el-radio>
          <el-radio label="2" size="large">2 米</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="区域形状">
        <el-radio-group v-model="form.regionShape" class="ml-4">
          <el-radio label="rectangle" size="large">长方形</el-radio>
          <el-radio label="circle" size="large">圆形</el-radio>
          <el-radio label="trapezoid" size="large">梯形</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-row v-if="form.regionShape==='rectangle'">
        <el-col :span="8">
          <el-form-item label="长">
            <el-input v-model="form.param1" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="宽">
              <el-input v-model="form.param2" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="form.regionShape==='circle'">
        <el-col :span="8">
          <el-form-item label="半径">
            <el-input v-model="form.param1" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="区域面积">
        <el-input v-model="form.area"></el-input>
      </el-form-item>
    </el-form>
    <div class="time_rigion" style="text-align: left; margin-bottom:10px;">
      <el-button class="add_1" type="primary" @click="handleAddRegion" :disabled="isCheck">添加时间范围</el-button>
      <el-text class="mx-1" type="warning">最多添加 5 个</el-text>
    </div>
    <el-card class="box-card2" v-for="(item, index) in regionForm" :key="index">
      <el-form :model="item" :disabled="isCheck" label-width="120px">
        <el-form-item :label="'设定时间范围' + (index+1)" label-width="110px">
          <el-time-picker
            v-model="item.time_start"
            placeholder="任意时间点">
          </el-time-picker>
          <span class="cut_off">--</span>
          <el-time-picker
            v-model="item.time_end"
            placeholder="任意时间点">
          </el-time-picker>
        </el-form-item>
        <el-form-item :label="'时间范围' + (index+1) + '对应区域最大人数'" label-width="200px">
          <el-input v-model="item.max_people_num" style="width: 200px;"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="8">
            <el-form-item :label="'时间范围' + (index+1) + ', 当密度大于:'" label-width="160px">
              <el-input v-model="item.max_people_density"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="人/m², 且移动速度小于:" label-width="160px">
              <el-input v-model="item.max_people_speed"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="m/s 时, 发出预警!" label-width="130px">
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <div class="func">
      <el-button type="primary" @click="onSubmit" :disabled="isCheck">{{ saveType }}</el-button>
      <el-button @click="onCancel">取消</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

// do not use same name with ref
const router = useRouter()
const route = useRoute()
const form = ref({
  name: '',
  standardLength: '1',
  regionShape: 'rectangle',
  area: '',
  param1: '',
  param2: ''
})
const regionForm = ref([
  {
    time_start: '',
    time_end: '',
    max_people_num: '',
    max_people_density: '',
    max_people_speed: ''
  }

])
const isCheck = ref(false)
const saveType = ref('立即创建')

onMounted(() => {
  const checkFlag = history.state.isCheck
  if (checkFlag === 0) {
    isCheck.value = false
    saveType.value = '保存'
  } else if (checkFlag === 1) {
    isCheck.value = true
    saveType.value = '保存'
  } else if (checkFlag === 2) {
    isCheck.value = false
    saveType.value = '立即创建'
  }
  if (history.state.rowData) {
    const newRowData = JSON.parse(JSON.stringify(history.state.rowData))
    delete newRowData.regionForm
    form.value = newRowData
    regionForm.value = history.state.rowData.regionForm
  }
})

const handleAddRegion = () => {
  console.log('add region')
  if (regionForm.value.length >= 5) {
    return
  }
  const newTimeRegion = {
    time_start: '',
    time_end: '',
    max_people_num: '',
    max_people_density: '',
    max_people_speed: ''
  }
  regionForm.value.push(newTimeRegion)
}

const onSubmit = () => {
  router.push({
    name: 'param_setting_list',
    state: {
    }
  })
}

const onCancel = () => {
  router.go(-1)
}
</script>
<style scoped lang="scss">
.param_setting_add {
  .func {
    margin-top: 20px;
    text-align: right;
  }
  .box-card2 {
    margin-top: 20px;
  }
  .cut_off {
    margin: 0 10px;
  }
  .func {
    display: flex;
    justify-content: flex-end;
    :deep(.el-form-item__content) {
      flex: none;
    }
  }
  .time_rigion {
    text-align: left;
    margin-top: 30px;
    margin-bottom:10px;
    .mx-1 {
      margin-left: 10px;
      margin-right: 10px;
    }
  }
}
</style>