<template>
    <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
            <component :is="Component" v-if="refresh"></component>
        </transition>
    </router-view>
</template>
<script setup lang="ts">
import { watch, nextTick, ref } from 'vue';
import { useTabbarStore } from '@/stores/modules/tabbar'
let refresh = ref(true);
let tabbarStore = useTabbarStore();

watch(() => tabbarStore.refresh, async (newVal) => {
    // 监听刷新状态变化
    refresh.value = false;
    nextTick(() => {
        console.log('页面刷新了');
        refresh.value = true;
    });
});

</script>
<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>