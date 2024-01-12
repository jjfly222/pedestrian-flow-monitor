<template>
  <div class="common-layout">
    <el-container style="height: 100%;">
      <el-aside>
        <el-menu
          default-active="0"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
        >
          <el-menu-item index="0">
            <el-icon><HomeFilled /></el-icon>
            <span>首页</span>
          </el-menu-item>
          <el-sub-menu v-for="(item, index) in allRoutes" :key="index" :index="`${index+1}`">
            <template #title>
              <el-icon>
                <component :is="item.meta.icon" />
              </el-icon>
              <span>{{ item.meta.title }}</span>
            </template>
            <el-menu-item v-for="(subItem, subIndex) in item.children" :key="index + 1 + '-' + subIndex" :index="index + 1 + '-' + subIndex" @click="toPage(item, subItem)">
              {{ subItem.meta.title }}
            </el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-aside>
      <el-main class="el_main">
        <div class="bread_crumb">
          <el-icon class="icon_expand" v-show="!isCollapse" @click="handleCollapse">
            <Expand />
          </el-icon>
          <el-icon class="icon_expand" v-show="isCollapse" @click="handleCollapse">
            <Fold />
          </el-icon>
        </div>
        <div class="contain_view">
          <router-view />
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
// import {
//   Tools,
//   Menu as IconMenu,
//   HomeFilled,
//   Fold
// } from '@element-plus/icons-vue'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const isCollapse = ref(false)
const router = useRouter();
const allRoutes = router.options.routes.filter((item) => item.meta && item.meta.title)
console.log('allRoutes', allRoutes)

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleCollapse = () => {
  isCollapse.value = !isCollapse.value
}

onMounted(() => {
  console.log('route', router.options.routes)
})
const toPage = (item: any, subItem: any) => {
  // console.log('item', item)
  // console.log('subItem', subItem)
  // return
  router.push(item.path + '/' + subItem.path)
}
</script>

<style lang="scss" scoped>
.common-layout {
  height: 100%;
  width: 100%;
  .el-menu-vertical-demo {
    height: 100%;
  }
  .bread_crumb {
    height: 50px;
    line-height: 50px;
    text-align: left;
    border-bottom: 1px solid #ebeef5;
    box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
    .icon_expand {
      margin-left: 20px;
      cursor: pointer;
      color: #000;
    }
  }
  .contain_view {
    margin: 20px;
  }
}
  .el_main {
    height: 100%;
    overflow: auto;
    padding: 0px;
    background-color: #fff;
  }
  :deep(.el-aside) {
    max-width: 200px;
    width: fit-content;
  }
</style>
