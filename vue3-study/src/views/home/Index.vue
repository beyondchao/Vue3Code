<template>
  <div class="home">
    <layout-default></layout-default>
  </div>
</template>

<script setup lang="ts" name="home">
import { ref, reactive, computed } from 'vue'
import LayoutDefault from '@/layout/LayoutDefault.vue'
// 响应式状态
const state = ref<string>('')

// 计算属性
// const computedValue = computed(() => {
//   return state.value
// })

// 方法
// const handleClick = () => {
//   console.log('click')
// }
</script>

<style lang="scss" scoped>
.home {
  // 样式
}
</style>