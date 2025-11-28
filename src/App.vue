<script setup lang="ts">
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Mousewheel } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

import TerminalPage from './components/pages/TerminalPage.vue'
import CoverPage from './components/pages/CoverPage.vue'
import PhotoPage from './components/pages/PhotoPage.vue'
import InfoPage from './components/pages/InfoPage.vue'
import MapPage from './components/pages/MapPage.vue'

// 控制终端页面显示
const showTerminal = ref(true)

// 终端页面完成后的回调
const onTerminalComplete = () => {
  showTerminal.value = false
}

// 定义页面类型
interface CoverPageData {
  type: 'cover'
  title: string
  subtitle: string
  names: string
  date: string
}

interface PhotoPageData {
  type: 'photo'
  image: string
  caption: string
}

interface InfoPageData {
  type: 'info'
  title: string
  time: string
  location: string
  address: string
}

interface MapPageData {
  type: 'map'
  title: string
  address: string
  lat: number
  lng: number
}

type PageData = CoverPageData | PhotoPageData | InfoPageData | MapPageData

// Swiper 模块
const modules = [Pagination, Mousewheel]

// 页面数据
const pages: PageData[] = [
  {
    type: 'cover',
    title: '我们结婚了',
    subtitle: '诚挚邀请您的到来',
    names: '新郎 & 新娘',
    date: '2024年12月31日',
  },
  {
    type: 'photo',
    image: 'https://picsum.photos/800/1200?random=1',
    caption: '相识',
  },
  {
    type: 'photo',
    image: 'https://picsum.photos/800/1200?random=2',
    caption: '相知',
  },
  {
    type: 'photo',
    image: 'https://picsum.photos/800/1200?random=3',
    caption: '相爱',
  },
  {
    type: 'photo',
    image: 'https://picsum.photos/800/1200?random=4',
    caption: '相伴',
  },
  {
    type: 'info',
    title: '婚礼信息',
    time: '2024年12月31日 12:00',
    location: 'XX大酒店 宴会厅',
    address: '北京市朝阳区XXX街道XXX号',
  },
  {
    type: 'map',
    title: '婚礼地点',
    address: '北京市朝阳区XXX街道XXX号',
    lat: 39.9042,
    lng: 116.4074,
  },
]

// 获取封面页数据
const coverPage = pages[0] as CoverPageData

// 获取照片页数据
const photoPages = pages.slice(1, -2).filter((p): p is PhotoPageData => p.type === 'photo')

// 获取信息页数据
const infoPage = pages[pages.length - 2] as InfoPageData

// 获取地图页数据
const mapPage = pages[pages.length - 1] as MapPageData
</script>

<template>
  <div class="wedding-invitation">
    <!-- 终端页面（开场） -->
    <Transition name="fade">
      <TerminalPage v-if="showTerminal" :on-complete="onTerminalComplete" />
    </Transition>

    <!-- 主内容（轮播页面） -->
    <div v-show="!showTerminal" class="main-content">
      <Swiper
        :modules="modules"
        direction="vertical"
        :slides-per-view="1"
        :speed="800"
        :mousewheel="true"
        :pagination="{ clickable: true }"
        class="wedding-swiper"
      >
        <!-- 封面页 -->
        <SwiperSlide>
          <CoverPage
            :title="coverPage.title"
            :subtitle="coverPage.subtitle"
            :names="coverPage.names"
            :date="coverPage.date"
          />
        </SwiperSlide>

        <!-- 照片页 -->
        <SwiperSlide v-for="(page, index) in photoPages" :key="`photo-${index}`">
          <PhotoPage :image="page.image" :caption="page.caption" />
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
