<script setup lang="ts">
// 第三张照片页 - 相爱
</script>

<template>
  <div class="photo-page photo3">
    <div class="photo-content">
      <img
        src="https://picsum.photos/800/1200?random=3"
        alt="相爱"
        class="photo animate-rotate-in"
      />
      <div class="caption-wrapper animate-bounce-in">
        <h2 class="photo-title">相爱</h2>
        <p class="photo-caption">心与心的距离，越来越近</p>
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
  background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%);
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
.animate-rotate-in {
  animation: rotateIn 1s ease-out;
}

.animate-bounce-in {
  animation: bounceIn 0.8s ease-out 0.5s both;
}

@keyframes rotateIn {
  from {
    opacity: 0;
    transform: rotate(-10deg) scale(0.9);
  }
  to {
    opacity: 1;
    transform: rotate(0) scale(1);
  }
}

@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: translateY(-30px);
  }
  60% {
    opacity: 1;
    transform: translateY(10px);
  }
  100% {
    transform: translateY(0);
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
