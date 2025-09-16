<script setup lang="ts">
import { ref } from 'vue'
import { ElNotification, ElMessageBox } from 'element-plus'
import Reply from './reply.vue'
import userStore from '@/stores/user'

interface Props {
    postid: number
    author?: string
    authorid: number
    content?: string
    comments?: number
}

const prop = defineProps<Props>()

const showComment = ref(false)
const inputContent = ref('')
const isSend = ref(false)
const response = ref(prop.author)

const sendReply = () => {
    isSend.value = true
    setTimeout(() => {
        isSend.value = false
        inputContent.value = ''
        ElNotification({ message: '发布成功！', type: 'success', duration: 1500 })
    }, 1000)
}

const addBlacklist = (id: number) => {
    ElNotification({ message: '已添加到黑名单', type: 'success', duration: 1500 })
}

const changeResponse = (name: string) => {
    response.value = name
}
</script>

<template>
<div class="comment-container">
    <div class="comment">
        <div class="avatar-container">
            <img src="@/asset/default_avatar.webp" class="avatar">
            <span>{{ author }}</span>
        </div>
        <div class="content">{{ content }}</div>
        <div class="methods">
            <div class="method" @click="addBlacklist(prop.authorid)">拉黑</div>  
            <div @click="showComment = !showComment" class="method">
                <font-awesome-icon icon="fa-solid fa-comment-dots" />{{ comments }}
            </div>
        </div>
    </div>
    <Transition>
        <div v-if="showComment" class="replies">
            <Reply author="11111" :authorid="1" content="114514" @response="changeResponse" />
            <Reply author="11111111" :authorid="1" content="11141423" @response="changeResponse" />
            <div class="input" v-loading="isSend">
                <el-input v-model="inputContent" style="width: 100%" rows="5" type="textarea"
                    :placeholder="`回复 ${response}：`"></el-input>
                <el-button @click="sendReply" style="width: 100%" type="primary"
                    :disabled="inputContent.length === 0">发布</el-button>
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

.blackify {
    margin-top: 10px;
    color: gray
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

.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>
