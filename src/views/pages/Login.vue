<script setup lang="ts">
import { computed, ref } from 'vue';
import { ElNotification } from 'element-plus';
import { useRouter } from 'vue-router';
import userStore from '@/stores/user';
import axios from '@/utils/request'

const store = userStore()
const router = useRouter()

const username = ref('')
const password = ref('')

const isEmpty = computed(() => username.value === '' || password.value === '')

const login = () => {
    const data = {
        username: username.value,
        password: password.value,
    }
    axios.post('/api/login', data).then(res => {
        store.username = username.value
        store.isLogin = true
        store.userid = res.data.data.user_id
        store.token = res.data.data.token
        ElNotification({ message: '欢迎回来！', type: 'success', duration: 1500 })
        router.push({ name: 'home' })
    }).finally(() => {
        username.value = ''
        password.value = ''
    })
}
</script>

<template>
<div class="login-container">
    <div class="login">
        <h2 class="title">表白墙</h2>
        <div class="input">
            <p>账号</p>
            <el-input v-model="username" prefix-icon="User" placeholder="请输入用户名" style="width: 500px;"></el-input>
        </div>
        <div class="input">
            <p>密码</p>
            <el-input v-model="password" prefix-icon="Lock" placeholder="请输入密码" style="width: 500px;"
                auto-complete="new-password" show-password></el-input>
        </div>
        <div class="input">
            <el-button @click="login" style="width: 500px;" type="primary" :disabled="isEmpty">登录</el-button>
        </div>
        <div class="input">
            <el-button @click="router.push({ name: 'reg' })" style="width: 500px;" type="info">没有账号？前往注册</el-button>
        </div>
    </div>
</div>
</template>

<style scoped>
.login-container {
    display: flex;
    width: calc(100% - 300px);
    justify-content: center;
}

.login {
    display: flex;
    height: 80vh;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: small;
    gap: 30px;
}

.input {
    display: flex;
    flex-direction: column;
    gap: 1px;
}
</style>
