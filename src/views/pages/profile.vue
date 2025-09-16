<script setup lang="ts">
import { ref } from 'vue';
import { ElMessage, type UploadProps } from 'element-plus';
import userStore from '@/stores/user';

const store = userStore()

const username = ref(store.username)
const imageUrl = ref('')
const primaryPassword = ref('')
const newPassword = ref('')

const formatChecker: UploadProps['beforeUpload'] = rawFile => {
    if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png') {
        ElMessage.error('头像必须为jpg或png格式!')
        return false
    } else if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error('头像不能超过2mb!')
        return false
    }
    return true
}

const avatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
    console.log(uploadFile)
    imageUrl.value = '114'
}

const submit = () => {
    if (username.value === store.username || primaryPassword.value === '' || newPassword.value === '') {
        return
    }
}
</script>

<template>
<div class="container">
    <h2>个人信息</h2>

    <p>昵称：</p>
    <el-input v-model="username"></el-input>

    <p>头像：</p>
    <el-upload action="localhost" :before-upload="formatChecker" :on-success="avatarSuccess" :show-file-list="false">
        <img class="avatar" src="@/asset/default_avatar.webp" />
    </el-upload>

    <h2>修改密码</h2>

    <p>请输入原密码：</p>
    <el-input></el-input>

    <p>请输入修改后的密码：</p>
    <el-input></el-input>

    <el-button @click="submit" class="btn" type="primary">保存</el-button>
</div>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    margin-left: 50px;
    width: 400px;
    gap: 10px;
}

.avatar {
    width: 100px;
    height: 100px;
}

.btn {
    margin-top: 40px;
    width: 80px;
}
</style>
