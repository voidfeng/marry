<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useMotion } from '@vueuse/motion'

interface Props {
  image: string
  caption: string
}

defineProps<Props>()

const isActive = ref(false)
let observer: MutationObserver | null = null

// 元素引用
const photoRef = ref()
const captionRef = ref()

// 定义动画配置 - 图片从底部向上移动并淡入
const photoMotion = useMotion(photoRef, {
  initial: { opacity: 0, y: 100 },
  enter: { opacity: 1, y: 0, transition: { duration: 1000, ease: 'easeOut' } },
})

// 标题延迟淡入
const captionMotion = useMotion(captionRef, {
  initial: { opacity: 0, y: 50 },
  enter: { opacity: 1, y: 0, transition: { duration: 800, delay: 400 } },
})

// 监听激活状态，控制动画播放
watch(isActive, (active) => {
  if (active) {
    photoMotion.apply('enter')
    captionMotion.apply('enter')
  } else {
    photoMotion.apply('initial')
    captionMotion.apply('initial')
  }
})

onMounted(() => {
  // 监听 swiper-slide-active 类的变化
  observer = new MutationObserver(() => {
    const slideElement = document.querySelector('.photo-page')?.closest('.swiper-slide')
    if (slideElement?.classList.contains('swiper-slide-active')) {
      isActive.value = true
    } else {
      isActive.value = false
    }
  })

  const slideElement = document.querySelector('.photo-page')?.closest('.swiper-slide')
  if (slideElement) {
    observer.observe(slideElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    // 检查初始状态
    if (slideElement.classList.contains('swiper-slide-active')) {
      isActive.value = true
    }
  }
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<template>
  <div class="photo-page">
    <div class="photo-content">
      <img ref="photoRef" :src="image" :alt="caption" class="photo" />
      <p ref="captionRef" class="photo-caption">{{ caption }}</p>
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
