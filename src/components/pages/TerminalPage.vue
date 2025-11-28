<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import TextType from '../bits/TextType.vue'
import FaultyTerminal from '../bits/FaultyTerminal.vue'
import { useBackgroundMusic } from '@/composables/useBackgroundMusic'

interface Props {
  onComplete?: () => void
}

const props = defineProps<Props>()

// 背景音乐控制
const { playMusic, fadeIn } = useBackgroundMusic()

// 动画阶段
const stage = ref(0) // 0: 命令输入, 1: 日志滚动, 2: 完成提示
const showClickHint = ref(false)
const isExiting = ref(false)

// 日志数据
const logs = [
  '[INFO] Scanning for soulmate... Found!',
  '[INFO] Loading assets... [||||||||||] 100%',
  "[INFO] Merging branch 'groom' into 'bride'...",
  '[SUCCESS] Merge conflict resolved automatically.',
]

const currentLogIndex = ref(0)
const displayedLogs = ref<string[]>([])

// 命令完成后，开始显示日志
const onCommandComplete = () => {
  stage.value = 1
  showLogs()
}

// 逐行显示日志
const showLogs = () => {
  if (currentLogIndex.value < logs.length) {
    const log = logs[currentLogIndex.value]
    if (log) {
      displayedLogs.value.push(log)
    }
    currentLogIndex.value++

    // 快速滚动效果
    setTimeout(() => {
      showLogs()
    }, 500)
  } else {
    // 所有日志显示完毕，显示完成提示
    setTimeout(() => {
      stage.value = 2
      // 闪烁效果
      setTimeout(() => {
        showClickHint.value = true
      }, 300)
    }, 800)
  }
}

// 点击进入
const handleEnter = () => {
  if (stage.value !== 2 || isExiting.value) return

  isExiting.value = true

  // 播放背景音乐（需要用户交互才能播放）
  playBackgroundMusic()

  // 老式电视机关机效果
  const terminal = document.querySelector('.terminal-container')
  if (terminal) {
    gsap.to(terminal, {
      scaleY: 0.01,
      scaleX: 1,
      duration: 0.5,
      ease: 'power4.in',
      onComplete: () => {
        gsap.to(terminal, {
          scaleX: 0,
          duration: 0.2,
          onComplete: () => {
            props.onComplete?.()
          },
        })
      },
    })

    // 添加白光闪烁效果
    gsap.to('.terminal-screen', {
      backgroundColor: '#ffffff',
      duration: 0.3,
      ease: 'power2.in',
    })
  }
}

// 播放背景音乐
const playBackgroundMusic = () => {
  // 播放音乐（需要用户交互才能播放）
  // 注意：需要将音乐文件放在 public/music/ 目录下
  playMusic('/music/wedding-bgm.mp3', 0, true) // 初始音量为 0

  // 淡入效果，2秒内音量从 0 增加到 0.3
  setTimeout(() => {
    fadeIn(0.3, 2000)
  }, 100)
}

onMounted(() => {
  // 页面加载后延迟一点开始动画
  setTimeout(() => {
    stage.value = 0
  }, 500)
})
</script>

<template>
  <div class="terminal-page" @click="handleEnter">
    <!-- FaultyTerminal 背景 -->
    <div class="terminal-background">
      <FaultyTerminal
        :scale="1.5"
        :grid-mul="[2, 1]"
        :digit-size="1.2"
        :time-scale="1"
        :pause="false"
        :scanline-intensity="1"
        :glitch-amount="1"
        :flicker-amount="1"
        :noise-amp="1"
        :chromatic-aberration="0"
        :dither="0"
        :curvature="0"
        tint="#598054"
        :mouse-react="true"
        :mouse-strength="0.5"
        :page-load-animation="false"
        :brightness="1"
      />
    </div>

    <div class="terminal-container">
      <div class="terminal-screen">
        <div class="terminal-header">
          <div class="terminal-buttons">
            <span class="btn btn-close"></span>
            <span class="btn btn-minimize"></span>
            <span class="btn btn-maximize"></span>
          </div>
          <div class="terminal-title">root@groom-macbook:~$</div>
        </div>

        <div class="terminal-body">
          <!-- 阶段 0: 命令输入 -->
          <div v-if="stage >= 0" class="command-line">
            <span class="prompt">root@jay-mac:~$</span>
            <TextType
              :text="'npm run start:wedding'"
              :typingSpeed="80"
              :showCursor="stage === 0"
              :loop="false"
              :pauseDuration="500"
              :onSentenceComplete="onCommandComplete"
              class="command-text"
            />
          </div>

          <!-- 阶段 1: 日志输出 -->
          <div v-if="stage >= 1" class="logs-container">
            <div class="log-header">
              <span class="log-line">> wedding-invite@1.0.0 start</span>
              <span class="log-line">> node ./scripts/init-love.js</span>
              <br />
            </div>

            <div v-for="(log, index) in displayedLogs" :key="index" class="log-line">
              {{ log }}
            </div>
          </div>

          <!-- 阶段 2: 完成提示 -->
          <div v-if="stage >= 2" class="completion-section">
            <div class="success-message">SYSTEM READY.</div>
            <div class="click-hint" :class="{ blink: showClickHint }">
              [ TAP ANYWHERE TO ENTER ]
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 电视机扫描线效果 -->
    <div class="scanlines"></div>
  </div>
</template>

<style scoped>
.terminal-page {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  cursor: default;
}

.terminal-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.terminal-container {
  width: 90%;
  max-width: 800px;
  background: rgba(15, 20, 35, 0.95);
  border-radius: 10px;
  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.8),
    0 0 40px rgba(0, 255, 255, 0.1);
  overflow: hidden;
  transform-origin: center center;
  position: relative;
  z-index: 2;
}

.terminal-screen {
  background: #0f1423;
  font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
  color: #00ff00;
}

.terminal-header {
  background: #1e2433;
  padding: 0.8rem 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  border-bottom: 1px solid #2a3244;
}

.terminal-buttons {
  display: flex;
  gap: 0.5rem;
}

.btn {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
}

.btn-close {
  background: #ff5f56;
}

.btn-minimize {
  background: #ffbd2e;
}

.btn-maximize {
  background: #27c93f;
}

.terminal-title {
  font-size: 0.9rem;
  color: #8b92a8;
}

.terminal-body {
  padding: 1.5rem;
  min-height: 400px;
  font-size: 1rem;
  line-height: 1.8;
}

.command-line {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.prompt {
  color: #00ff00;
  font-weight: bold;
}

.command-text {
  color: #00ffff;
  font-family: inherit;
}

.logs-container {
  margin-top: 1rem;
  animation: slideIn 0.3s ease-out;
}

.log-header {
  color: #666;
  margin-bottom: 0.5rem;
}

.log-line {
  display: block;
  margin: 0.3rem 0;
  animation: fadeInUp 0.3s ease-out;
}

.log-line:has([class*='INFO']) {
  color: #61dafb;
}

.log-line:has([class*='SUCCESS']) {
  color: #00ff00;
  font-weight: bold;
}

.completion-section {
  margin-top: 2rem;
  text-align: center;
  animation: fadeIn 1s ease-out;
}

.success-message {
  font-size: 1.8rem;
  color: #00ff00;
  text-shadow:
    0 0 10px rgba(0, 255, 0, 0.8),
    0 0 20px rgba(0, 255, 0, 0.4);
  margin-bottom: 1.5rem;
  letter-spacing: 0.3rem;
  font-weight: bold;
}

.click-hint {
  font-size: 1.2rem;
  color: #ffff00;
  letter-spacing: 0.2rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.click-hint.blink {
  animation: blinkAnimation 1.5s infinite;
  opacity: 1;
}

/* 扫描线效果 */
.scanlines {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.1),
    rgba(0, 0, 0, 0.1) 1px,
    transparent 1px,
    transparent 2px
  );
  pointer-events: none;
  z-index: 3;
}

/* 动画 */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes blinkAnimation {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .terminal-container {
    width: 95%;
    max-width: none;
  }

  .terminal-body {
    padding: 1rem;
    min-height: 300px;
    font-size: 0.85rem;
  }

  .success-message {
    font-size: 1.2rem;
  }

  .click-hint {
    font-size: 0.9rem;
  }
}
</style>
