<template>
    <div class="view-menu">
        <!-- 页面内容 -->
        <el-scrollbar class="scrollbar-demo">
            <el-row class="tac">
                <el-col :span="24">
                    <!-- 菜单栏 -->
                    <el-menu default-active="2" class="el-menu-vertical-demo" active-text-color="#ffd04b"
                        background-color="transparent" text-color="#fff" @open="handleOpen" @close="handleClose">
                        <div v-for="(item, menuindex) in sideMenu" :key="item.title">
                            <!-- 菜单项 -->
                            <el-sub-menu :index="menuindex + 1 + ''" v-if="item.children && item.children.length > 0"
                                :disabled="item.disable">
                                <!-- 菜单项标题 -->
                                <template #title>
                                    <!-- 菜单项图标 -->
                                    <el-icon>
                                        <component :is="item.icon"></component>
                                    </el-icon>
                                    <!-- 菜单项标题 -->
                                    <span>{{ item.title }}</span>
                                </template>
                                <!-- 子菜单项 -->
                                <el-menu-item :index="`${menuindex + 1}-${subIndex + 1}`"
                                    v-for="(subItem, subIndex) in item.children">
                                    <!-- 子菜单图标 -->
                                    <el-icon>
                                        <component :is="subItem.icon"></component>
                                    </el-icon>
                                    <span>{{ subItem.title }}</span>
                                </el-menu-item>
                            </el-sub-menu>
                            <!-- 单独菜单项 -->
                            <el-menu-item :index="menuindex + 1 + ''" :disabled="item.disable" v-else>
                                <!-- 菜单项图标 -->
                                <el-icon>
                                    <component :is="item.icon"></component>
                                </el-icon>
                                <!-- 菜单项标题 -->
                                <span>{{ item.title }}</span>
                            </el-menu-item>
                        </div>

                    </el-menu>
                </el-col>
            </el-row>
        </el-scrollbar>
    </div>
</template>

<script setup lang="ts" name="sideMenu">
// 导入图标组件
import {
    HomeFilled,
    Platform,
    Lock,
    Goods,
} from '@element-plus/icons-vue'

// 响应式状态
import { shallowRef } from 'vue';

// 菜单数据
const sideMenu = shallowRef([
    {
        title: "首页",
        icon: HomeFilled,
        path: "/home",
        disable: false,
        children: [
            {
                title: "首页1",
                icon: HomeFilled,
                path: "/home1"
            },
            {
                title: "首页2",
                icon: HomeFilled,   
            },
            {
                title: "首页3",
                icon: HomeFilled,
            },
            {
                title: "首页4",
                icon: HomeFilled,
            },
            {
                title: "首页5",
                icon: HomeFilled,
            },
            {
                title: "首页1",
                icon: HomeFilled,
                path: "/home1"
            },
            {
                title: "首页2",
                icon: HomeFilled,   
            },
            {
                title: "首页3",
                icon: HomeFilled,
            },
            {
                title: "首页4",
                icon: HomeFilled,
            },
            {
                title: "首页5",
                icon: HomeFilled,
            },
            {
                title: "首页1",
                icon: HomeFilled,
                path: "/home1"
            },
            {
                title: "首页2",
                icon: HomeFilled,   
            },
            {
                title: "首页3",
                icon: HomeFilled,
            },
            {
                title: "首页4",
                icon: HomeFilled,
            },
            {
                title: "首页5",
                icon: HomeFilled,
            },
            {
                title: "首页1",
                icon: HomeFilled,
                path: "/home1"
            },
            {
                title: "首页2",
                icon: HomeFilled,   
            },
            {
                title: "首页3",
                icon: HomeFilled,
            },
            {
                title: "首页4",
                icon: HomeFilled,
            },
            {
                title: "首页5",
                icon: HomeFilled,
            }

        ]
    },
    {
        title: "数据大屏",
        icon: Platform,
        path: "/data-screen",
        disable: false,
    },
    {
        title: "权限管理",
        icon: Lock,
        path: "/permission",
        disable: false,
    },
    {
        title: "商品管理",
        icon: Goods,
        path: "/goods",
        disable: false,
    }
]);
// 菜单打开事件
function handleOpen(key: string, keyPath: string[]) {
    console.log(key, keyPath);
}
function handleClose(key: string, keyPath: string[]) {
    console.log(key, keyPath);
}
// 页面逻辑
</script>

<style lang="scss" scoped>
.view-menu {
    /* 页面样式 */
    // 侧边菜单样式
    .scrollbar-demo {
            height: calc(100vh - $navibar-logo-height);
            padding: 10px;
        }
    // 页面样式
    .tac {
        .el-menu-vertical-demo {}
    }
}
</style>