<script setup lang="ts">
import { computed, ref, type Ref } from 'vue';
import { ElNotification, ElMessage, type UploadUserFile, type UploadProps, type UploadFile, uploadProps } from 'element-plus';
import { formatChecker } from '@/utils/picUploader';
import userStore from '@/stores/user';
import { RouterLink } from 'vue-router';
import { Check } from '@element-plus/icons-vue';
import axios from '@/request/request'
import oklchToHex from '@/utils/oklch2hex';

const store = userStore()

const username = ref(store.username)
const primaryPassword = ref('')
const newPassword = ref('')
const dialogImageUrl = ref('')
const dialogVisible = ref(false)

// 头像列表
const fileList: Ref<UploadUserFile[]> = ref([
    {
        name: 'avatar',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
    },
])

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

// 上传头像成功后，移除前一个头像
const submitAvatar: UploadProps['onSuccess'] = res => {
    if (res.code === 200) {
        fileList.value.shift()
    }
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
}

const picturePreview = (file: UploadFile) => {
    dialogImageUrl.value = file.url!
    dialogVisible.value = true
}
</script>

<template>
<div style="background-color: var(--bg-color); width: calc(100% - 300px);">
    <div class="container">
        <h2>个人信息</h2>

        <p>昵称：</p>
        <div class="name-container">
            <el-input class="input" v-model="username"></el-input>
            <el-button @click="submitUsername" class="btn-3" type="success" :disabled="usernameChecker" :icon="Check"
                circle />
        </div>

        <p>头像：</p>
        <el-upload action="/api/avatar" v-model:file-list="fileList" method="put" :before-upload="formatChecker"
            :on-success="submitAvatar" list-type="picture-card">
            <el-icon>
                <Plus />
            </el-icon>
            <template #file="{ file }">
                <div>
                    <img class="el-upload-list__item-thumbnail" :src="file.url" />
                    <span class="el-upload-list__item-actions">
                        <span class="el-upload-list__item-preview" @click="picturePreview(file)">
                            <el-icon><zoom-in /></el-icon>
                        </span>
                    </span>
                </div>
            </template>
        </el-upload>
        <el-dialog v-model="dialogVisible">
            <img :src="dialogImageUrl" />
        </el-dialog>

        <p>我发布的帖子：</p>
        <RouterLink to="/mypost" class="btn-1"><el-button>查看</el-button></RouterLink>

        <p>黑名单：</p>
        <RouterLink to="/blacklist" class="btn-1"><el-button>查看</el-button></RouterLink>

        <h2>修改密码</h2>

        <p>请输入原密码：</p>
        <el-input class="input" v-model="primaryPassword" show-password></el-input>

        <p>请输入修改后的密码：</p>
        <el-input class="input" v-model="newPassword" show-password></el-input>

        <el-button @click="submitPassword" class="btn-2" type="primary" :disabled="passwordChecker" :color="oklchToHex(0.85, 0.08, store.color)">修改</el-button>
    </div>
</div>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    margin-left: 50px;
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
    color: white;
}

.btn-2:hover {
    color: white;
}

.input {
    width: 400px;
}
</style>
