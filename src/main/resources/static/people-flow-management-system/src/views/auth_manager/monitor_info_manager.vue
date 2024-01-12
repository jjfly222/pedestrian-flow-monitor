<template>
  <div class="monitor_info_manager">
    <el-card class="box-card">
      <div class="monitor_media">
        <div class="monitor_item">
          <span>监控 1</span>
          <el-image
            style="width: 100px; height: 100px"
            src="https://element.eleme.cn/2.15/#/zh-CN/component/image"
            fit="cover"
          ></el-image>
        </div>
        <div class="monitor_item">
          <span>监控 1例图</span>
          <el-image
            style="width: 100px; height: 100px"
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
            <el-descriptions-item label="监控名称">尼亚地区监控</el-descriptions-item>
            <el-descriptions-item label="录入时间"> 2023-01-01</el-descriptions-item>
            <el-descriptions-item label="所属分组">苏州观前街</el-descriptions-item>
            <el-descriptions-item label="区域形状">菱形</el-descriptions-item>
            <el-descriptions-item label="区域面积">1388m²</el-descriptions-item>
            <el-descriptions-item label="标准长度">138m</el-descriptions-item>
            <el-descriptions-item label="占用像素" :span="2">苏州观前街</el-descriptions-item>
            <el-descriptions-item :span="2">
              <el-divider style="margin: 0;" />
            </el-descriptions-item>
            <el-descriptions-item label="时间范围 1">19:48--19:48</el-descriptions-item>
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
            <el-descriptions-item label="详细描述">苏州观前街</el-descriptions-item>
        </template>
      </el-descriptions>
    </el-card>
    
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const isCollapse = ref(false)
const handleDetail = () => {
  isCollapse.value = !isCollapse.value
}
</script>
<style scoped lang="scss">
.monitor_info_manager {
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
}
</style>