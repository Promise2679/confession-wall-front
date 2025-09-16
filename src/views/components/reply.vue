<script setup lang="ts">
import { ref, watch } from 'vue';
import { ElNotification } from 'element-plus';

interface Props {
    author: string
    authorid: number
    content?: string
}

interface Emits {
    response: [name: string]
}

const prop = defineProps<Props>()
const emit = defineEmits<Emits>()

const response = ref(false)

const addBlacklist = (id: number) => {
    ElNotification({ message: '已添加到黑名单', type: 'success', duration: 1500 })
}

watch(response, (value: boolean) => value && emit('response', prop.author))
</script>

<template>
<div class="reply">
    <div class="avatar-container">
        <img src="@/asset/default_avatar.webp" class="avatar">
        <span>{{ author }}</span>
    </div>
    <div class="content">{{ content }}</div>
    <div class="methods">
        <div class="method" @click="addBlacklist(prop.authorid)">拉黑</div>
        <font-awesome-icon class="method" @click="response = !response" icon="fa-solid fa-comment-dots" />
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