<script setup lang="ts">
import { ref, watch } from 'vue';
import type { Rep } from '@/models/models';
import { whenever } from '@vueuse/core';

interface Props {
    data: Rep
}

// response 事件，当点击回复评论按钮时触发
// 父组件会修改回复对象，并更改评论框中的回复 id
interface Emits {
    response: [name: string, id: number]
}

const prop = defineProps<Props>()
defineEmits<Emits>()
</script>

<template>
<div class="reply">
    <div class="avatar-container">
        <img :src="data.avatar" class="avatar">
        <span>{{ data.author }}</span>
    </div>
    <!-- 正文部分，若回复的是评论则添加前缀 -->
    <div class="content">{{ (data.reply_to ? `回复 ${data.reply_to}：` : '') + data.content }}</div>
    <!-- 回复按钮，点击触发 emit -->
    <div class="methods">
        <font-awesome-icon class="method" @click="$emit('response', prop.data.author, prop.data.id)" icon="fa-solid fa-comment-dots" />
    </div>
</div>
</template>

<style scoped>
.reply {
    position: relative;
    display: flex;
    flex-direction: row;
    width: 900px;
    height: 100px;
    padding-bottom: 40px;
    padding-right: 20px;
    border-bottom: 1px solid #e9ecef;
    background-color: white;
}

.avatar-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100px;
    min-width: 100px;
    height: 100%;
}

.avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
}

.content {
    margin-top: 10px;
    word-break: break-all;
}

.methods {
    position: absolute;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 15px;
    right: 20px;
    bottom: 5px;
}

.method {
    cursor: pointer;
}
</style>
