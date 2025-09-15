<script setup lang="ts"></script>

<template>
<div class="container">
    <div class="aside">
        <div class="head">
            <img class="avatar" src="@/asset/default_avatar.webp">
            <span class="name">未登录</span>
        </div>
        <hr class="translate">
        <div class="translate btn"><span class="text">首页</span></div>
        <div class="translate btn"><span class="text">个人中心</span></div>
        <div class="logout"><span class="text">注销</span></div>
        
    </div>
    <div class="login-container">
        <div class="login">
            <h2 class="title">表白墙</h2>
            <div class="input">
                <p>账号</p>
                <input type="text">
            </div>
            <div class="input">
                <p>密码</p>
                <input type="text">
            </div>
            <button class="btn-1">登录</button>
            <button class="btn-2">注册</button>
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
    width: 100%;
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

.btn-1 {
    width: 300px;
    height: 30px;
    border-radius: 4px;
    border: none;
    background-color: #0d6efd;
    color: white;
}

.btn-2 {
    width: 300px;
    height: 30px;
    border-radius: 4px;
    border: 1px solid;
    background-color: white;
}


.aside {
    min-height: 100vh;
    height: 100%;
    width: 300px;
    background-color: #f8f9fa;
}

.head {
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
    position: relative;
    transform: translate(20px, 20px);
}

.translate {
    transform: translateY(25px);
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
}

.logout {
    display: flex;
    position: relative;
    bottom: -650px;
    width: 100%;
    height: 50px;
    align-items: center;
    justify-content: center;
    color: red;
}

.btn:hover,
.logout:hover {
    background-color: rgb(226.5, 227.8, 229.1);
    transition: background-color 0.2s;
}

.text {
    text-align: center;
}
</style>