<script setup lang="ts">
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Mousewheel } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

import TerminalPage from './components/pages/TerminalPage.vue'
import Photo1Page from './components/pages/Photo1Page.vue'
import Photo2Page from './components/pages/Photo2Page.vue'
import Photo3Page from './components/pages/Photo3Page.vue'
import Photo4Page from './components/pages/Photo4Page.vue'
import InfoPage from './components/pages/InfoPage.vue'
import MapPage from './components/pages/MapPage.vue'

// 控制终端页面显示
const showTerminal = ref(true)

// 终端页面完成后的回调
const onTerminalComplete = () => {
  showTerminal.value = false
}

// Swiper 模块
const modules = [Pagination, Mousewheel]

// 信息页数据
const infoPage = {
  title: '婚礼信息',
  time: '2024年12月31日 12:00',
  location: 'XX大酒店 宴会厅',
  address: '北京市朝阳区XXX街道XXX号',
}

// 地图页数据
const mapPage = {
  title: '婚礼地点',
  address: '北京市朝阳区XXX街道XXX号',
  lat: 39.9042,
  lng: 116.4074,
}
</script>

<template>
  <div class="wedding-invitation">
    <!-- 终端页面（开场） -->
    <Transition name="fade">
      <TerminalPage v-if="showTerminal" :on-complete="onTerminalComplete" />
    </Transition>

    <!-- 主内容（轮播页面） -->
    <div v-if="!showTerminal" class="main-content">
      <Swiper
        :modules="modules"
        direction="vertical"
        :slides-per-view="1"
        :speed="800"
        :mousewheel="true"
        :pagination="{ clickable: true }"
        class="wedding-swiper"
      >
        <!-- 照片页 -->
        <SwiperSlide>
          <Photo1Page />
        </SwiperSlide>

        <SwiperSlide>
          <Photo2Page />
        </SwiperSlide>

        <SwiperSlide>
          <Photo3Page />
        </SwiperSlide>

        <SwiperSlide>
          <Photo4Page />
        </SwiperSlide>

        <SwiperSlide>
          <Photo5Page />
        </SwiperSlide>

        <SwiperSlide>
          <Photo6Page />
        </SwiperSlide>

        <SwiperSlide>
          <Photo7Page />
        </SwiperSlide>

        <SwiperSlide>
          <Photo8Page />
        </SwiperSlide>

        <SwiperSlide>
          <Photo9Page />
        </SwiperSlide>

        <SwiperSlide>
          <Photo10Page />
        </SwiperSlide>

        <SwiperSlide>
          <Photo11Page />
        </SwiperSlide>

        <SwiperSlide>
          <Photo12Page />
        </SwiperSlide>

        <!-- 信息页 -->
        <SwiperSlide>
          <InfoPage
            :title="infoPage.title"
            :time="infoPage.time"
            :location="infoPage.location"
            :address="infoPage.address"
          />
        </SwiperSlide>

        <!-- 地图页 -->
        <SwiperSlide>
          <MapPage
            :title="mapPage.title"
            :address="mapPage.address"
            :lat="mapPage.lat"
            :lng="mapPage.lng"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
</template>

<style scoped>
.wedding-invitation {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
}

.main-content {
  width: 100%;
  height: 100%;
}

.wedding-swiper {
  width: 100%;
  height: 100%;
}

/* 淡入淡出过渡效果 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Swiper 分页器样式自定义 */
:deep(.swiper-pagination) {
  right: 2rem;
  left: auto;
  width: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

:deep(.swiper-pagination-bullet) {
  width: 10px;
  height: 10px;
  background: rgba(255, 255, 255, 0.5);
  opacity: 1;
  margin: 0.5rem 0 !important;
  transition: all 0.3s ease;
}

:deep(.swiper-pagination-bullet-active) {
  background: white;
  transform: scale(1.5);
}

/* 响应式设计 */
@media (max-width: 768px) {
  :deep(.swiper-pagination) {
    right: 1rem;
  }
}
</style>
