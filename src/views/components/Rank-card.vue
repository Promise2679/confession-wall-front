<script setup lang="ts">
import type { Rank } from '@/models/models';

interface Props {
    data: Rank
}

const prop = defineProps<Props>()
</script>

<template>
<div class="comment">
    <div class="content">
        {{ data.content }}
    </div>
</div>
</template>

<style scoped>
@import "@/assets/comment.css";
</style>
