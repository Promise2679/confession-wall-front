<script setup lang="ts">
interface Props {
    id?: number
}

defineProps<Props>()
</script>

<template>
<div class="card">
    <img class="avatar" src="@/asset/default_avatar.webp">
    <div>111111</div>
    <el-button class="btn" size="small">取消拉黑</el-button>
</div>
</template>

<style scoped>
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