<template>
    <div class="view-menu">
        <!-- 页面内容 -->

        <el-row class="tac">
            <el-col :span="24">
                <!-- 菜单栏 -->
                <el-menu default-active="2" class="el-menu-vertical-demo" active-text-color="#ffd04b"
                    background-color="transparent" text-color="#fff">
                    <div v-for="(item, menuindex) in sideMenu" :key="menuindex">
                        <!-- 单独菜单项 -->
                        <el-menu-item :index="item.path" v-if="item.children && item.children.length === 1 && item.children[0].meta.showInMenu !== false"
                            @click="handClick(item.children[0])">
                            <!-- 菜单项图标 -->
                            <el-icon>
                                <component :is="item.children[0].meta.icon"></component>
                            </el-icon>
                            <!-- 菜单项标题 -->
                            <span class="text-dancing">{{ item.children[0].meta.title }}</span>
                        </el-menu-item>
                        <!-- 单独菜单项 -->
                        <el-menu-item :index="item.path" @click="handClick(item)" v-if="(!item.children || item.children.length === 0) && item.meta.showInMenu !== false">
                            <!-- 菜单项图标 -->
                            <el-icon>
                                <component :is="item.meta.icon"></component>
                            </el-icon>
                            <!-- 菜单项标题 -->
                            <span class="text-dancing">{{ item.meta.title }}</span>
                        </el-menu-item>
                        <!-- 菜单项 -->
                        <el-sub-menu :index="item.path" v-if="item.children && item.children.length > 1 && item.meta.showInMenu !== false">
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
                    </div>
                </el-menu>
            </el-col>
        </el-row>

    </div>
</template>

<script setup lang="ts" name="SideMenu">
import { useRouter } from 'vue-router';
const { menuRoute } = defineProps<{ menuRoute?: any }>();
const router = useRouter();

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

<style lang="scss" scoped>
.view-menu {}
</style>