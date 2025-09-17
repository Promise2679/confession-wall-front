<script setup lang="ts">
import { ElMessageBox, ElNotification } from 'element-plus';

interface Props {
    postid: number
    content: string
}

const prop = defineProps<Props>()

const deletePost = (id: number) => {
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
</script>

<template>
<div class="comment">
    <div class="content">{{ content }}</div>
    <div class="methods">
        <div class="method" @click="deletePost(prop.postid)">
            <font-awesome-icon icon="fa-solid fa-xmark" />删除
        </div>
        <div class="method" @click="editPost(prop.postid)">
            <font-awesome-icon icon="fa-solid fa-pen" />修改
        </div>
    </div>
</div>
</template>

<style scoped>
@import "@/asset/comment.css";
</style>
