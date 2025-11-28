# 照片文件夹

将你的婚礼照片放在这个目录下，然后在 `src/App.vue` 中引用。

## 推荐照片规格

- **格式**：JPG 或 PNG
- **尺寸**：建议宽度 800-1200px
- **比例**：竖版照片效果最佳（如 3:4 或 9:16）
- **大小**：单张照片建议不超过 2MB

## 命名示例

```
photo1.jpg
photo2.jpg
photo3.jpg
...
```

## 使用方法

在 `src/App.vue` 的 `pages` 数组中引用：

```typescript
{
  type: 'photo',
  image: '/images/photo1.jpg',
  caption: '相识',
}
```

