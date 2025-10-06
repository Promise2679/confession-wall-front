<script setup lang="ts">
import Card from '@/views/components/Blacklist-card.vue'
import { onMounted, ref, type Ref } from 'vue';
import axios from '@/utils/request'
import { type Blocklist } from '@/models/models';
import { ElNotification } from 'element-plus';

const blacklist: Ref<Blocklist[]> = ref([])

const getBlacklist = () => axios.get('/api/blacklist').then(res => blacklist.value = res.data.data)

onMounted(() => getBlacklist())
</script>

<template>
<div style="width: 100%; background-color: var(--bg-color);">
    <div class="container">
        <!-- 标题部分 -->
        <div class="title-container">
            <h2>黑名单</h2>
            <RouterLink to="/profile"><el-button>返回</el-button></RouterLink>
        </div>
        <!-- 主体部分 -->
        <div class="list-container">
            <Card v-for="item in blacklist" :key="item.block_id" :data="item" @change="getBlacklist" />
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
