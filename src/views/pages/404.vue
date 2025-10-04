<template>
<div class="card-container">
    <div class="card">
        <h1 style="margin: 0">404 Not Found</h1>
        <p>未找到该资源</p>
        <p>请返回首页</p>
    </div>
</div>
</template>

<style scoped>
.card-container {
    width: 35em;
    margin: 64px auto;
}

.card {
    opacity: 0.87;
    padding: 24px 32px;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    border-radius: 2px;
    background: white;
    margin-bottom: 8px;
    position: relative;
}

.node {
    position: absolute;
    top: 16px;
    right: 24px;
    opacity: 0.68;
    font-size: 48px;
    font-weight: 400;
}
</style>
