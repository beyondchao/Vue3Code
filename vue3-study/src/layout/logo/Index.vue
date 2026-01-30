<template>
  <div class="logo">
    <div class="logo-container">
        <img v-if="!setting.isLogoHidden" :src="setting.logo" alt="" class="logo-img">
        <p>{{ setting.title }}</p>
    </div>
  </div>
</template>

<script setup lang="ts" name="logo">
import { ref, reactive } from 'vue'
import setting from '@/setting'
// 页面逻辑
</script>

<style lang="scss" scoped>
.logo {
  // 页面样式
  .logo-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    padding: 5px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    flex: 0 0 auto;
    .logo-img {
        width: $navibar-logo-height;
        height: auto;
        color: white;
        margin-left: 15px;
    }
    p{
        color: #ffffff;
        text-align: center;
        font-size: $navibar-logo-font-size;
        white-space: nowrap;
        position: absolute;
        left: calc(#{$navibar-logo-height} + 32px);
    }
  }
  
}
</style>