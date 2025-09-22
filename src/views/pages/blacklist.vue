<script setup lang="ts">
import Card from '@/views/components/blacklist-card.vue'
import { onMounted, ref, type Ref } from 'vue';
import axios from '@/request/request'
import { ElNotification, ElMessage } from 'element-plus';

const blacklist: Ref<number[]> = ref([])

const getBlacklist = () => {
    axios.get('/api/blacklist').then(res => {
        if (res.data.code === 200) {
            blacklist.value = res.data.data
        } else {
            ElNotification({ message: `获取失败：${res.data.msg}`, type: 'error', duration: 1500 })
        }
    }).catch(err => ElMessage({ message: `Error: ${err}`, type: "error", duration: 1500 }))
}

onMounted(() => {
    getBlacklist()
})
</script>

<template>
<div style="width: 100%; background-color: var(--bg-color);">
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
