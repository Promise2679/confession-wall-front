<script setup lang="ts">
import { ref } from 'vue'
import { ElNotification, ElMessageBox } from 'element-plus'
import Reply from './reply.vue'
import userStore from '@/stores/user'

interface Props {
    postid: number
    author?: string
    authorid?: number
    content?: string
    comments?: number
}

const prop = defineProps<Props>()

const store = userStore()

const showComment = ref(false)
const inputContent = ref('')
const isSend = ref(false)
const response = ref('author')

const sendReply = () => {
    isSend.value = true
    setTimeout(() => {
        isSend.value = false
        inputContent.value = ''
        ElNotification({ message: '发布成功！', type: 'success', duration: 1500 })
    }, 1000)
}

const deletePost = (index: number) => {
    ElMessageBox.confirm('确定要删除吗？该内容将不会再恢复！', 'Warning', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
    }).then(() => {
        ElNotification({ message: '删除成功！', type: 'success', duration: 1500 })
    })
}

const editPost = (id: number) => {
    ElMessageBox.prompt('请编辑要修改的部分：', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        inputValue: prop.content,
        inputType: 'textarea',
        inputPattern: /^(?!\s*$).+/,
        inputErrorMessage: '内容不能为空！',
    }).then(({ value }) => {
        if (prop.content === value) {
            return
        }
        ElNotification({ message: '修改成功！', type: 'success' })
    })
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
            <div class="method" @click="deletePost(prop.postid)">
                <font-awesome-icon icon="fa-solid fa-xmark" />删除
            </div>
            <div class="method" @click="editPost(prop.postid)">
                <font-awesome-icon icon="fa-solid fa-pen" />修改
            </div>
            <div @click="showComment = !showComment" class="method">
                <font-awesome-icon icon="fa-solid fa-comment-dots" />{{ comments }}
            </div>
        </div>
    </div>
    <Transition>
        <div v-if="showComment" class="replies">
            <Reply author="11111" content="114514" @response="changeResponse" />
            <Reply author="11111111" content="11141423" @response="changeResponse" />
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
