<template>
  <div>
    <el-button type="primary" :icon="Plus">主要按钮</el-button>
    <el-button type="success" :icon="Edit">编辑按钮</el-button>
    <SvgIcon name="dollor" color="red" width="30px" height="30px"></SvgIcon>
    <h1>好人</h1>
  </div>
</template>

<script setup lang="ts">
import { Plus, Edit } from "@element-plus/icons-vue";
import { reqLogin } from "./api/user";
import { onMounted } from "vue";

onMounted(() => {
  reqLogin({
    username: "ceshi1",
    password: "123456"
  }
  ).then(res => {
    console.log("res", res)
  })
})

</script>

<style lang="scss">
h1 {
  color: $color2
}
</style>
