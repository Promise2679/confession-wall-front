<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import type { Ref } from 'vue';
import Comment from '@/views/components/comment.vue';
import { ElNotification, ElMessage, type UploadProps } from 'element-plus';
import { formatChecker } from '@/utils/picUploader';
import { Picture } from '@element-plus/icons-vue';
import axios from '@/request/request'
import oklchToHex from '@/utils/oklch2hex';
import userStore from '@/stores/user';
import { type Post } from '@/models/models';


const store = userStore()

const placeholderList = ['你一生，我一世，依久依旧不分离', '写下你的心动，让世界见证你的喜欢', '有些话，只想让TA知道，也让风知道', '山野万里，你是我藏在微风中的欢喜', '此处安心是吾乡，此处留言诉衷肠', '开始你的“甜蜜输出”～']
const postList: Ref<Post[]> = ref([])
const inputContent = ref('')
const pictureList: Ref<string[]> = ref([])

const isSend = ref(false)

const isAnonymous = ref(false)
const isInvisible = ref(false)

// placeholder 随机内容
const placeholderContent = ref(placeholderList[Math.floor(Math.random() * placeholderList.length)])

const getPosts = () => {
    axios.get("/api/post").then(res => {
        postList.value = res.data.data
        console.log(res.data)
        if (res.data.code === 200) {

        } else {
            ElMessage({ message: `无法获取帖子内容:${res.data.msg}`, type: "error", duration: 1500 })
        }
    }).catch(err => ElMessage({ message: `Error: ${err}`, type: "error", duration: 1500 }))
}

const sendPost = () => {
    isSend.value = true
    const data = {
        content: inputContent.value,
        picture: pictureList.value,
        anonymous: isAnonymous.value,
        invisible: isInvisible.value,
    }
    axios.post('/api/post', data).then(res => {
        if (res.data.code === 200) {
            getPosts()
            ElNotification({ message: '发布成功！', type: 'success', duration: 1500 })
        } else {
            ElNotification({ message: `发布失败：${res.data.msg}`, type: 'error', duration: 1500 })
        }
    }).catch(err => ElMessage({ message: `Error: ${err}`, type: "error", duration: 1500 }))
        .finally(() => {
            inputContent.value = ''
            isSend.value = false
        })
}

const addUrl: UploadProps['onSuccess'] = res => {
    pictureList.value.push(res.data)
}

onMounted(() => {
    getPosts()
})

// 点击匿名按钮时，更换 placeholder 内容
watch(isAnonymous, value => {
    placeholderContent.value = value ? '勇敢一点，不留名也可以' : placeholderList[Math.floor(Math.random() * placeholderList.length)]
})
</script>

<template>
<div class="container">
    <div class="comments">
        <Comment v-for="item in postList" :key="item.id" :data="item" @change="getPosts" />
    </div>
    <div class="input" v-loading="isSend">
        <el-input v-model="inputContent" style="width: 100%" rows="5" type="textarea"
            :placeholder="placeholderContent"></el-input>
        <div class="btn-container">
            <el-upload action="/api/picture" :before-upload="formatChecker" :on-success="addUrl" class="icon"
                list-type="picture" :limit="9">
                <el-icon>
                    <Picture />
                </el-icon>
            </el-upload>
        </div>
        <div>
            <el-checkbox v-model="isAnonymous" label="匿名" />
            <el-checkbox v-model="isInvisible" label="仅自己可见" />
        </div>
        <el-button @click="sendPost" style="width: 100%; color: white" :disabled="inputContent.length === 0"
            :color="oklchToHex(0.85, 0.08, store.color)">发布</el-button>
    </div>
</div>
</template>

<style scoped>
.container {
    background-color: var(--bg-color);
    display: flex;
    flex-direction: column;
    flex-grow: 40;
    align-items: center;
    gap: 40px;
}

.comments {
    margin-top: 40px;
}

.btn-container {
    display: flex;
    flex-direction: row;
}

.icon {
    margin-right: 30px;
}

.icon:hover {
    cursor: pointer;
}

.input {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 1220px;
}
</style>
