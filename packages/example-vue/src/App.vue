<template>
  <div>
    你好世界
    <div ref="stage"></div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, useTemplateRef } from 'vue'
import { app } from './stage'
const stage = useTemplateRef('stage')

onMounted(() => {
  stage.value?.appendChild(app.canvas)
})
</script>
