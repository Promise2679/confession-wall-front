<script setup lang="ts">
import { ElMessageBox, ElNotification, ElMessage } from 'element-plus';
import axios from '@/request/request'

interface Props {
    postid: number
    content: string
}

interface Emits {
    change: []
}

const prop = defineProps<Props>()
const emit = defineEmits<Emits>()

const deletePost = () => {
    ElMessageBox.confirm('确定要删除吗？该内容将不会再恢复！', 'Warning', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
    }).then(() => {
        const data = {
            params: {
                post_id: prop.postid
            }
        }
        axios.delete('/api/post', data).then(res => {
            if (res.data.code === 200) {
                ElNotification({ message: '删除成功！', type: 'success', duration: 1500 })
                emit('change')
            } else {
                ElNotification({ message: `删除失败：${res.data.msg}`, type: 'error', duration: 1500 })
            }
        }).catch(err => ElMessage({ message: `Error: ${err}`, type: "error", duration: 1500 }))
    })
}

const editPost = () => {
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
        const data = {
            post_id: prop.postid,
            content: value,
        }
        axios.put('/api/post', data).then(res => {
            if (res.data.code === 200) {
                ElNotification({ message: '修改成功！', type: 'success', duration: 1500 })
                emit('change')
            } else {
                ElNotification({ message: `修改失败：${res.data.msg}`, type: 'error', duration: 1500 })
            }
        }).catch(err => ElMessage({ message: `Error: ${err}`, type: "error", duration: 1500 }))
    })
}
</script>

<template>
<div class="comment">
    <div class="content">
        {{ content }}
        <div class="pic-container">
            <el-image src="https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg"
                style="width: 100px; height: 100px;"
                :preview-src-list="['https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg']" />
        </div>
    </div>

    <div class="methods">
        <div class="method" @click="deletePost">
            <font-awesome-icon icon="fa-solid fa-xmark" />删除
        </div>
        <div class="method" @click="editPost">
            <font-awesome-icon icon="fa-solid fa-pen" />修改
        </div>
    </div>
</div>
</template>

<style scoped>
@import "@/asset/comment.css";
</style>
