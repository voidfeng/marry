<script setup lang="ts">
// 第四张照片页 - 相伴
</script>

<template>
  <div class="photo-page photo4">
    <div class="photo-content">
      <img
        src="https://picsum.photos/800/1200?random=4"
        alt="相伴"
        class="photo animate-slide-in"
      />
      <div class="caption-wrapper animate-glow">
        <h2 class="photo-title">相伴</h2>
        <p class="photo-caption">从此以后，我们携手同行</p>
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
  background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
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
.animate-slide-in {
  animation: slideIn 1s ease-out;
}

.animate-glow {
  animation: glow 2s ease-in-out 0.5s both;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes glow {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
    text-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
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
