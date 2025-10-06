<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { ElNotification } from 'element-plus'
import Reply from './Reply.vue'
import axios from '@/utils/request'
import oklchToHex from '@/utils/oklch2hex'
import userStore from '@/stores/user'
import type { Post, Rep } from '@/models/models'
import { whenever } from '@vueuse/core'

interface Props {
    data: Post
}

// change 事件，当点击拉黑按钮时触发
// 父组件会重新获取帖子列表
interface Emits {
    change: []
}

const store = userStore()

const prop = defineProps<Props>()
const emit = defineEmits<Emits>()

const replyList: Ref<Rep[]> = ref([])
const showComment = ref(false)
const inputContent = ref('')
const isSend = ref(false)
const response = ref(prop.data.name)
const replyid = ref(0)

const sendReply = () => {
    isSend.value = true
    const data = {
        post_id: prop.data.post_id,
        reply_to: replyid.value,
        content: inputContent.value,
    }
    axios.post('/api/reply', data).then(res => {
        ElNotification({ message: '发布成功！', type: 'success', duration: 1500 })
        prop.data.comments = res.data.data.total
        getReply()
    }).finally(() => {
        isSend.value = false
        inputContent.value = ''
        response.value = prop.data.name
        replyid.value = 0
    })
}
const addBlacklist = () => {
    const data = {
        block_id: prop.data.user_id
    }
    console.log(data)
    axios.post('/api/block', { block_id: prop.data.user_id })
        .then(() => {
            ElNotification({ message: '拉黑成功！', type: 'success', duration: 1500 })
            emit('change')
        })
}

const toggleLike = () => axios.post('/api/like', { post_id: prop.data.post_id })
    .then(res => prop.data.likes = res.data.data)

const getReply = () => axios.get('/api/reply', { params: { post_id: prop.data.post_id } })
    .then(res => {
        console.log(res)
        replyList.value = res.data.data
    })

const changeResponse = (name: string, id: number) => {
    response.value = name
    replyid.value = id
}

// 点击评论按钮时，获取评论列表，并初始化
whenever(showComment, () => {
    getReply()
    response.value = prop.data.name
    replyid.value = 0
})
</script>

<template>
<div class="comment-container">
    <!-- 帖子卡片 -->
    <div class="comment">
        <!-- 作者部分，显示头像和昵称 -->
        <div class="avatar-container">
            <img :src="data.avatar" class="avatar">
            <span>{{ data.name }}</span>
        </div>
        <!-- 正文部分，显示文字和图片 -->
        <div class="content">
            {{ data.content }}
            <div class="pic-container">
                <el-image v-for="(item, index) in data.picture" :src="item" style="width: 100px; height: 100px;"
                    :preview-src-list="data.picture" :initial-index="index" />
            </div>
        </div>
        <!-- 按钮部分，可以进行相关操作 -->
        <div class="methods">
            <div class="method no-pointer">
                {{ new Date(data.updated_time).toLocaleString() }}
            </div>
            <div class="method no-pointer">
                <font-awesome-icon icon="fa-solid fa-eye" />{{ data.views }}
            </div>
            <div class="method" @click="addBlacklist">拉黑</div>
            <div @click="toggleLike" class="method">
                <font-awesome-icon icon="fa-solid fa-thumbs-up" />{{ data.likes }}
            </div>
            <div @click="showComment = !showComment" class="method">
                <font-awesome-icon icon="fa-solid fa-comment-dots" />{{ data.comments }}
            </div>
        </div>
    </div>
    <!-- 评论部分，点击评论按钮时显示 -->
    <!-- 还添加了过渡小动画 -->
    <Transition>
        <div v-if="showComment" class="replies">
            <Reply v-for="item in replyList" :key="item.id" :data="item" @response="changeResponse" />
            <!-- 这条注释上面是评论，下面是评论框 -->
            <div style="width: 100%;" v-loading="isSend">
                <el-input v-model="inputContent" style="width: 100%" :rows="5" type="textarea"
                    :placeholder="`回复 ${response}：`"></el-input>
                <el-button @click="sendReply" style="width: 100%; color: white;" :disabled="inputContent.length === 0"
                    :color="oklchToHex(0.85, 0.08, store.color)">发布</el-button>
            </div>
        </div>
    </Transition>
</div>
</template>

<style scoped>
@import "@/assets/comment.css";

.comment-container {
    display: flex;
    background-color: var(--bg-color);
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.comment {
    display: flex;
    flex-direction: row;
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

.replies {
    width: 80%;
    border: 1px solid #e9ecef;
}

.no-pointer:hover {
    cursor: default;
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
