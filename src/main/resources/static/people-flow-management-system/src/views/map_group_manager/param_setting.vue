<template>
  <div class="param_setting">
    <el-form :model="form" label-width="120px">
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
              <el-input v-model="form.param1" placeholder="审批人"></el-input>
          </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="宽">
            <el-input v-model="form.param2" placeholder="审批人"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row v-if="form.regionShape==='circle'">
      <el-col :span="8">
        <el-form-item label="半径">
            <el-input v-model="form.param1" placeholder="审批人"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item label="区域面积">
        <el-input v-model="form.area"></el-input>
    </el-form-item>

    <el-card>
      <el-form-item label="设定时间范围1" label-width="110px">
        <el-time-picker
          v-model="form.time_start"
          type="date"
          placeholder="任意时间点">
        </el-time-picker>
        <span class="cut_off">--</span>
        <el-time-picker
          v-model="form.time_end"
          type="date"
          placeholder="任意时间点">
        </el-time-picker>
      </el-form-item>
      <el-form-item label="时间范围 1 对应区域最大人数" label-width="200px">
        <el-input v-model="form.max_people_num" style="width: 200px;"></el-input>
      </el-form-item>
      <el-row>
        <el-col :span="8">
            <el-form-item label="时间范围1, 当密度大于:" label-width="160px">
                <el-input v-model="form.max_people_density"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="人/m², 且移动速度小于:" label-width="160px">
                <el-input v-model="form.max_people_speed"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="m/s 时, 发出告警!" label-width="130px">
            </el-form-item>
        </el-col>
      </el-row>
    </el-card>

      
    <el-card class="box-card2">
      <el-form-item label="设定时间范围2" label-width="110px">
        <el-time-picker
          v-model="form.time_start2"
          placeholder="任意时间点">
        </el-time-picker>
        <span class="cut_off">--</span>
        <el-time-picker
          v-model="form.time_end2"
          placeholder="任意时间点">
        </el-time-picker>
      </el-form-item>
      <el-form-item label="时间范围 2 对应区域最大人数" label-width="200px">
        <el-input v-model="form.max_people_num2" style="width: 200px;"></el-input>
      </el-form-item>
      <el-row>
        <el-col :span="8">
          <el-form-item label="时间范围2, 当密度大于:" label-width="160px">
            <el-input v-model="form.max_people_density2"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="人/m², 且移动速度小于:" label-width="160px">
            <el-input v-model="form.max_people_speed2"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="m/s 时, 发出告警!" label-width="130px">
          </el-form-item>
        </el-col>
      </el-row>
    </el-card>
     
   
   
    <el-form-item class="func">
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
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
  standardLength: '1',
  regionShape: 'rectangle',
  area: '',
  param1: '',
  param2: '',
  time_start: '',
  time_end: ''
})

const onSubmit = () => {
  console.log('submit!')
}
</script>
<style scoped lang="scss">
.param_setting {
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
}
</style>