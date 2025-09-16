<script setup lang="ts">
import Card from '@/views/components/blacklist-card.vue'
</script>

<template>
<div class="container">
    <div class="title-container">
        <h2>黑名单</h2>
        <RouterLink to="/profile"><el-button>返回</el-button></RouterLink>
    </div>
    <div class="list-container">
        <Card />
        <Card />
    </div>
</div>
</template>

<style scoped>
.container {
    margin-left: 50px;
    display: flex;
    flex-direction: column;
}

.title-container {
    display: flex;
    flex-direction: row;
    align-items: center;

    gap: 20px;
}

.list-container {
    display: flex;
    flex-flow: row wrap;
    gap: 45px;
}

.card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 200px;
    gap: 5px;
    box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.1);
}

.avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
}

.btn {
    margin-top: 10px;
}
</style>
