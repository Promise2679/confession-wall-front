<script setup lang="ts">
import userStore from '@/stores/user';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { watchDebounced } from '@vueuse/core';

const store = userStore()
const router = useRouter()

const fontSize = ref(store.fontSize)
const color = ref(store.color)

const updateFontsize = (value: number) => {
    store.fontSize = value
    document.documentElement.style.setProperty('--font-size', `${fontSize.value}em`)
}

const updateColor = (value: number) => {
    store.color = value
    document.documentElement.style.setProperty('--color', `${color.value}`)
}

const logout = () => {
    store.$reset()
    router.push({ name: 'login' })
}

// 实时监听，更新主题色和全局字体
watchDebounced(fontSize, value => updateFontsize(value), { debounce: 500, maxWait: 50, immediate: true })
watchDebounced(color, value => updateColor(value), { debounce: 500, maxWait: 50, immediate: true })
</script>

<template><el-affix>
    <div class="aside">
        <div class="head">
            <img class="avatar" :src="store.avatar">
            <span class="name">{{ store.username || '未登录' }}</span>
        </div>
        <RouterLink to="/" class="btn">首页</RouterLink>
        <RouterLink to="/rank" class="btn">排行榜</RouterLink>
        <RouterLink to="/profile" class="btn">个人中心</RouterLink>
        <div style="flex: 1"></div>
        <div class="option">
            <div class="font">主题色</div>
            <input type="range" v-model="color" min="0" max="360" class="color" step="1" style="width: 100%">
        </div>
        <div class="option">
            <div class="font">字号</div>
            <input type="range" v-model="fontSize" step="0.1" min="1" max="1.5" style="width: 100%" />
        </div>
        <div @click="logout" class="logout">注销</div>
    </div>
</el-affix></template>

<style scoped>
.aside {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    height: 100vh;
    width: 300px;
    background-color: #f8f9fa;
}

.head {
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
    transform: translate(20px, 20px);
}

.avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
}

.name {
    text-align: center;
}

.btn {
    display: flex;
    width: 100%;
    height: 50px;
    margin-top: 10px;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: black;
    transform: translateY(25px);
}

.option {
    display: flex;
    width: 100%;
    height: 50px;
    flex-flow: row;
    gap: 10px;
    align-items: center;
    justify-content: center;
}

.font {
    white-space: nowrap;
}

.logout {
    display: flex;
    width: 100%;
    height: 50px;
    align-items: center;
    justify-content: center;
    color: red;
}

.selected {
    background-color: rgb(226.5, 227.8, 229.1);
}

.btn:hover,
.logout:hover {
    background-color: rgb(226.5, 227.8, 229.1);
    transition: background-color 0.2s;
    cursor: pointer;
}
</style>
