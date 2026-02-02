<template>
    <div class="setting">
        <div class="setting-item">
            <div class="icon-container" @click="handleRefresh">
                <el-icon>
                    <Refresh />
                </el-icon>
            </div>
            <div class="icon-container" @click="handleFullScreen">
                <el-icon>
                    <FullScreen />
                </el-icon>
            </div>
            <div class="icon-container">
                <el-icon>
                    <Setting />
                </el-icon>
            </div>

        </div>
        <div class="logout">
            <div>
                <el-avatar :src="userStore.avatar" />
            </div>
            <el-dropdown>
                <span class="el-dropdown-link">
                    {{userStore.username}}
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Refresh, FullScreen, Setting, ArrowDown } from '@element-plus/icons-vue';
import { useTabbarStore } from '@/stores/modules/tabbar';
import  { useUserStore } from '@/stores/modules/user';
import { useRouter, useRoute } from "vue-router";

let tabbarStore = useTabbarStore();
let userStore = useUserStore();
let router = useRouter();
let route = useRoute();

function handleRefresh() {
    // Trigger page refresh in tabbar store
    tabbarStore.refreshPage();
}
function handleFullScreen() {
    // Toggle fullscreen mode
    if (!document.fullscreenElement) {
        //进入全屏
        document.documentElement.requestFullscreen();
    } else {
        if (document.exitFullscreen) {
            //退出全屏
            document.exitFullscreen();
        }
    }
}
async function handleLogout() {
    // Handle user logout
    await userStore.logout();
    if (route.name !== 'login') {
        // Redirect to login page
        router.replace({ name: 'login', query: { redirect: route.fullPath } });
    }
}
</script>   

<style scoped lang="scss">
.setting {
    display: flex;
    justify-content: center;
    align-items: center;
    // styles
    .setting-item {
        display: flex;
        align-items: center;
        justify-content: center;

        .icon-container {
            display: flex;
            margin: 0 10px;
            cursor: pointer;
            border-radius: 50%;
            background-color: #ffffff;
            width: 30px;
            height: 30px;
            align-items: center;
            justify-content: center;
            &:hover {
                background-color: #f0f0f0;
            }
        }
    }
    .logout {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 20px;
        cursor: pointer;
        color: $text-white;

        .el-avatar {
            margin-right: 8px;
            user-select: none;
        }
        .el-dropdown-link {
            cursor: pointer;
            user-select: none;
        }
    }
}
</style>