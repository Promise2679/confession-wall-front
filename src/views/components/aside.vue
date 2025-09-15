<script setup lang="ts">
</script>

<template>
<div class="aside">
    <div class="head">
        <img class="avatar" src="@/asset/default_avatar.webp">
        <span class="name">未登录</span>
    </div>
    <hr class="translate">
    <RouterLink to="/" class="translate btn">首页</RouterLink>
    <div class="translate btn"><span class="text">个人中心</span></div>
    <div class="logout"><span class="text">注销</span></div>
</div>
</template>

<style scoped>
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
    text-decoration: none;
    color: black;
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

.selected {
    background-color: rgb(226.5, 227.8, 229.1);
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