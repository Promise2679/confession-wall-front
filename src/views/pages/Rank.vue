<script setup lang="ts">
import { ref, onMounted, type Ref } from 'vue';
import { type Rank } from '@/models/models';
import axios from '@/utils/request'
import RankCard from '../components/Rank-card.vue';

const postList: Ref<Rank[]> = ref([])

const getPosts = () => axios.get("/api/hotRank").then(res => postList.value = res.data.data.hot_rank)

onMounted(() => getPosts())
</script>

<template>
<div class="container">
    <div class="comments">
        <RankCard v-for="item in postList" :key="item.post_id" :data="item" />
    </div>
</div>
</template>

<style scoped>
.container {
    background-color: var(--bg-color);
    display: flex;
    flex-direction: column;
    flex-grow: 40;
    align-items: center;
    gap: 40px;
}

.comments {
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    gap: 20px;
}
</style>