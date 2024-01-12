<template>
  <!-- <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div> -->
  <!-- <el-config-provider :size="size.small" :z-index="zIndex">
   
  </el-config-provider> -->
  <!-- <HelloWorld msg="Vite + Vue" /> -->
  <router-view/>
  
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { ElConfigProvider } from 'element-plus'
import HelloWorld from './components/HelloWorld.vue'
export default defineComponent({
  components: {
    ElConfigProvider,
    HelloWorld
  },
  setup() {
    enum size {
      small= 'small',
      medium= 'medium',
      mini= 'mini'
    }
    return {
      zIndex: 3000,
      // size: 'small',
      size

    }
  },
})
</script>
<style lang="scss" scoped>
* {
  margin: 0;
}
</style>
