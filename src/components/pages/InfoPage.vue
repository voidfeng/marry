<script setup lang="ts">
interface Props {
  title: string
  time: string
  location: string
  address: string
}

defineProps<Props>()
</script>

<template>
  <div class="info-page">
    <div class="info-content">
      <h2 class="info-title">{{ title }}</h2>
      <div class="info-item">
        <span class="info-label">时间</span>
        <span class="info-value">{{ time }}</span>
      </div>
      <div class="info-item">
        <span class="info-label">地点</span>
        <span class="info-value">{{ location }}</span>
      </div>
      <div class="info-item">
        <span class="info-label">地址</span>
        <span class="info-value">{{ address }}</span>
      </div>
      <p class="info-note">期待您的光临</p>
    </div>
  </div>
</template>

<style scoped>
.info-page {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
}

.info-content {
  text-align: center;
  max-width: 90%;
  padding: 2rem;
}

.info-title {
  font-size: 2.5rem;
  margin-bottom: 3rem;
  font-weight: 300;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  backdrop-filter: blur(10px);
}

.info-label {
  font-size: 1.2rem;
  font-weight: 500;
}

.info-value {
  font-size: 1rem;
  text-align: right;
  flex: 1;
  margin-left: 1rem;
}

.info-note {
  margin-top: 3rem;
  font-size: 1.2rem;
  opacity: 0.9;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .info-title {
    font-size: 1.8rem;
  }

  .info-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .info-value {
    margin-left: 0;
    margin-top: 0.5rem;
    text-align: left;
  }
}
</style>

