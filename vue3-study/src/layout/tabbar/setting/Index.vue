<template>
    <div class="setting">
        <div class="setting-item">
            <div class="icon-container">
                <el-icon>
                    <Refresh />
                </el-icon>
            </div>
            <div class="icon-container">
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
                <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
            </div>
            <el-dropdown>
                <span class="el-dropdown-link">
                    admin
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>登出</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Refresh, FullScreen, Setting } from '@element-plus/icons-vue';
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
        }
    }
}
</style>