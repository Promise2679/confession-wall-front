<script setup lang="ts">
import Comment from '@/views/components/mypost.vue';
import axios from '@/request/request'
import { ElNotification, ElMessage } from 'element-plus';
import { onMounted, ref, type Ref } from 'vue';

interface Mypost {
    post_id: number
    content: string
}

const mypostList: Ref<Mypost[]> = ref([])

const getMyposts = () => {
    axios.get('/api/mypost').then(res => {
        if (res.data.code === 200) {
            mypostList.value = res.data.data
        } else {
            ElNotification({ message: `获取失败：${res.data.msg}`, type: 'error', duration: 1500 })
        }
    }).catch(err => ElMessage({ message: `Error: ${err}`, type: "error", duration: 1500 }))
}

onMounted(() => {
    getMyposts()
})
</script>

<template>
<RouterLink to="/profile"><el-button class="btn">返回</el-button></RouterLink>
<div class="comments">
    <Comment v-for="item in mypostList" :key="item.post_id" :postid="item.post_id" :content="item.content" @change="getMyposts" />
</div>
</template>

<style scoped>
.comments {
    margin: 40px auto;
}

.btn {
    position: absolute;
    top: 40px;
    left: 320px;
}
</style>
