<script setup lang="ts">
import { ref } from 'vue';
import Comment from '@/views/components/comment.vue';
import { ElNotification } from 'element-plus';
import { Picture } from '@element-plus/icons-vue';

const inputContent = ref('')
const isSend = ref(false)
const isAnonymous = ref(false)
const isInvisible = ref(false)

const sendComment = () => {
    isSend.value = true
    setTimeout(() => {
        isSend.value = false
        inputContent.value = ''
        ElNotification({ message: '发布成功！', type: 'success', duration: 1500 })
    }, 1000)
}
</script>

<template>
<div class="container">
    <div class="comments">
        <Comment :postid="1" author="114" content="114514" :comments="6" />
    </div>
    <div class="input" v-loading="isSend">
        <el-input v-model="inputContent" style="width: 100%" rows="5" type="textarea"
            placeholder="写下你的心动，让世界见证你的喜欢"></el-input>
        <div class="btn-container">
            <el-upload class="icon" :auto-upload="false" list-type="picture" :limit="9">
                <el-icon>
                    <Picture />
                </el-icon>
            </el-upload>
        </div>
        <div>
            <el-checkbox v-model="isAnonymous" label="匿名" />
            <el-checkbox v-model="isInvisible" label="仅自己可见" />
        </div>
        <el-button @click="sendComment" style="width: 100%" type="primary"
            :disabled="inputContent.length === 0">发布</el-button>
    </div>
</div>
</template>

<style scoped>
.container {
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
