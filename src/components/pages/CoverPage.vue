<script setup lang="ts">
interface Props {
  title: string
  subtitle: string
  names: string
  date: string
}

defineProps<Props>()
</script>

<template>
  <div class="cover-page">
    <div class="cover-content">
      <h1 class="cover-title">{{ title }}</h1>
      <p class="cover-names">{{ names }}</p>
      <p class="cover-date">{{ date }}</p>
      <p class="cover-subtitle">{{ subtitle }}</p>
      <div class="scroll-hint">
        <span>↓</span>
        <p>滑动查看更多</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cover-page {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.cover-content {
  text-align: center;
  animation: fadeInUp 1s ease-out;
}

.cover-title {
  font-size: 3rem;
  margin-bottom: 2rem;
  font-weight: 300;
  letter-spacing: 0.5rem;
}

.cover-names {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  font-weight: 400;
}

.cover-date {
  font-size: 1.2rem;
  margin-bottom: 3rem;
  opacity: 0.9;
}

.cover-subtitle {
  font-size: 1rem;
  opacity: 0.8;
  margin-bottom: 4rem;
}

.scroll-hint {
  animation: bounce 2s infinite;
}

.scroll-hint span {
  font-size: 2rem;
  display: block;
}

.scroll-hint p {
  font-size: 0.9rem;
  margin-top: 0.5rem;
  opacity: 0.8;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .cover-title {
    font-size: 2rem;
  }

  .cover-names {
    font-size: 1.3rem;
  }

  .cover-date {
    font-size: 1rem;
  }
}
</style>

