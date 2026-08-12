# 视频文件目录

把 mp4 视频文件放到本目录，命名与 `index.html` 中 `data-src` 对应：

| 视频卡片 | 文件名 |
|---------|--------|
| 2026 宣传片 | `2026.mp4` |
| 2025 回顾 | `2025.mp4` |
| 2024 回顾 | `2024.mp4` |

## 注意事项

- 单个文件需小于 **50MB**（jsDelivr CDN 限制）；50-100MB 之间走 GitHub Pages 直接播放（`<video>` 标签支持拖动进度条）
- 上传后页面直接使用相对路径 `videos/xxx.mp4` 播放，本地预览、GitHub Pages 均可用
- 如需强制走 jsDelivr CDN 加速，可将 `index.html` 中 `data-src` 改为：
  `https://cdn.jsdelivr.net/gh/chonghengjun97-creator/summit-web@main/videos/xxx.mp4`
