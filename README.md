# 婚礼邀请函 H5

一个现代化的 H5 婚礼邀请函应用，支持全屏滑动、照片展示和地图导航。

## ✨ 功能特点

- 📱 全屏滑动切换（支持触摸手势和鼠标滚轮）
- 🖼️ 精美的照片展示页面
- 🗺️ 地图导航功能（支持跳转到高德地图/苹果地图）
- 💫 流畅的过渡动画效果
- 📍 页面指示器，快速跳转
- 📐 响应式设计，适配各种设备

## 🚀 快速开始

### 安装依赖
```bash
npm install
```

### 开发模式
```bash
npm run dev
```

### 生产构建
```bash
npm run build
```

## 🎨 自定义内容

在 `src/App.vue` 中找到 `pages` 数组，根据需要修改：

### 1. 封面页
```typescript
{
  type: 'cover',
  title: '我们结婚了',              // 主标题
  subtitle: '诚挚邀请您的到来',      // 副标题
  names: '新郎 & 新娘',             // 新人姓名
  date: '2024年12月31日',           // 婚礼日期
}
```

### 2. 照片页
```typescript
{
  type: 'photo',
  image: '你的图片URL',              // 照片地址
  caption: '相识',                  // 照片说明
}
```

### 3. 信息页
```typescript
{
  type: 'info',
  title: '婚礼信息',
  time: '2024年12月31日 12:00',     // 婚礼时间
  location: 'XX大酒店 宴会厅',       // 婚礼地点
  address: '详细地址',               // 详细地址
}
```

### 4. 地图页
```typescript
{
  type: 'map',
  title: '婚礼地点',
  address: '详细地址',
  lat: 39.9042,                     // 纬度
  lng: 116.4074,                    // 经度
}
```

## 📸 添加自己的照片

有两种方式添加照片：

### 方式一：使用在线图片
直接在 `pages` 数组中使用图片 URL：
```typescript
image: 'https://yourdomain.com/photo.jpg'
```

### 方式二：使用本地图片
1. 将照片放在 `public/images/` 目录下
2. 在代码中引用：
```typescript
image: '/images/photo1.jpg'
```

## 🗺️ 地图导航说明

应用会根据设备类型自动选择导航方式：
- **iOS 设备**：跳转到苹果地图
- **Android 设备**：跳转到高德地图 APP
- **桌面设备**：打开高德地图网页版

## 🎯 操作说明

- **鼠标滚轮**：上下滚动切换页面
- **触摸滑动**：在移动设备上上下滑动切换
- **右侧指示器**：点击圆点快速跳转到对应页面

## 🎨 样式定制

所有样式都在 `src/App.vue` 的 `<style>` 部分，你可以修改：
- 颜色渐变（background）
- 字体大小（font-size）
- 间距（margin、padding）
- 动画效果（animation、transition）

## 📱 部署建议

构建后的文件可以部署到：
- 阿里云 OSS
- 腾讯云 COS
- GitHub Pages
- Vercel
- Netlify

## 🛠️ 技术栈

- Vue 3
- TypeScript
- Vite
- 高德地图 API

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd) 
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
