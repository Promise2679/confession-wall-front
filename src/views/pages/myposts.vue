<script setup lang="ts">
import Comment from '@/views/components/mypost.vue';
</script>

<template>
    <RouterLink to="/profile"><el-button class="btn">返回</el-button></RouterLink>
    <div class="comments">
        <Comment :postid="1" author="1" :authorid="1" content="111" />
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
