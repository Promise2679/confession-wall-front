<script setup lang="ts"></script>

<template>
<div class="container">
    <div class="aside">

    </div>
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
</template>

<style scoped>
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
    width: 300px;
    background-color: gray;
}
</style>