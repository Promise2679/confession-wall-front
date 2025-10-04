<script setup lang="ts">
import Aside from '@/views/components/Aside.vue';
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
  --color: 0;
  --primary: oklch(0.7 0.85 var(var(--color)));
  --bg-color: oklch(0.95 0.01 var(--color));
  --btn-color: oklch(.85 .08 var(--color));
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
