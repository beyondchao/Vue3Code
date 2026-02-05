<template>
    <div class="view-menu">
        <!-- 页面内容 -->
        <el-row class="tac">
            <el-col :span="24">
                <!-- 菜单栏 -->
                <el-menu :default-active="$route.path" class="el-menu-vertical-demo" active-text-color="#ffd04b"
                    background-color="transparent" text-color="#fff" popper-class="popper-class" :collapse="collapse">
                    <template v-for="(item, menuindex) in sideMenu" :key="menuindex">
                        <!-- 单独菜单项 -->
                        <el-menu-item :index="item.children[0].path"
                            v-if="item.children && item.children.length === 1 && item.children[0].meta.showInMenu !== false"
                            @click="handClick(item.children[0])">
                            <!-- 菜单项图标 -->
                            <el-icon>
                                <component :is="item.children[0].meta.icon"></component>
                            </el-icon>
                            <template #title>
                                <!-- 菜单项标题 -->

                                <span class="text-dancing">{{ item.children[0].meta.title }}</span>
                            </template>
                        </el-menu-item>
                        <!-- 单独菜单项 -->
                        <el-menu-item :index="item.path" @click="handClick(item)"
                            v-if="(!item.children || item.children.length === 0) && item.meta.showInMenu !== false">
                            <!-- 菜单项图标 -->
                            <el-icon>
                                <component :is="item.meta.icon"></component>
                            </el-icon>
                            <template #title>
                                <!-- 菜单项标题 -->
                                <span class="text-dancing">{{ item.meta.title }}</span>
                            </template>
                        </el-menu-item>
                        <!-- 菜单项 -->
                        <el-sub-menu :index="item.path"
                            v-if="item.children && item.children.length > 1 && item.meta.showInMenu !== false">

                            <!-- 菜单项标题 -->
                            <template #title>
                                <!-- 菜单项图标 -->
                                <el-icon>
                                    <component :is="item.meta.icon"></component>
                                </el-icon>
                                <!-- 菜单项标题 -->
                                <span class="text-dancing">{{ item.meta.title }}</span>
                            </template>
                            <!-- 递归子菜单 -->
                            <SideMenu :menuRoute="item.children"></SideMenu>
                        </el-sub-menu>
                    </template>
                </el-menu>
            </el-col>
        </el-row>

    </div>
</template>

<script setup lang="ts" name="SideMenu">
import { useRouter, useRoute } from 'vue-router';
const { menuRoute, collapse } = defineProps<{ menuRoute?: any, collapse?: boolean }>();
const router = useRouter();
const $route = useRoute();
// 菜单数据
const sideMenu = menuRoute;

// 菜单打开事件
function handleOpen(key: string, keyPath: string[]) {
    console.log(key, keyPath);
}
// 菜单关闭事件
function handleClose(key: string, keyPath: string[]) {
    console.log(key, keyPath);
}
// 菜单点击事件
function handClick(item: any) {
    console.log('点击了菜单', item);
    if (item.path) {
        router.push({ path: item.path });
    }
}
// 页面逻辑
</script>

<style lang="scss">
.popper-class {
    background-color: $navibar-bg-color;
}

.popper-class .el-menu--popup,
.popper-class .el-menu-item {
    color: #fff !important;
}

.tac {
    .el-menu {
        border: none;
    }

    // 子菜单缩进样式
    .el-sub-menu .el-menu-item {
        padding-left: 40px !important;
        min-width: 200px;
    }

    // 多层嵌套时的缩进
    .el-sub-menu .el-sub-menu .el-menu-item {
        padding-left: 60px !important;
    }

    // 折叠状态下的子菜单项
    .el-menu--collapse .el-sub-menu .el-menu-item {
        padding-left: 10px !important;
    }
}
</style>

<style lang="scss" scoped>
.view-menu {}
</style>