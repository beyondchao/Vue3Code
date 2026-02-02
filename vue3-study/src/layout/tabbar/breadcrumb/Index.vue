<template>
    <div class="breadcrumb-container">
        <el-icon>
            <!-- Toggle icon based on isFolded state -->
            <component :is="tabbarStore.isFolded ? Expand : Fold" @click="tabbarStore.toggleCollapse()" />
        </el-icon>
        <div class="breadcrumb">
            <el-breadcrumb :separator-icon="ArrowRight">
                <el-breadcrumb-item v-for="value in routeInfo" :key="value.path" :to="{ path: value.path }">{{
                    value.title }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
    </div>
</template>

<script setup lang="ts">
// component logic
import { Fold , Expand, ArrowRight} from '@element-plus/icons-vue';
import  useTabbarstore  from '@/stores/modules/tabbar';
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const $route = useRoute();
let tabbarStore = useTabbarstore();
let routeInfo = computed(() => {
    let tempInfo = [];
    const matched = ($route as any)?.matched;
    if (Array.isArray(matched) && matched.length > 0) {
        for (let i = 0; i < matched.length; i++) {
            if (matched[i]?.meta?.title !== undefined) {
                tempInfo.push({
                    path: matched[i].path,
                    title: matched[i].meta.title || 'no-name'
                });
            }
        }
    }
    return tempInfo;
});
</script>

<style scoped lang="scss">
.breadcrumb-container {
    // styles
    display: flex;
    align-items: center;
    justify-content: flex-start;

    .el-icon {
        font-size: 20px;
        color: $text-white;
        margin-left: 10px;
        cursor: pointer;
    }

    .breadcrumb {
        margin-left: 10px;
       
        ::v-deep(.el-breadcrumb__inner) {
            color: $text-white !important;
            font-family: "Noto Serif SC", serif;
            font-optical-sizing: auto;
            font-weight: 100 !important;
            font-style: normal;
        }
        ::v-deep(.el-breadcrumb__separator) {
            color: $text-white !important;
        }
    }

}
</style>