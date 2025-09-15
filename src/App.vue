<script setup lang="ts">
import Aside from '@/views/components/aside.vue';
</script>

<template>
<div class="container">
  <Aside />
  <RouterView />
</div>
</template>

<style>
body {
  margin: 0;
  padding: 0;
}
</style>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
}
</style>
