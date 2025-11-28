<script setup lang="ts">
interface Props {
  title: string
  address: string
  lat: number
  lng: number
}

const props = defineProps<Props>()

// 打开地图导航
const openMap = () => {
  // 检测设备类型
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent)
  const isAndroid = /Android/i.test(navigator.userAgent)

  if (isIOS) {
    // iOS 使用高德地图或苹果地图
    window.location.href = `http://maps.apple.com/?q=${encodeURIComponent(props.address)}&ll=${props.lat},${props.lng}`
  } else if (isAndroid) {
    // Android 使用高德地图
    window.location.href = `androidamap://viewMap?sourceApplication=婚礼邀请函&poiname=${encodeURIComponent(props.address)}&lat=${props.lat}&lon=${props.lng}&dev=0`
  } else {
    // 桌面端打开高德地图网页版
    window.open(
      `https://uri.amap.com/marker?position=${props.lng},${props.lat}&name=${encodeURIComponent(props.address)}`,
    )
  }
}
</script>

<template>
  <div class="map-page">
    <div class="map-content">
      <h2 class="map-title">{{ title }}</h2>
      <div class="map-container">
        <iframe
          :src="`https://uri.amap.com/marker?position=${lng},${lat}&name=${encodeURIComponent(address)}&src=wedding&coordinate=gaode&callnative=0`"
          width="100%"
          height="100%"
          frameborder="0"
        ></iframe>
      </div>
      <p class="map-address">{{ address }}</p>
      <button class="nav-button" @click="openMap">打开导航</button>
    </div>
  </div>
</template>

<style scoped>
.map-page {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
}

.map-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
}

.map-title {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #333;
  font-weight: 300;
}

.map-container {
  width: 100%;
  flex: 1;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
}

.map-address {
  font-size: 1rem;
  color: #666;
  margin-bottom: 1.5rem;
  text-align: center;
}

.nav-button {
  padding: 1rem 3rem;
  font-size: 1.2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
  transition: all 0.3s ease;
}

.nav-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.6);
}

.nav-button:active {
  transform: translateY(0);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .map-title {
    font-size: 1.5rem;
  }

  .nav-button {
    padding: 0.8rem 2rem;
    font-size: 1rem;
  }
}
</style>

