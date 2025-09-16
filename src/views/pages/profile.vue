<script setup lang="ts">
import { computed, ref } from 'vue';
import { ElMessage, ElNotification, type UploadProps } from 'element-plus';
import userStore from '@/stores/user';
import { RouterLink } from 'vue-router';
import { Check } from '@element-plus/icons-vue';

const store = userStore()

const username = ref(store.username)
const imageUrl = ref('')
const primaryPassword = ref('')
const newPassword = ref('')

const usernameChecker = computed(() => username.value === '' || username.value === store.username)
const passwordChecker = computed(() => primaryPassword.value === '' || newPassword.value === '' || primaryPassword.value === newPassword.value)

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

const submitUsername = () => {
    ElNotification({ message: '修改成功！', type: 'success', duration: 1500 })
}

const submitPassword = () => {
    ElNotification({ message: '修改成功！', type: 'success', duration: 1500 })
}
</script>

<template>
<div class="container">
    <h2>个人信息</h2>

    <p>昵称：</p>
    <div class="name-container">
        <el-input v-model="username"></el-input>
        <el-button @click="submitUsername" class="btn-3" type="success" :disabled="usernameChecker" :icon="Check"
            circle />
    </div>

    <p>头像：</p>
    <el-upload action="localhost" :before-upload="formatChecker" :on-success="avatarSuccess" :show-file-list="false">
        <img class="avatar" src="@/asset/default_avatar.webp" />
    </el-upload>

    <p>我发布的帖子：</p>
    <RouterLink to="/mypost"><el-button class="btn-1">查看</el-button></RouterLink>

    <p>黑名单：</p>
    <RouterLink to="/blacklist"><el-button class="btn-1">查看</el-button></RouterLink>

    <h2>修改密码</h2>

    <p>请输入原密码：</p>
    <el-input v-model="primaryPassword" show-password></el-input>

    <p>请输入修改后的密码：</p>
    <el-input v-model="newPassword" show-password></el-input>

    <el-button @click="submitPassword" class="btn-2" type="primary" :disabled="passwordChecker">修改</el-button>
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

.name-container {
    display: flex;
    flex-direction: row;
    gap: 8px;
}

.avatar {
    width: 100px;
    height: 100px;
}

.btn-1 {
    width: 80px;
}

.btn-2 {
    margin-top: 40px;
    width: 80px;
}
</style>
