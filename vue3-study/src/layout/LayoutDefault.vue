<template>
    <div class="home">
        <!-- 左侧菜单 -->
        <aside class="navigation-bar">
            <Logo></Logo>
            <!-- 展示菜单 -->
            
                <SideMenu></SideMenu>
           
        </aside>
        <!-- 右侧内容区域 -->
        <div class="content">
            <!-- 顶部导航栏 -->
            <header class="header"></header>
            <!-- 主要内容区域 -->
            <main class="main-content">
                <!-- 具体内容 -->
            </main>
        </div>
    </div>
</template>
<script setup lang="ts" name="home">
import { ref, reactive } from "vue"
import Logo from '@/layout/logo/Index.vue'
import SideMenu from '@/layout/menu/index.vue'

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
        
    }
    .content {
        display: flex;
        align-items: stretch;
        min-height: 100vh;
        flex-direction: column;
        flex: 1 1 auto;
        position: relative;

        .header {
            position: fixed;
            display: flex;
            left: $navibar-width;
            right: 0;
            height: $header-height;
            background-color: $navibar-bg-color;
            z-index: 100;
            top: 0;
            box-sizing: border-box;
        }

        .main-content {
            // flex: 1 1 auto;
            background: #f5f2f2;
            height: 1000vh;
            padding: 15px;
            margin-top: $header-height;
        }
    }

}
</style>
