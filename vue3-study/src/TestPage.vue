<template>
  <div>
    <el-button type="primary" :icon="Plus">主要按钮</el-button>
    <el-button type="success" :icon="Edit">编辑按钮</el-button>
    <SvgIcon name="dollor" color="blue" width="30px" height="30px"></SvgIcon>
  </div>
</template>

<script setup lang="ts">
import { Plus, Edit } from "@element-plus/icons-vue";
import SvgIcon from "@/component/svgicon/Index.vue"
</script>

<style lang="scss"></style>
