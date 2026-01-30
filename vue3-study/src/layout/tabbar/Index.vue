<template>
    <div class="tabbar">
        <!-- content -->
        <div class="left-part">
            <Breadcrumb></Breadcrumb>
        </div>
        <div class="right-part">
            <Setting></Setting>
        </div>
    </div>
</template>

<script setup lang="ts" name="Tabbar">
// component logic
import Breadcrumb from './breadcrumb/Index.vue';
import Setting from './setting/Index.vue';
</script>

<style scoped lang="scss">
.tabbar {
    width: 100%;
    background: linear-gradient(90deg, #4f8cff 0%, #6ed0ff 100%);
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left-part {
        height: 100%;
        display: flex;
        align-items: center;
    }
    .right-part {
       
    }
}
</style>