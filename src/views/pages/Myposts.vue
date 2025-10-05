<script setup lang="ts">
import Comment from '@/views/components/Mypost.vue';
import axios from '@/utils/request'
import { onMounted, ref, type Ref } from 'vue';
import type { Mypost } from '@/models/models';

const mypostList: Ref<Mypost[]> = ref([])

const getMyposts = () => axios.get('/api/mypost').then(res => mypostList.value = res.data.data)

onMounted(() => getMyposts())
</script>

<template>
<RouterLink to="/profile"><el-button class="btn">返回</el-button></RouterLink>
<div style="width: calc(100% - 300px); background-color: var(--bg-color);">
    <div class="comments">
        <Comment v-for="item in mypostList" :key="item.postid" :data="item" @change="getMyposts" />
    </div>
</div>
</template>

<style scoped>
.comments {
    margin: 40px 100px;
}

.btn {
    position: absolute;
    top: 40px;
    left: 320px;
}
</style>
