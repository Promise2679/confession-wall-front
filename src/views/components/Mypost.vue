<script setup lang="ts">
import { ElMessageBox, ElNotification } from 'element-plus';
import axios from '@/utils/request'
import type { Mypost } from '@/models/models';

interface Props {
    data: Mypost
}

// change 事件，当删除或修改帖子时触发
// 父组件会重新获取用户的帖子
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
    }).then(() => axios.delete('/api/post', { params: { post_id: prop.data.post_id } }).then(() => {
        ElNotification({ message: '删除成功！', type: 'success', duration: 1500 })
        emit('change')
    }))
}

const editPost = () => {
    ElMessageBox.prompt('请编辑要修改的部分：', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        inputValue: prop.data.content,
        inputType: 'textarea',
        inputPattern: /^(?!\s*$).+/,
        inputErrorMessage: '内容不能为空！',
    }).then(({ value }) => {
        if (prop.data.content === value) return
        const data = {
            post_id: prop.data.post_id,
            content: value,
        }
        axios.put('/api/post', data).then(() => {
            ElNotification({ message: '修改成功！', type: 'success', duration: 1500 })
            emit('change')
        })
    })
}
</script>

<template>
<div class="comment">
    <div class="content">
        {{ data.content }}
        <!-- 这条注释的上面是正文，下面是图片 -->
        <div class="pic-container">
                <el-image v-for="(item, index) in data.urls" :src="item" style="width: 100px; height: 100px;"
                    :preview-src-list="data.urls" :initial-index="index" />
        </div>
    </div>
    <!-- 按钮 -->
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
@import "@/assets/comment.css";
</style>
