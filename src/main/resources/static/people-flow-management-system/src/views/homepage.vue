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
          <!-- <el-menu-item index="0">
            <el-icon><HomeFilled /></el-icon>
            <span>首页</span>
          </el-menu-item> -->
          <template v-for="(item, index) in allRoutes">
            <el-sub-menu v-if="item.children" :key="index" :index="index">
              <template #title>
                <el-icon v-if="item.meta.icon">
                  <component :is="item.meta.icon" />
                </el-icon>
                <span>{{ item.meta.title }}</span>
              </template>
              <el-menu-item v-for="(subItem, subIndex) in item.children" :key="index + 1 + '-' + subIndex" :index="index + 1 + '-' + subIndex" @click="toPage(item, subItem)">
                {{ subItem.meta.title }}
              </el-menu-item>
            </el-sub-menu>
            <el-menu-item v-else :key="index+allRoutes.length" :index="index" @click="toPage(item, null)">
              <el-icon v-if="item.meta.icon">
                <component :is="item.meta.icon" />
              </el-icon>
              <span>{{ item.meta.title }}</span>
            </el-menu-item>
            
          </template>
          <!-- <el-sub-menu v-for="(item, index) in allRoutes" :key="index" :index="`${index+1}`">
            <template #title>
              <el-icon v-if="item.meta.icon">
                <component :is="item.meta.icon" />
              </el-icon>
              <span>{{ item.meta.title }}</span>
            </template>
            <el-menu-item v-for="(subItem, subIndex) in item.children" :key="index + 1 + '-' + subIndex" :index="index + 1 + '-' + subIndex" @click="toPage(item, subItem)">
              {{ subItem.meta.title }}
            </el-menu-item>
          </el-sub-menu> -->
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
          <el-breadcrumb separator="/" class="breadcrumb">
            <el-breadcrumb-item
              v-for="(item, index) in routePath"
              :key="index"
            >
              {{ item.title }}
            </el-breadcrumb-item>

            <!-- <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
            <el-breadcrumb-item>promotion management</el-breadcrumb-item>
            <el-breadcrumb-item>promotion list</el-breadcrumb-item>
            <el-breadcrumb-item>promotion detail</el-breadcrumb-item> -->
          </el-breadcrumb>
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
import { ref, reactive, onMounted, watch, nextTick } from 'vue'
import { useRouter, useRoute, onBeforeRouteUpdate} from 'vue-router'

const isCollapse = ref(false)
const router = useRouter();
const route = useRoute();
const routePath = ref([
  {
    path: '',
    title: ''
  }
])
const allRoutes1 = router.options.routes[0].children.filter((item) => {
  return item.meta && item.meta.title
})
const handleRoutes = (routes: any) => {
  return routes
    .filter((item:any) => {
      if (item.meta && item.meta.hidden) {
        return false
      } else {
        if (item.children) {
          item.children = handleRoutes(item.children)
        }
      }
      return true
    });
}
const allRoutes = handleRoutes(allRoutes1)

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
watch(() => route, (to, from) => {
    console.log('Route changed');
    console.log('New Route:', to);
    console.log('Previous Route:', from);
  });
const toPage = (item: any, subItem: any) => {
  console.log('item', item)
  // console.log('subItem', subItem)
  // return
  if (subItem) {
    router.push(item.path + '/' + subItem.path)
  } else {
    router.push(item.path)
  }
}
onBeforeRouteUpdate((to, from, next) => {
  // 在 beforeRouteEnter 钩子中获取最新的路由信息
  console.log('Latest Matched Routes:', to.matched);
  routePath.value = []
  const matched = to.matched.slice(1)
  matched.forEach(item => {
    routePath.value.push({
      path: item.path,
      title: item.meta.title
    })
  })
  next();
})
</script>

<style lang="scss" scoped>
.common-layout {
  height: 100%;
  width: 100%;
  .el-menu-vertical-demo {
    height: -webkit-fill-available;
  }
  .bread_crumb {
    height: 50px;
    line-height: 50px;
    text-align: left;
    border-bottom: 1px solid #ebeef5;
    box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
    display: flex;
    align-items: center;
    .icon_expand {
      margin-left: 20px;
      cursor: pointer;
      color: #000;
    }
    .breadcrumb {
      margin-left: 20px;
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
