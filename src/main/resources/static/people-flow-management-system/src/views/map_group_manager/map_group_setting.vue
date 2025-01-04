<template>
  <div class="map_group_setting">
    <div style="text-align: left; margin-bottom: 20px;">
      <el-button class="add_button" type="primary" @click="handleAddMapGroup">新增监控组</el-button>
    </div>
    
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item v-for="(item, index) in mapGroupList" :key="index" :name="item.groupId">
        <template #title>
          <div class="card-header">
            <span>监控组：</span>
            <div class="info_area">
              <span v-if="!item.editFlag">{{ item.mapGroupNameSure }}</span>
              <input v-else type="text" placeholder="请输入监控组名称" v-model="item.mapGroupName"/>
            </div>
            <div class="func_area">
              <el-button v-if="!item.editFlag" class="edit_button" type="primary" @click.stop="handleEdit(item)">编辑</el-button>
              <div v-else class="save_and_cancel">
                <el-button class="cancel_button" type="warning" @click.stop="handleCancel(item)">取消</el-button>
                <el-button class="save_button" type="primary" @click.stop="handleSave(item)">保存</el-button>
              </div>
            </div>
          </div>
        </template>
        <div class="card_content">
          <div class="map_img_list"
            v-for="(val, index) in item.mapImgList"
            :key="index"
          >
            <span v-if="!val.addImgFlg">{{ val.name }}</span>
            <el-select v-else v-model="val.imgName" class="m-2" placeholder="请选择" size="large">
              <el-option
                v-for="op in options"
                :key="op.value"
                :label="op.label"
                :value="op.value"
              />
            </el-select>
            <div class="map_img_item">
              <el-image
              style="width: 100px;height: 100px"
              :src="val.url"
              fit="cover">
                <template #error>
                  <div class="image-slot">
                    <el-icon><icon-picture /></el-icon>
                  </div>
                </template>
              </el-image>
              <el-icon v-if="item.editFlag" color="red" class="circle_close" @click="handleDeleteMap(item, index)"><CircleClose /></el-icon>
            </div>
          </div>
          <div class="add_img" v-if="item.editFlag">
            <div class="img_content" @click="handleAddImg(item)">
              <el-icon><Plus /></el-icon>
            </div>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
    <!-- <div>
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>地图组：</span>
            <div class="info_area">
              <span v-if="!editFlag">{{ mapGroupNameSure }}</span>
              <input v-else type="text" placeholder="请输入地图组名称" v-model="mapGroupName"/>
            </div>
            <div class="func_area">
              <el-button v-if="!editFlag" class="edit_button" type="primary" @click="editFlag = true">编辑</el-button>
              <div v-else class="save_and_cancel">
                <el-button class="cancel_button" type="warning" @click="handleCancel">取消</el-button>
                <el-button class="save_button" type="primary" @click="handleSave">保存</el-button>
              </div>
            </div>
          </div>
        </template>
        <div class="card_content">
          <div class="map_img_list"
            v-for="(item, index) in mapImgList"
            :key="index"
          >
            <span v-if="!item.addImgFlg">{{ item.name }}</span>
            <el-select v-else v-model="item.imgName" class="m-2" placeholder="请选择" size="large">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <div class="map_img_item">
              <el-image
              style="width: 100px;height: 100px"
              :src="item.url"
              :fit="cover">
                <template #error>
                  <div class="image-slot">
                    <el-icon><icon-picture /></el-icon>
                  </div>
                </template>
              </el-image>
              <el-icon v-if="editFlag" color="red" class="circle_close" @click="handleDeleteMap(item, index)"><CircleClose /></el-icon>
            </div>
          </div>
          <div class="add_img" v-if="editFlag">
            <div class="img_content" @click="handleAddImg">
              <el-icon><Plus /></el-icon>
            </div>
          </div>
        </div>
      </el-card>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { ElMessage } from 'element-plus'

import { Picture as IconPicture, CircleClose, Plus } from '@element-plus/icons-vue'

const activeNames = ref([])
const editFlag = ref(false)
const mapGroupName = ref('老庙黄金')
const mapGroupNameSure = ref('老庙黄金')
const imgName = ref('')
const addImgFlg = ref(false)
const isEdit = ref(false)
const mapGroupList = ref([
  {
    groupId: 0,
    mapGroupName: '长泰广场',
    mapGroupNameSure: '长泰广场',
    editFlag: false,
    mapImgList: [{
      id: 0,
      name: '喷泉中心',
      url: 'http://localhost:8081/background/喷泉中心.jpg',
      addImgFlg: false,
      imgName: ''
    },
    {
      id: 1,
      name: '东庭院南街',
      url: 'http://localhost:8081/background/东庭院南街.jpg',
      addImgFlg: false,
      imgName: ''
    },
    {
      id: 2,
      name: '盒马鲜生拐角',
      url: 'http://localhost:8081/background/盒马鲜生拐角.jpg',
      addImgFlg: false,
      imgName: ''
    },
    {
      id: 3,
      name: '一汽大众东街',
      url: 'http://localhost:8081/background/一汽大众东街.jpg',
      addImgFlg: false,
      imgName: ''
    },
    {
      id: 4,
      name: '长泰E座转角',
      url: 'http://localhost:8081/background/长泰E座转角.jpg',
      addImgFlg: false,
      imgName: ''
    },
    {
      id: 5,
      name: '平安银行西街',
      url: 'http://localhost:8081/background/平安银行西街.jpg',
      addImgFlg: false,
      imgName: ''
    },
    {
      id: 6,
      name: '长泰广场1座后街',
      url: 'http://localhost:8081/background/长泰广场1座后街.jpg',
      addImgFlg: false,
      imgName: ''
    }]
  },
  {
    groupId: 1,
    mapGroupName: '金桥太茂商业中心',
    mapGroupNameSure: '金桥太茂商业中心',
    editFlag: false,
    mapImgList: [{
      id: 0,
      name: '喜茶南门街',
      url: 'http://localhost:8081/background/喜茶南门街.jpg',
      addImgFlg: false,
      imgName: ''
    },
      {
        id: 1,
        name: '多乐东南角',
        url: 'http://localhost:8081/background/多乐东南角.jpg',
        addImgFlg: false,
        imgName: ''
      },
      {
        id: 2,
        name: '特斯拉西北街',
        url: 'http://localhost:8081/background/特斯拉西北街.jpg',
        addImgFlg: false,
        imgName: ''
      },
      {
        id: 3,
        name: 'oppo东北门街道',
        url: 'http://localhost:8081/background/oppo东北门街道.jpg',
        addImgFlg: false,
        imgName: ''
      },
      {
        id: 4,
        name: '小米东街',
        url: 'http://localhost:8081/background/小米东街.jpg',
        addImgFlg: false,
        imgName: ''
      },
      {
        id: 5,
        name: '南门入口区',
        url: 'http://localhost:8081/background/南门入口区.jpg',
        addImgFlg: false,
        imgName: ''
      },
      {
        id: 6,
        name: '中庭公共区',
        url: 'http://localhost:8081/background/中庭公共区.jpg',
        addImgFlg: false,
        imgName: ''
      }]
  }
])

const mapImgList1 = ref([])
const mapImgList = reactive([
  {
    id: 0,
    name: '金街1号位',
    url: 'http://localhost:8081/background/4a731a90594a4af544c0c25941171jpeg.jpg',
    addImgFlg: false,
    imgName: ''
  },
  {
    id: 1,
    name: '金街拐角',
    url: 'http://localhost:8081/background/4a731a90594a4af544c0c25941171jpeg.jpg',
    addImgFlg: false,
    imgName: ''
  },
  {
    id: 2,
    name: '金街2号位',
    url: 'http://localhost:8081/background/4a731a90594a4af544c0c25941171jpeg.jpg',
    addImgFlg: false,
    imgName: ''
  },
  {
    id: 3,
    name: '金街3号位',
    url: 'http://localhost:8081/background/4a731a90594a4af544c0c25941171jpeg.jpg',
    addImgFlg: false,
    imgName: ''
  },
  {
    id: 4,
    name: '金街4号位',
    url: 'http://localhost:8081/background/4a731a90594a4af544c0c25941171jpeg.jpg',
    addImgFlg: false,
    imgName: ''
  },
  {
    id: 5,
    name: '金街5号位',
    url: 'http://localhost:8081/background/4a731a90594a4af544c0c25941171jpeg.jpg',
    addImgFlg: false,
    imgName: ''
  },
  {
    id: 6,
    name: '金街6号位',
    url: 'http://localhost:8081/background/4a731a90594a4af544c0c25941171jpeg.jpg',
    addImgFlg: false,
    imgName: ''
  },
  {
    id: 7,
    name: '金街7号位',
    url: 'http://localhost:8081/background/4a731a90594a4af544c0c25941171jpeg.jpg',
    addImgFlg: false,
    imgName: ''
  }
])
const options = [
  {
    value: '观海街 1 号街',
    label: '观海街 1 号街',
  },
  {
    value: '观海街 2 号街',
    label: '观海街 2 号街',
  },
  {
    value: '观海街 3 号街',
    label: '观海街 3 号街',
  },
  {
    value: '观海街 4 号街',
    label: '观海街 4 号街',
  },
  {
    value: '观海街 5 号街',
    label: '观海街 5 号街',
  },
]

const handleAddMapGroup = () => {
  if (isEdit.value) {
    ElMessage({
      message: '请先保存当前编辑的监控组',
      type: 'warning',
    })
    return
  }
  isEdit.value = true
  const groupId = mapGroupList.value.length
  mapGroupList.value.push({
    groupId,
    mapGroupName: '',
    mapGroupNameSure: '',
    editFlag: true,
    mapImgList: []
  })
  activeNames.value.push(groupId)
}

const handleChange = (val: string[]) => {
  console.log(val)
}

const handleCancel = (item) => {
  item.editFlag = false
  item.mapImgList = JSON.parse(JSON.stringify(mapImgList1.value))
  mapImgList1.value = []
  isEdit.value = false
}
const handleSave = (item) => {
  item.editFlag = false
  item.mapGroupNameSure = item.mapGroupName
  item.mapImgList.forEach((val) => {
    if (val.addImgFlg) {
      val.addImgFlg = false,
      val.name = val.imgName
    }
  })
  isEdit.value = false
}
const handleAddImg = (item) => {
  item.addImgFlg= true
  const length = item.mapImgList.length
  item.mapImgList.push({
    id: length,
    name: '',
    url: 'http://localhost:8081/background/4a731a90594a4af544c0c25941171jpeg.jpg',
    addImgFlg: true,
    imgName: ''
  })
}
const handleDeleteMap = (item:any, index:number) => {
  item.mapImgList.splice(index, 1)
}

const handleEdit = (item) => {
  if (isEdit.value) {
    ElMessage({
      message: '请先保存当前编辑的监控组',
      type: 'warning',
    })
    return
  }
  isEdit.value = true
  item.editFlag = true
  mapImgList1.value = JSON.parse(JSON.stringify(item.mapImgList))
}
</script>
<style scoped lang="scss">
.map_group_setting {
  .box-card {
    height: 510px;
    overflow: auto;
  }
  .card-header {
    display: flex;
    width: 100%;
    margin-right: 20px;
  }
  .info_area {
    margin-left: 10px;
  }
  .func_area {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .card_content {
    display: flex;
    flex-wrap: wrap;
    margin-top: 30px;
  }
  .map_img_list {
    display: flex;
    flex-direction: column;
    width: 200px;
    height: 200px;
    align-items: center;
    .map_img_item {
      position: relative;
      margin-top: 10px;
      width: 110px;
      height: 110px;
      .circle_close {
        cursor: pointer;
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(50%, -50%);
      }
    }
  }
  .add_img {
    width: 200px;
    height: 200px;
    display: flex;
    justify-content: center;
    margin-top: 33px;
    .img_content {
      width: 110px;
      height: 110px;
      border: 1px dashed var(--el-border-color);
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
  }
}
</style>