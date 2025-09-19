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
:root {
  --font-size: 1em;
}

body {
  margin: 0;
  padding: 0;
  font-size: var(--font-size);
}
</style>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
}
</style>
