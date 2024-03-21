<template>
  <div>
    监控信息详情
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

onMounted(() => {
  if (history.state.rowData) {
    const newRowData = JSON.parse(JSON.stringify(history.state.rowData))
  }
})
</script>
<style scoped lang="scss">

</style>