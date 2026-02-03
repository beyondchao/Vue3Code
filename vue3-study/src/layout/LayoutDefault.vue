<template>
    <div class="home">
        <!-- 左侧菜单 -->
        <aside class="navigation-bar" :class="{ collapsed: tabbarStore.isFolded }">
            <Logo></Logo>
            <!-- 展示菜单 -->
            <el-scrollbar class="scrollbar-demo">
                <SideMenu :menuRoute="menuRoute" :collapse="tabbarStore.isFolded"></SideMenu>
            </el-scrollbar>
        </aside>
        <!-- 右侧内容区域 -->
        <div class="content" :class="{ collapsed: tabbarStore.isFolded }">
            <!-- 顶部导航栏 -->
            <header class="header">
                <Tabbar></Tabbar>
            </header>
            <!-- 主要内容区域 -->
            <main class="main-content">
                <!-- Main Content -->
                <Main> </Main>
            </main>
        </div>
    </div>
</template>
<script setup lang="ts" name="home">
import { ref } from 'vue';
import Main from '@/layout/main/Index.vue'
import Logo from '@/layout/logo/Index.vue'
import SideMenu from '@/layout/menu/index.vue'
import { useTabbarStore } from "@/stores/modules/tabbar"
import Tabbar from '@/layout/tabbar/Index.vue'

let tabbarStore = useTabbarStore();
let menuRoute = tabbarStore.menuRoute.find(item => item.name === 'index')?.children || [];

</script>



<style lang="scss" scoped>
.home {
    min-height: 100vh;
    display: flex;
    flex-direction: row;
    background-color: rgb(88, 65, 65);
    position: relative;

    .navigation-bar {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 100;
        width: $navibar-width;
        background-color: $navibar-bg-color;
        color: $text-white;
        overflow: auto;
        min-height: 100vh;
        transition: all 0.3s;

        &.collapsed {
            width: $navibar-collapsed-width;
        }

        // 侧边菜单样式
        .scrollbar-demo {
            height: calc(100vh - $navibar-logo-height);
            padding: 10px;
        }
    }

    .content {
        display: flex;
        align-items: stretch;
        min-height: 100vh;
        flex-direction: column;
        flex: 1 1 auto;
        position: relative;
        margin-left: $navibar-width;  // 将 margin-left 移到这里
        transition: all 0.3s;
        min-width: 0;  // 允许收缩

        &.collapsed {
            margin-left: $navibar-collapsed-width;  // 折叠时调整边距
        }

        .header {
            position: fixed;
            display: flex;
            left: $navibar-width;
            right: 0;
            height: $header-height;
            z-index: 100;
            top: 0;
            box-sizing: border-box;
            transition: all 0.3s;
        }

        .main-content {
            flex: 1 1 0;  // 重要：flex-basis 设为 0，让其自动计算宽度
            background: #f5f2f2;
            padding: 15px;
            margin-top: $header-height;
            transition: all 0.3s;
            overflow-x: hidden; // 禁止横向滚动
            overflow-y: auto; // 允许纵向滚动
            box-sizing: border-box;
            min-width: 0;  // 允许 flex 子元素缩小到内容以下
        }

        &.collapsed {
            .header {
                left: $navibar-collapsed-width;
            }
        }
    }

}
</style>
