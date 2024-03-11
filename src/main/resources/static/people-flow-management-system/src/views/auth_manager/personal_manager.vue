<template>


  <div class="camera-stream">
    <el-button type="primary" @click="getCompetence">打开摄像头</el-button>
    <el-button type="danger" @click="stopNavigator">关闭摄像头</el-button>
    <el-button type="success" @click="setImage">拍照</el-button>
    <el-select v-model="facingMode" placeholder="请选择摄像头类型">
      <el-option label="前置" value="user"></el-option>
      <el-option label="后置" value="environment"></el-option>
    </el-select>
<!--    固定长宽-->
    <video ref="videoElement" :width="videoWidth" :height="videoHeight" autoplay></video>
<!--    自动长宽-->
<!--    <video ref="videoElement" autoplay class="video-autosize"></video>-->
    <canvas ref="canvasElement" style="display: none;" :width="videoWidth" :height="videoHeight"></canvas>
    <div v-if="imgSrc">
      <el-avatar shape="square" size="100" fit="fill" :src="imgSrc"></el-avatar>
    </div>
  </div>


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

import { ref } from 'vue'
import { ElButton, ElSelect, ElOption, ElAvatar } from 'element-plus'
const videoWidth = ref(600)
const videoHeight = ref(400)
const imgSrc = ref('')
const facingMode = ref('environment') // 前置还是后置摄像头 environment/user
const videoElement = ref(null)
const canvasElement = ref(null)

// 调用权限（打开摄像头功能）
const getCompetence = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        width: videoWidth.value,
        height: videoHeight.value,
        facingMode: facingMode.value
      }
    })
    if (videoElement.value) {
      videoElement.value.srcObject = stream
    }
  } catch (err) {
    console.error('未检测到摄像头', err)
  }
}

// 绘制图片（拍照功能）
const setImage = () => {
  if (videoElement.value && canvasElement.value) {
    const context = canvasElement.value.getContext('2d')
    if (context) {
      context.drawImage(videoElement.value, 0, 0, videoWidth.value, videoHeight.value)
      const image = canvasElement.value.toDataURL('image/png')
      imgSrc.value = image
      console.log(image, "--->image")
    }
  }
}

// 关闭摄像头
const stopNavigator = () => {
  if (videoElement.value && videoElement.value.srcObject) {
    videoElement.value.srcObject.getTracks().forEach(track => track.stop())
  }
}







// do not use same name with ref
const form = reactive({
  name: '张三',
  permission: 'administrator',
  address: '北京市海淀区南门大街236',
  region: '北京市海淀区',
  IDnumber: '123456789012345678',
  emergencyContact: '张伟',
  emergencyContactNumber: '13965665623',
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

.camera-stream video {
  width: 40%;
  height: auto;
}

//.video-autosize {
//  width: 100%; /* 或者设置为具体的宽度 */
//  height: auto; /* 高度自适应 */
//  object-fit: contain; /* 保持宽高比，可能会裁剪视频 */
//}
</style>