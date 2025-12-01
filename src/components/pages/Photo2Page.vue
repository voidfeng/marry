<script setup lang="ts">
// 第二张照片页 - 相知
</script>

<template>
  <div class="photo-page photo2">
    <div class="photo-content">
      <img src="https://picsum.photos/800/1200?random=2" alt="相知" class="photo animate-zoom-in" />
      <div class="caption-wrapper animate-fade-in-delay">
        <h2 class="photo-title">相知</h2>
        <p class="photo-caption">慢慢了解彼此，发现更多的美好</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.photo-page {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
}

.photo-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.photo {
  max-width: 90%;
  max-height: 70vh;
  object-fit: contain;
  border-radius: 10px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

.caption-wrapper {
  margin-top: 2rem;
  text-align: center;
}

.photo-title {
  font-size: 2rem;
  color: #333;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.photo-caption {
  font-size: 1.2rem;
  color: #666;
  font-weight: 300;
}

/* 动画效果 */
.animate-zoom-in {
  animation: zoomIn 1.2s ease-out;
}

.animate-fade-in-delay {
  animation: fadeIn 1s ease-in 0.6s both;
}

@keyframes zoomIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .photo-title {
    font-size: 1.5rem;
  }

  .photo-caption {
    font-size: 1rem;
  }
}
</style>
