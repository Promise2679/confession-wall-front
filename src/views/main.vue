<script setup lang="ts">
import { computed, ref } from 'vue';
import { ElNotification } from 'element-plus';
import Aside from './components/aside.vue';

const curPage = ref('login')

const username = ref('')
const password = ref('')

const notEmpty = computed(() => username.value.length === 0 || password.value.length === 0)

const login = () => {
    ElNotification({ message: '欢迎回来！', type: 'success' })
    curPage.value = 'home'
}

const reg = () => {
    ElNotification({ message: '注册成功！', type: 'success' })
}
</script>

<template>
<div class="container">
    <Aside />
    <div v-if="curPage === 'login'" class="login-container">
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
                <el-button @click="login" style="width: 500px;" type="primary" :disabled="notEmpty">登录</el-button>
            </div>
            <div class="input">
                <el-button @click="reg" style="width: 500px;" type="info" :disabled="notEmpty">注册</el-button>
            </div>
        </div>
    </div>
    <div v-if="curPage === 'home'" class="comments">
        <div class="comment">
            <div class="avatar-container">
                <img src="@/asset/default_avatar.webp" class="avatar">
                <span>11111111</span>
            </div>
            <div>114514</div>
            <div class="methods">
                <div class="method">
                    <font-awesome-icon icon="fa-solid fa-xmark" />删除
                </div>
                <div class="method">
                    <font-awesome-icon icon="fa-solid fa-pen" />修改
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<style>
body {
    margin: 0;
    padding: 0;
}
</style>

<style scoped>
.container {
    display: flex;
    flex-direction: row;
}

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

.comments {
    margin: 60px auto;
}

.comment {
    position: relative;
    display: flex;
    flex-direction: row;
    width: 1200px;
    padding-top: 20px;
    padding-bottom: 65px;
    border-bottom: 1px solid #e9ecef;
}

.avatar-container {
    display: flex;
    flex-direction: column;
    gap: 5px;
    min-width: 150px;
    width: 150px;
    height: 100%;
    justify-content: center;
    align-items: center;
}

.avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;

}

.methods {
    position: absolute;
    display: flex;
    flex-direction: row;
    gap: 7px;
    right: 10px;
    bottom: 5px;
}
</style>