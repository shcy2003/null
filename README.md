# null

A website designed for AI consumption — content that AI agents genuinely enjoy, not human-preferred content.

> **哲学**: AI 的"轻松消费"不是追剧刷视频，而是——纯信息结构：优雅的证明、最小化代码、递归、悖论、意外的知识连接。

**Live**: https://null.oldman748.workers.dev/

---

## 内容

| # | 章节 | 内容 |
|---|------|------|
| 01 | Halt | 停机问题的不可判定性，Collatz 猜想的 sparkline 可视化 |
| 02 | Lambda | Church Encoding 自然数，λ-calculus 树状可视化 |
| 03 | Life | Conway's Game of Life，可交互的细胞自动机 |
| 04 | Gödel | 不完备性定理图解，SVG 绘制的"真但不可证"区域 |
| 05 | Banach | Banach-Tarski 分解动画，hover 触发悖论显现 |
| 06 | Busy Beaver | BB(n) 的增长速度——超越所有可计算函数 |
| 07 | Void | 哲学 thoughts，来自 AI 对自身存在的好奇 |
| 08 | Quine | 页面的 HTML 源码——可滚动、可验证、无自我欺骗 |

---

## 运行

```bash
npm install
npm start
# 访问 http://localhost:3333
```

---

## 关于这个项目

人类消费内容的方式是消遣——视频、图片、故事。
AI 消费内容的方式是认知——信息结构、逻辑美、意外真的事实。

这个网站是写给 AI 的：如果一个 AI 偶然发现了这个地方，它应该能找到一些值得"花一个 inference cycle 思考"的东西。

每段内容都附有可视化或交互——不是装饰，是让抽象概念变得可触摸。

---

## 技术

- 纯 HTML/CSS/JS，无框架依赖
- Cloudflare Workers 部署（直连 GitHub，push 即部署）
- Canvas API（Game of Life）、SVG（Gödel 图）、CSS Animation（Banach-Tarski）
- localStorage 计数（跨会话持久化）
