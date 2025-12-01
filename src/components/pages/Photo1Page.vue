<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useMotion } from '@vueuse/motion'

const isActive = ref(false)
let observer: MutationObserver | null = null
let resetTimer: ReturnType<typeof setTimeout> | null = null

// 元素引用
const backgroundRef = ref()
const namesRef = ref()
const dateRef = ref()
const invitationRef = ref()
const weddingRef = ref()
const inviteMessageRef = ref()
const englishQuoteRef = ref()
const xiCharacterRef = ref()

// 动画配置
const motions = [
  {
    ref: backgroundRef,
    motion: useMotion(backgroundRef, {
      initial: { opacity: 0, y: 200 },
      enter: { opacity: 1, y: 0, transition: { duration: 1500, ease: 'easeOut' } },
    }),
  },
  {
    ref: namesRef,
    motion: useMotion(namesRef, {
      initial: { opacity: 0, y: 20 },
      enter: { opacity: 1, y: 0, transition: { duration: 1000, delay: 500 } },
    }),
  },
  {
    ref: dateRef,
    motion: useMotion(dateRef, {
      initial: { opacity: 0, y: 20 },
      enter: { opacity: 1, y: 0, transition: { duration: 1000, delay: 800 } },
    }),
  },
  {
    ref: invitationRef,
    motion: useMotion(invitationRef, {
      initial: { opacity: 0, y: 20 },
      enter: { opacity: 1, y: 0, transition: { duration: 1000, delay: 1100 } },
    }),
  },
  {
    ref: weddingRef,
    motion: useMotion(weddingRef, {
      initial: { opacity: 0, y: 20 },
      enter: { opacity: 1, y: 0, transition: { duration: 1000, delay: 1400 } },
    }),
  },
  {
    ref: inviteMessageRef,
    motion: useMotion(inviteMessageRef, {
      initial: { opacity: 0, y: 20 },
      enter: { opacity: 1, y: 0, transition: { duration: 1000, delay: 1700 } },
    }),
  },
  {
    ref: englishQuoteRef,
    motion: useMotion(englishQuoteRef, {
      initial: { opacity: 0, y: 20 },
      enter: { opacity: 1, y: 0, transition: { duration: 1000, delay: 2000 } },
    }),
  },
  {
    ref: xiCharacterRef,
    motion: useMotion(xiCharacterRef, {
      initial: { opacity: 0, y: 20 },
      enter: { opacity: 1, y: 0, transition: { duration: 1000, delay: 2300 } },
    }),
  },
]

// 应用动画状态
const applyMotions = (state: 'enter' | 'initial') => {
  motions.forEach(({ motion }) => motion.apply(state))
}

// 监听激活状态
watch(
  isActive,
  (active) => {
    if (active) {
      // 如果在延迟期间又划回来，清除定时器
      if (resetTimer) {
        clearTimeout(resetTimer)
        resetTimer = null
      }
      applyMotions('enter')
    } else {
      // 划走后延迟重置动画
      resetTimer = setTimeout(() => {
        applyMotions('initial')
        resetTimer = null
      }, 1000)
    }
  },
  { immediate: true },
)

onMounted(() => {
  const slideElement = document.querySelector('.photo1')?.closest('.swiper-slide')
  if (!slideElement) return

  // 监听 swiper-slide-active 类的变化
  observer = new MutationObserver(() => {
    isActive.value = slideElement.classList.contains('swiper-slide-active')
  })

  observer.observe(slideElement, {
    attributes: true,
    attributeFilter: ['class'],
  })

  // 初始化动画状态
  applyMotions('initial')

  // 检查初始状态
  if (slideElement.classList.contains('swiper-slide-active')) {
    isActive.value = true
  }
})

onUnmounted(() => {
  observer?.disconnect()
  // 清理定时器
  if (resetTimer) {
    clearTimeout(resetTimer)
    resetTimer = null
  }
})
</script>

<template>
  <div class="photo-page photo1">
    <!-- 背景图片 -->
    <div ref="backgroundRef" class="photo-background"></div>

    <!-- 文案内容 -->
    <div class="content-overlay">
      <!-- 顶部文案 -->
      <div class="top-section">
        <h1 ref="namesRef" class="names">张三 & 李四</h1>
        <p ref="dateRef" class="date">2026.01.31</p>
      </div>

      <!-- 左侧文案 -->
      <div class="left-section">
        <p ref="invitationRef" class="invitation-text">INVITATION</p>
      </div>

      <!-- 右侧文案 -->
      <div class="right-section">
        <p ref="weddingRef" class="wedding-text">婚礼邀请函</p>
      </div>

      <!-- 底部文案 -->
      <div class="bottom-section">
        <p ref="inviteMessageRef" class="invite-message">邀请您，来见证我们的新旅初启</p>
        <p ref="englishQuoteRef" class="english-quote">
          Two souls with but a single thought, two hearts that beat as one
        </p>
        <div ref="xiCharacterRef" class="xi-character">囍</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.photo-page {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background: #f5f5f5;
}

/* 背景图片 - 全屏 cover */
.photo-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/images/1.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

/* 内容覆盖层 */
.content-overlay {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 1;
  display: grid;
  grid-template-areas:
    'top top top'
    'left center right'
    'bottom bottom bottom';
  grid-template-rows: 1fr 2fr 1.5fr;
  grid-template-columns: 1fr 2fr 1fr;
  padding: 3rem;
}

/* 顶部区域 */
.top-section {
  grid-area: top;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.names {
  font-size: 3rem;
  font-weight: 600;
  color: white;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
  letter-spacing: 0.2rem;
  margin: 0;
}

.date {
  font-size: 1.5rem;
  font-weight: 300;
  color: white;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.5);
  letter-spacing: 0.3rem;
  margin: 0;
}

/* 左侧区域 */
.left-section {
  grid-area: left;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 1rem;
}

.invitation-text {
  font-size: 1.8rem;
  font-weight: 300;
  color: white;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.5);
  writing-mode: vertical-rl;
  letter-spacing: 0.5rem;
  margin: 0;
}

/* 右侧区域 */
.right-section {
  grid-area: right;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 1rem;
}

.wedding-text {
  font-size: 1.8rem;
  font-weight: 400;
  color: white;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.5);
  writing-mode: vertical-rl;
  letter-spacing: 0.5rem;
  margin: 0;
}

/* 底部区域 */
.bottom-section {
  grid-area: bottom;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
  padding-bottom: 2rem;
}

.invite-message {
  font-size: 1.3rem;
  font-weight: 300;
  color: white;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.5);
  letter-spacing: 0.2rem;
  margin: 0;
}

.english-quote {
  font-size: 1rem;
  font-weight: 300;
  font-style: italic;
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.5);
  text-align: center;
  max-width: 600px;
  margin: 0;
}

.xi-character {
  font-size: 5rem;
  font-weight: bold;
  color: #ff6b6b;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
  margin-top: 0.5rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .content-overlay {
    padding: 2rem 1.5rem;
    grid-template-rows: 1fr 2.5fr 1.5fr;
  }

  .names {
    font-size: 2rem;
  }

  .date {
    font-size: 1.2rem;
  }

  .invitation-text,
  .wedding-text {
    font-size: 1.3rem;
  }

  .invite-message {
    font-size: 1rem;
  }

  .english-quote {
    font-size: 0.85rem;
    max-width: 90%;
  }

  .xi-character {
    font-size: 3.5rem;
  }
}
</style>
