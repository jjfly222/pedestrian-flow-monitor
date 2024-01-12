<template>
  <div class="map_group_setting">
    <div style="text-align: left; margin-bottom: 20px;">
      <el-button class="add_button" type="primary">新增地图组</el-button>
    </div>
    <div>
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { Picture as IconPicture, CircleClose, Plus } from '@element-plus/icons-vue'

const editFlag = ref(false)
const mapGroupName = ref('老庙组')
const mapGroupNameSure = ref('老庙组')
const imgName = ref('')
const addImgFlg = ref(false)
const mapImgList = reactive([
  {
    id: 0,
    name: '金街1号位',
    url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
    addImgFlg: false,
    imgName: ''
  },
  {
    id: 1,
    name: '金街拐角',
    url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
    addImgFlg: false,
    imgName: ''
  },
  {
    id: 2,
    name: '金街2号位',
    url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
    addImgFlg: false,
    imgName: ''
  },
  {
    id: 3,
    name: '金街3号位',
    url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
    addImgFlg: false,
    imgName: ''
  },
  {
    id: 4,
    name: '金街4号位',
    url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
    addImgFlg: false,
    imgName: ''
  },
  {
    id: 5,
    name: '金街5号位',
    url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
    addImgFlg: false,
    imgName: ''
  },
  {
    id: 6,
    name: '金街6号位',
    url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
    addImgFlg: false,
    imgName: ''
  },
  {
    id: 7,
    name: '金街7号位',
    url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
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


const handleCancel = () => {
  editFlag.value = false
}
const handleSave = () => {
  editFlag.value = false
  mapGroupNameSure.value = mapGroupName.value
  mapImgList.forEach((item) => {
    if (item.addImgFlg) {
      item.addImgFlg = false,
      item.name = item.imgName
    }
  })
}
const handleAddImg = () => {
  addImgFlg.value = true
  const length = mapImgList.length
  mapImgList.push({
    id: length,
    name: '',
    url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
    addImgFlg: true,
    imgName: ''
  })
}
const handleDeleteMap = (item, index) => {
  mapImgList.splice(index, 1)
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