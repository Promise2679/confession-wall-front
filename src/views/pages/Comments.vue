<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import type { Ref } from 'vue';
import Comment from '@/views/components/Comment.vue';
import { ElNotification, type UploadProps, type UploadRequestOptions } from 'element-plus';
import { formatChecker } from '@/utils/picUploader';
import { Picture } from '@element-plus/icons-vue';
import axios from '@/utils/request'
import oklchToHex from '@/utils/oklch2hex';
import userStore from '@/stores/user';
import { type Post } from '@/models/models';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter()
const route = useRoute()
const store = userStore()

const placeholderList = ['你一生，我一世，依久依旧不分离', '写下你的心动，让世界见证你的喜欢', '有些话，只想让TA知道，也让风知道', '山野万里，你是我藏在微风中的欢喜', '此处安心是吾乡，此处留言诉衷肠', '开始你的“甜蜜输出”～']
const total = ref(100)
const postList: Ref<Post[]> = ref([])
const inputContent = ref('')
const pictureList: Ref<string[]> = ref([])

const currPage = ref(Number(route.query.p) || 1)

const isSend = ref(false)
const isAnonymous = ref(false)
const isInvisible = ref(false)

const release_time = ref('')
const isClock = ref(false)

// 从 placeholderList 中随机选择一个元素，当做 placeholder 中的内容
const placeholderContent = ref(placeholderList[Math.floor(Math.random() * placeholderList.length)])

const getPosts = () => {
    const data = {
        params: {
            page: currPage.value,
            page_size: 10,
        }
    }
    axios.get("/api/post", data).then(res => {
        postList.value = res.data.data.post_list
        total.value = res.data.data.total
    })
}

// 借助 Router 达成自动置顶的效果
const changePage = () => {
    getPosts()
    router.push({
        query: {
            p: currPage.value,
        }
    })
}

const sendPost = () => {
    isSend.value = true
    const data = {
        content: inputContent.value,
        picture: pictureList.value,
        anonymous: isAnonymous.value,
        invisible: isInvisible.value,
        release_time: release_time.value || new Date(),
        release_status: !isClock.value,
    }
    axios.post('/api/post', data).then(() => {
        getPosts()
        ElNotification({ message: '发布成功！', type: 'success', duration: 1500 })
    }).finally(() => {
        inputContent.value = ''
        isClock.value = false
        isAnonymous.value = false
        isInvisible.value = false
        release_time.value = ''
        isSend.value = false
    })
}

const isDisabled = computed(() => inputContent.value === '' || isClock.value && release_time.value === '')

const uploadPicture = (options: UploadRequestOptions) => {
    const formData = new FormData()
    formData.append('file', options.file)
    axios.post('/api/picture', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(res => {
        options.onSuccess(res.data.data)
    })
}

// 上传图片后，将返回的 url 存入 pictureList，方便后续上传给后端
const addUrl: UploadProps['onSuccess'] = res => {
    pictureList.value.push(res)
    console.log(pictureList.value)
}

onMounted(() => {
    getPosts()
})

// 点击匿名按钮时，更换 placeholder 内容
watch(isAnonymous, value => placeholderContent.value = value ? '勇敢一点，不留名也可以' : placeholderList[Math.floor(Math.random() * placeholderList.length)])
</script>

<template>
<div class="container">
    <div class="comments">
        <Comment v-for="item in postList" :key="item.post_id" :data="item" @change="getPosts" />
    </div>
    <el-pagination v-model:current-page="currPage" @update:current-page="changePage" layout="prev,pager,next"
        :total="total"></el-pagination>
    <!-- 这条注释的上面是正文，下面是输入框 -->
    <div class="input" v-loading="isSend">
        <el-input v-model="inputContent" style="width: 100%" :rows="5" type="textarea"
            :placeholder="placeholderContent"></el-input>
        <div class="btn-container">
            <!-- 上传图片部分 -->
            <el-upload action="/api/picture" v-model:file-list="pictureList" :before-upload="formatChecker" class="icon" :http-request="uploadPicture" :on-success="addUrl"
                list-type="picture" :limit="9">
                <el-icon>
                    <Picture />
                </el-icon>
            </el-upload>
        </div>
        <!-- 按钮 -->
        <div class="checkbox-container">
            <el-checkbox v-model="isClock" label="定时发布"></el-checkbox>
            <el-checkbox v-model="isAnonymous" label="匿名" />
            <el-checkbox v-model="isInvisible" label="仅自己可见" />
        </div>
        <el-date-picker v-if="isClock" v-model="release_time" type="datetime" placeholder="请选择时间"></el-date-picker>
        <!-- 炫酷的适配了自定义配色功能的按钮 -->
        <el-button @click="sendPost" style="width: 100%; color: white" :disabled="isDisabled"
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
    display: flex;
    width: 90%;
    flex-direction: column;
    gap: 20px;
}

.btn-container {
    display: flex;
    flex-direction: row;
}

.checkbox-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 15px;
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
    width: 90%;
}
</style>
