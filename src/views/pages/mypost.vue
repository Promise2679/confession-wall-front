<script setup lang="ts">
import Comment from '@/views/components/comment.vue';
</script>

<template>
    <RouterLink to="/profile"><el-button class="btn">返回</el-button></RouterLink>
    <div class="comments">
        <Comment />
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
