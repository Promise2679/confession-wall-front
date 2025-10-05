<script setup lang="ts">
import { computed, ref } from 'vue';
import { ElNotification } from 'element-plus';
import { useRouter } from 'vue-router';
import axios from '@/utils/request'

const router = useRouter()

const name = ref('')
const username = ref('')
const password = ref('')

const isEmpty = computed(() => name.value === '' || username.value === '' || password.value === '')

const reg = () => {
    const data = {
        name: name.value,
        username: username.value,
        password: password.value,
    }
    axios.post('/api/reg', data).then(() => {
        ElNotification({ message: '注册成功，请重新输入账号', type: 'success', duration: 1500 })
        router.push({ name: 'login' })
    }).finally(() => {
        name.value = ''
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
            <p>昵称</p>
            <el-input v-model="name" prefix-icon="User" placeholder="请输入昵称" style="width: 500px;"></el-input>
        </div>
        <div class="input">
            <p>账号</p>
            <el-input v-model="username" prefix-icon="User" placeholder="请输入账号" style="width: 500px;"></el-input>
        </div>
        <div class="input">
            <p>密码</p>
            <el-input v-model="password" prefix-icon="Lock" placeholder="请输入密码" style="width: 500px;"
                auto-complete="new-password" show-password></el-input>
        </div>
        <div class="input">
            <el-button @click="reg" style="width: 500px;" type="primary" :disabled="isEmpty">注册</el-button>
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
