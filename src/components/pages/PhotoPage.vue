<script setup lang="ts">
interface Props {
  image: string
  caption: string
}

defineProps<Props>()
</script>

<template>
  <div class="photo-page">
    <div class="photo-content">
      <img :src="image" :alt="caption" class="photo" />
      <p class="photo-caption">{{ caption }}</p>
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
  background: #f5f5f5;
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
  max-height: 80vh;
  object-fit: contain;
  border-radius: 10px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

.photo-caption {
  margin-top: 2rem;
  font-size: 1.5rem;
  color: #333;
  font-weight: 300;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .photo-caption {
    font-size: 1.2rem;
  }
}
</style>

