<script setup lang="ts">
import { ref, watch } from 'vue';

interface Props {
    author: string
    authorid?: number
    content?: string
}

interface Emits {
    response: [name: string]
}

const prop = defineProps<Props>()
const emit = defineEmits<Emits>()

const response = ref(false)

watch(response, (value: boolean) => value && emit('response', prop.author))
</script>

<template>
<div class="reply">
    <div class="avatar-container">
        <img src="@/asset/default_avatar.webp" class="avatar">
        <span>{{ author }}</span>
    </div>
    <div class="content">{{ content }}</div>
    <font-awesome-icon @click="response = !response" class="response" icon="fa-solid fa-comment-dots" />
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

.response {
    position: absolute;
    right: 20px;
    bottom: 5px;
}

.response:hover {
    cursor: pointer;
}
</style>