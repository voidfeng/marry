# 终端页面功能说明

## 📋 功能概述

这是一个创意性的婚礼邀请函开场页面，模拟终端命令行界面，使用打字机效果展示"初始化婚礼"的过程。

## 🎬 动画流程

### 1. 命令输入阶段
```bash
root@groom-macbook:~$ npm run start:wedding
```
- 使用打字机效果逐字显示命令
- 光标闪烁效果
- 输入速度：80ms/字符

### 2. 日志滚动阶段
```bash
> wedding-invite@1.0.0 start
> node ./scripts/init-love.js

[INFO] Scanning for soulmate... Found!
[INFO] Loading assets... [||||||||||] 100%
[INFO] Merging branch 'groom' into 'bride'...
[SUCCESS] Merge conflict resolved automatically.
```
- 每条日志间隔 500ms 快速滚动显示
- 不同类型日志有不同颜色（INFO: 蓝色, SUCCESS: 绿色）

### 3. 完成提示阶段
```
SYSTEM READY.
[ TAP ANYWHERE TO ENTER ]
```
- 大标题带绿色光晕效果
- 点击提示文字闪烁动画
- 等待用户点击交互

## 🎵 背景音乐

当用户点击进入时：

1. **触发音乐播放**
   - 从 `/public/music/wedding-bgm.mp3` 加载音乐
   - 初始音量为 0
   - 2 秒内淡入到 30% 音量
   - 循环播放

2. **为什么需要点击？**
   - 微信和大多数浏览器禁止音频自动播放
   - 利用用户交互触发音乐播放
   - 提供更好的用户体验

## 🎨 转场效果

点击后的"老式电视机关机"效果：

1. **垂直收缩** (500ms)
   - 屏幕从上下向中间压缩成一条横线
   - 使用 `scaleY: 0.01`

2. **横向消失** (200ms)
   - 横线从中间向两侧消失
   - 使用 `scaleX: 0`

3. **白光闪烁**
   - 背景变成白色，模拟 CRT 显示器关机效果
   - 持续 300ms

4. **转到主页面**
   - 显示婚纱照封面页
   - 音乐继续播放

## 🎯 技术特性

### 使用的组件和技术

- **TextType.vue**: 打字机效果组件
- **GSAP**: 转场动画库
- **useBackgroundMusic**: 音乐播放 Composable

### 样式特点

- 终端风格 UI（Monaco 字体）
- 扫描线效果（模拟 CRT 显示器）
- 光晕效果（文字阴影）
- macOS 风格窗口按钮

### 响应式设计

- 移动端优化
- 自适应字体大小
- 触摸友好的点击区域

## 📁 文件结构

```
src/
├── components/
│   ├── pages/
│   │   └── TerminalPage.vue          # 终端页面组件
│   └── bits/
│       └── TextType.vue              # 打字机组件
├── composables/
│   └── useBackgroundMusic.ts         # 音乐播放逻辑
└── App.vue                           # 主应用（集成终端页）

public/
└── music/
    ├── wedding-bgm.mp3               # 背景音乐文件
    └── README.md                     # 音乐说明
```

## 🔧 自定义配置

### 修改命令文本

在 `TerminalPage.vue` 中修改：

```typescript
<TextType
  :text="'npm run start:wedding'"  // 改成你想要的命令
  :typingSpeed="80"                 // 调整打字速度
/>
```

### 修改日志内容

```typescript
const logs = [
  '[INFO] 你的日志内容 1',
  '[INFO] 你的日志内容 2',
  '[SUCCESS] 你的成功消息',
]
```

### 修改完成提示

```vue
<div class="success-message">你的标题</div>
<div class="click-hint">[ 你的提示文字 ]</div>
```

### 调整转场效果

```typescript
gsap.to(terminal, {
  scaleY: 0.01,      // 垂直压缩程度
  duration: 0.5,     // 动画时长
  ease: 'power4.in', // 缓动函数
})
```

### 更换背景音乐

1. 将音乐文件放入 `/public/music/`
2. 修改 `TerminalPage.vue`:

```typescript
playMusic('/music/your-music.mp3', 0, true)
```

### 禁用背景音乐

注释掉这行：

```typescript
// playBackgroundMusic()
```

## 🎨 颜色方案

```css
背景色: #0a0e27 (深蓝黑)
终端背景: #0f1423 (深灰蓝)
命令提示符: #00ff00 (绿色)
命令文本: #00ffff (青色)
日志 INFO: #61dafb (蓝色)
日志 SUCCESS: #00ff00 (绿色)
完成提示: #00ff00 (绿色)
点击提示: #ffff00 (黄色)
```

## 🚀 启动项目

```bash
npm run dev
```

访问 http://localhost:5173 即可看到效果。

## 💡 最佳实践

1. **音乐文件大小**: 建议 < 5MB，避免加载过慢
2. **日志条数**: 建议 3-5 条，不要太多
3. **打字速度**: 50-100ms 比较合适
4. **音量设置**: 0.2-0.4 为宜，不要过大
5. **转场时间**: 总时长 < 1 秒为佳

## 🐛 常见问题

**Q: 为什么音乐没有播放？**
A: 确保 `/public/music/wedding-bgm.mp3` 文件存在，或者修改音乐路径。

**Q: 为什么打字机效果不显示？**
A: 检查 TextType 组件是否正确导入，确保 GSAP 已安装。

**Q: 如何跳过终端页面直接进入主页？**
A: 在 `App.vue` 中设置 `const showTerminal = ref(false)`

**Q: 转场效果不流畅怎么办？**
A: 检查是否有性能问题，可以降低动画复杂度或调整持续时间。

## 📝 待优化项

- [ ] 添加音乐加载进度提示
- [ ] 支持多种转场效果选择
- [ ] 添加跳过按钮（适合重复访问）
- [ ] 音乐播放失败时的降级方案

---

祝您的婚礼邀请函制作顺利！💐

