<script setup lang="ts">
import { ref } from 'vue'

interface Props {
    postid?: number
    authorid?: number
    content?: string
    comments?: number
}

defineProps<Props>()

const showComment = ref(false)
</script>

<template>
<div class="comment-container">
    <div class="comment">
        <div class="avatar-container">
            <img src="@/asset/default_avatar.webp" class="avatar">
            <span>111111111</span>
        </div>
        <div class="content">114514</div>
        <div class="methods">
            <div class="method">
                <font-awesome-icon icon="fa-solid fa-xmark" />删除
            </div>
            <div class="method">
                <font-awesome-icon icon="fa-solid fa-pen" />修改
            </div>
            <div @click="showComment = !showComment" class="method">
                <font-awesome-icon icon="fa-solid fa-comment-dots" />6
            </div>
        </div>
    </div>
    <Transition>
        <div v-if="showComment" class="replies">
            <div class="reply">
                <div class="avatar-container-reply">
                    <img src="@/asset/default_avatar.webp" class="avatar-reply">
                    <span>11111</span>
                </div>
                <div class="content-reply">114514</div>
            </div>
        </div>
    </Transition>
</div>
</template>

<style scoped>
.comment-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.comment {
    position: relative;
    display: flex;
    flex-direction: row;
    width: 1200px;
    padding-top: 20px;
    padding-bottom: 65px;
    padding-right: 20px;
    border: 1px solid #e9ecef;
    border-radius: 3px;
    box-shadow: 1px 2px 1px 1px rgba(0, 0, 0, 0.1);
}

.avatar-container {
    display: flex;
    flex-direction: column;
    gap: 5px;
    min-width: 150px;
    width: 150px;
    height: 100%;
    justify-content: center;
    align-items: center;
}

.avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;

}

.content {
    word-break: break-all;
}

.methods {
    position: absolute;
    display: flex;
    flex-direction: row;
    gap: 15px;
    right: 25px;
    bottom: 5px;
}

.method:hover {
    cursor: pointer;
}

.replies {
    border: 1px solid #e9ecef;

}

.reply {
    display: flex;
    flex-direction: row;
    width: 900px;
    height: 100px;
    padding-bottom: 40px;
    padding-right: 20px;
}

.avatar-container-reply {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100px;
    min-width: 100px;
    height: 100%;
}

.avatar-reply {
    width: 40px;
    height: 40px;
    border-radius: 50%;
}

.content-reply {
    margin-top: 10px;
    word-break: break-all;

}

.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>
