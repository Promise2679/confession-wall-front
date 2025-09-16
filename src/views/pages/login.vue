<script setup lang="ts">
import { computed, ref } from 'vue';
import { ElNotification } from 'element-plus';
import { useRouter } from 'vue-router';
import userStore from '@/stores/user';

const store = userStore()
const router = useRouter()

const username = ref('')
const password = ref('')

const isEmpty = computed(() => username.value.length === 0 || password.value.length === 0)

const login = () => {
    store.isLogin = true
    ElNotification({ message: '欢迎回来！', type: 'success', duration: 1500 })
    router.push({ name: 'home' })
}

const reg = () => {
    ElNotification({ message: '注册成功！', type: 'success', duration: 1500 })
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
            <el-button @click="reg" style="width: 500px;" type="info" :disabled="isEmpty">注册</el-button>
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

input {
    width: 300px;
    height: 25px;
    outline: none;
    border: 1px solid;
    border-radius: 4px;
}

input:focus {
    border: 3px solid #86b7fe
}
</style>