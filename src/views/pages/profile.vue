<script setup lang="ts">
import { computed, ref } from 'vue';
import { ElNotification, ElMessage } from 'element-plus';
import { formatChecker } from '@/utils/picUploader';
import userStore from '@/stores/user';
import { RouterLink } from 'vue-router';
import { Check } from '@element-plus/icons-vue';
import axios from '@/request/request'


const store = userStore()

const username = ref(store.username)
const primaryPassword = ref('')
const newPassword = ref('')

const usernameChecker = computed(() => username.value === '' || username.value === store.username)
const passwordChecker = computed(() => primaryPassword.value === '' || newPassword.value === '' || primaryPassword.value === newPassword.value)

const submitUsername = () => {
    const data = {
        name: username.value
    }
    axios.put('/api/user/name', data).then(res => {
        if (res.data.code === 200) {
            store.username = username.value
            ElNotification({ message: '修改成功！', type: 'success', duration: 1500 })
        } else {
            ElNotification({ message: `修改失败：${res.data.msg}`, type: 'error', duration: 1500 })
        }
    }).catch(err => ElMessage({ message: `Error: ${err}`, type: "error", duration: 1500 }))
}

const submitPassword = () => {
    const data = {
        old_password: primaryPassword.value,
        new_password: newPassword.value,
    }
    axios.put('/api/user/password', data).then(res => {
        if (res.data.code === 200) {
            ElNotification({ message: '修改成功！', type: 'success', duration: 1500 })
        } else {
            ElNotification({ message: `修改失败：${res.data.msg}`, type: 'error', duration: 1500 })
        }
    }).catch(err => ElMessage({ message: `Error: ${err}`, type: "error", duration: 1500 }))
        .finally(() => {
            primaryPassword.value = ''
            newPassword.value = ''
        })
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
    <el-upload action="/api/avatar" method="put" :before-upload="formatChecker" list-type="picture-card"></el-upload>

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
