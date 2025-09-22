<script setup lang="ts">
import { ref, watch, type Ref } from 'vue'
import { ElNotification, ElMessage } from 'element-plus'
import Reply from './reply.vue'
import axios from '@/request/request'
import oklchToHex from '@/utils/oklch2hex'
import userStore from '@/stores/user'

interface Props {
    postid: number
    author: string
    authorid: number
    content: string
    comments: number
    picture: string[]
}

interface Emits {
    change: []
}

interface Reply {
    id: number
    author: string
    reply_to?: string
    content: string
}

const store = userStore()

const prop = defineProps<Props>()
const emit = defineEmits<Emits>()

const replyList: Ref<Reply[]> = ref([])
const showComment = ref(false)
const inputContent = ref('')
const isSend = ref(false)
const response = ref(prop.author)
const replyid = ref(0)

const sendReply = () => {
    isSend.value = true
    const data = {
        post_id: prop.postid,
        reply_id: replyid.value,
        content: inputContent.value,
    }
    axios.post('/api/reply', data).then(res => {
        if (res.data.code === 200) {
            ElNotification({ message: '发布成功！', type: 'success', duration: 1500 })
            getReply(prop.postid)
        } else {
            ElNotification({ message: `发布失败：${res.data.msg}`, type: 'error', duration: 1500 })
        }
    }).catch(err => ElMessage({ message: `Error: ${err}`, type: "error", duration: 1500 }))
        .finally(() => {
            isSend.value = false
            inputContent.value = ''
            response.value = prop.author
            replyid.value = 0
        })

}

const getReply = (id: number) => {
    const data = {
        params: {
            post_id: id,
        }
    }
    axios.get('/api/reply', data).then(res => {
        if (res.data.code === 200) {
            replyList.value = res.data.data
        } else {
            ElNotification({ message: `获取评论失败：${res.data.msg}`, type: 'error', duration: 1500 })
        }
    }).catch(err => ElMessage({ message: `Error: ${err}`, type: "error", duration: 1500 }))
}

const addBlacklist = () => {
    const data = {
        block_id: prop.authorid
    }
    axios.post('/api/block', data).then(res => {
        if (res.data.code === 200) {
            ElNotification({ message: '已添加到黑名单', type: 'success', duration: 1500 })
        } else {
            ElNotification({ message: `添加失败：${res.data.msg}`, type: 'error', duration: 1500 })
            emit('change')
        }
    }).catch(err => ElMessage({ message: `Error: ${err}`, type: "error", duration: 1500 }))
}

const changeResponse = (name: string, id: number) => {
    response.value = name
    replyid.value = id
}

// 点击评论按钮时，获取评论列表，并初始化
watch(showComment, value => {
    if (value) {
        getReply(prop.postid)
        response.value = prop.author
        replyid.value = 0
    }
})
</script>

<template>
<div class="comment-container">
    <div class="comment">
        <div class="avatar-container">
            <img src="@/asset/default_avatar.webp" class="avatar">
            <span>{{ author }}</span>
        </div>
        <div class="content">
            {{ content }}
            <div class="pic-container">
                <el-image src="https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg"
                    style="width: 100px; height: 100px;"
                    :preview-src-list="['https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg']" />
            </div>
        </div>
        <div class="methods">
            <div class="method" @click="addBlacklist">拉黑</div>
            <div @click="showComment = !showComment" class="method">
                <font-awesome-icon icon="fa-solid fa-comment-dots" />{{ comments }}
            </div>
        </div>
    </div>
    <Transition>
        <div v-if="showComment" class="replies">
            <Reply v-for="item in replyList" :key="item.id" :author="item.author" :content="item.content"
                :replyid="item.id" @response="changeResponse" :reply_to="item.reply_to" />
            <div class="input" v-loading="isSend">
                <el-input v-model="inputContent" style="width: 100%" rows="5" type="textarea"
                    :placeholder="`回复 ${response}：`"></el-input>
                <el-button @click="sendReply" style="width: 100%" :disabled="inputContent.length === 0"
                    :color="oklchToHex(0.85, 0.08, store.color)">发布</el-button>
            </div>
        </div>
    </Transition>
</div>
</template>

<style scoped>
@import "@/asset/comment.css";

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
