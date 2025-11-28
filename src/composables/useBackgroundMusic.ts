import { ref } from 'vue'

// 音乐播放状态
const isPlaying = ref(false)
const audioInstance = ref<HTMLAudioElement | null>(null)

export function useBackgroundMusic() {
  /**
   * 播放背景音乐
   * @param musicUrl 音乐文件路径
   * @param volume 音量 (0-1)
   * @param loop 是否循环播放
   */
  const playMusic = (musicUrl: string = '/music/wedding-bgm.mp3', volume: number = 0.3, loop: boolean = true) => {
    try {
      // 如果已有实例，先停止
      if (audioInstance.value) {
        audioInstance.value.pause()
        audioInstance.value = null
      }

      // 创建新的音频实例
      const audio = new Audio(musicUrl)
      audio.loop = loop
      audio.volume = volume

      // 尝试播放
      audio
        .play()
        .then(() => {
          isPlaying.value = true
          audioInstance.value = audio
          console.log('Background music started')
        })
        .catch((error) => {
          console.warn('Audio autoplay failed:', error)
          // 如果自动播放失败，等待用户交互
          isPlaying.value = false
        })
    } catch (error) {
      console.error('Failed to play music:', error)
    }
  }

  /**
   * 暂停音乐
   */
  const pauseMusic = () => {
    if (audioInstance.value) {
      audioInstance.value.pause()
      isPlaying.value = false
    }
  }

  /**
   * 恢复播放
   */
  const resumeMusic = () => {
    if (audioInstance.value) {
      audioInstance.value.play().catch((error) => {
        console.warn('Resume music failed:', error)
      })
      isPlaying.value = true
    }
  }

  /**
   * 停止并清理音乐
   */
  const stopMusic = () => {
    if (audioInstance.value) {
      audioInstance.value.pause()
      audioInstance.value.currentTime = 0
      audioInstance.value = null
      isPlaying.value = false
    }
  }

  /**
   * 设置音量
   * @param volume 音量 (0-1)
   */
  const setVolume = (volume: number) => {
    if (audioInstance.value) {
      audioInstance.value.volume = Math.max(0, Math.min(1, volume))
    }
  }

  /**
   * 淡入效果
   * @param targetVolume 目标音量
   * @param duration 持续时间（毫秒）
   */
  const fadeIn = (targetVolume: number = 0.3, duration: number = 2000) => {
    if (!audioInstance.value) return

    const audio = audioInstance.value
    const startVolume = 0
    const step = (targetVolume - startVolume) / (duration / 50)

    audio.volume = startVolume

    const fadeInterval = setInterval(() => {
      if (audio.volume < targetVolume) {
        audio.volume = Math.min(audio.volume + step, targetVolume)
      } else {
        clearInterval(fadeInterval)
      }
    }, 50)
  }

  /**
   * 淡出效果
   * @param duration 持续时间（毫秒）
   */
  const fadeOut = (duration: number = 2000) => {
    if (!audioInstance.value) return

    const audio = audioInstance.value
    const startVolume = audio.volume
    const step = startVolume / (duration / 50)

    const fadeInterval = setInterval(() => {
      if (audio.volume > 0) {
        audio.volume = Math.max(audio.volume - step, 0)
      } else {
        clearInterval(fadeInterval)
        pauseMusic()
      }
    }, 50)
  }

  return {
    isPlaying,
    playMusic,
    pauseMusic,
    resumeMusic,
    stopMusic,
    setVolume,
    fadeIn,
    fadeOut,
  }
}

