<script setup lang="ts">
import { type Blocklist } from '@/models/models';
import axios from '@/utils/request';
import { ElNotification } from 'element-plus';

interface Props {
    data: Blocklist
}

// change 事件，当点击取消拉黑按钮时触发
// 父组件会重新获取黑名单列表
interface Emits {
    change: []
}

const prop = defineProps<Props>()
const emit = defineEmits<Emits>()

const removeBlacklist = () => axios.post('/api/block', { block_id: prop.data.block_id })
    .then(() => {
        ElNotification({ message: '取消拉黑成功！', type: 'success', duration: 1500 })
        emit('change')
    })
</script>

<template>
<div class="card">
    <img class="avatar" :src="prop.data.avatar">
    <div>{{ data.block_name }}</div>
    <el-button @click="removeBlacklist" class="btn" size="small">取消拉黑</el-button>
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
    background-color: white;
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
