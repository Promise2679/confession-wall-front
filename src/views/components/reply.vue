<script setup lang="ts">
import { ref, watch } from 'vue';

interface Props {
    replyid: number
    author: string
    reply_to?: string
    content: string
}

interface Emits {
    response: [name: string, id: number]
}

const prop = defineProps<Props>()
const emit = defineEmits<Emits>()

const response = ref(false)


watch(response, (value: boolean) => value && emit('response', prop.author, prop.replyid))
</script>

<template>
<div class="reply">
    <div class="avatar-container">
        <img src="@/asset/default_avatar.webp" class="avatar">
        <span>{{ author }}</span>
    </div>
    <div class="content">{{ (reply_to ? `回复：${reply_to}` : '') + content }}</div>
    <div class="methods">
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