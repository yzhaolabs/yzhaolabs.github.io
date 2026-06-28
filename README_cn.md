<div align="center">
  <a href="./README.md">
    <img src="https://img.shields.io/badge/EN-English-blue?style=for-the-badge&labelColor=gray" alt="English" />
  </a>
</div>

<br />

# Joey Zhang — 个人主页

<p align="center">
  <strong>🎯 量化研究员 · 个人作品集与研究官网</strong>
  <br />
  Next.js 15 · Tailwind CSS v4 · Framer Motion · TypeScript
  <br />
  静态导出 · 极致性能
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black?logo=next.js" alt="Next.js 15" />
  <img src="https://img.shields.io/badge/Tailwind-v4-06B6D4?logo=tailwindcss" alt="Tailwind v4" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript" alt="TypeScript" />
</p>

---

## ✨ 核心特性

- **🎨 现代设计体系** — 干净的 Off-white + 木炭灰 + 剑桥深蓝配色方案，精心搭配的 Inter（无衬线）+ JetBrains Mono（等宽）字体排印，Framer Motion 驱动的流畅滚动动画。
- **⚡️ 极致性能** — Next.js 15 Turbopack + 全静态 HTML 导出，`next/font` 优化的字体子集化加载，极速首屏渲染。
- **🔍 SEO 深度优化** — 结构化元数据、JSON-LD `Person` Schema 语义化标记、自动生成的 Sitemap 与 Robots.txt。
- **📄 单页流畅导航** — 所有内容集中于单页，IntersectionObserver 驱动导航栏高亮自动跟踪，原生平滑滚动。
- **🛠 数据驱动内容** — 所有信息集中在 `src/data/` 目录的 TypeScript 文件中，修改内容无需调整构建配置。

---

## 🚀 快速开始

### 前置要求

- **Node.js** 22 或更高版本（建议手动安装，避免使用系统包管理器预装版）

### 安装步骤

```bash
git clone <仓库地址>
cd <项目目录>
npm install
npm run dev
```

浏览器打开 [http://localhost:3000](http://localhost:3000) 即可实时预览。

---

## 🛠️ 网站内容配置

所有个人数据统一存放在 `src/data/` 下，改内容不改代码：

| 文件 | 修改什么 |
|------|----------|
| `src/data/profile.ts` | 姓名、简介、CTA 按钮文案、联系方式、关键指标卡片 |
| `src/data/projects.ts` | 研究项目列表、研究方向描述 |
| `src/data/experience.ts` | 工作经历、教育背景、获奖成就 |

**示例：** 想改首页的名字和简介，只需编辑 `src/data/profile.ts` 中的 `name` 和 `positioningLine` 字段即可。

---

## 📦 部署

```bash
npm run build
```

生成 `out/` 静态目录，可部署到 **Cloudflare Pages**、**GitHub Pages**、**Vercel** 等任何静态托管平台。

---

## 📂 项目结构

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # 根布局（字体加载、元数据、导航栏、页脚）
│   ├── page.tsx            # 首页（组合所有区块组件）
│   ├── sitemap.ts          # 自动生成 sitemap.xml
│   ├── robots.ts           # 自动生成 robots.txt
│   └── globals.css         # 设计系统 CSS 变量与工具类
├── components/             # React 区块组件
│   ├── AnimateOnScroll.tsx # 通用滚动显现动画（原生 IntersectionObserver）
│   ├── Navbar.tsx          # 固定导航栏（桌面端 + 移动端汉堡菜单）
│   ├── Hero.tsx            # 首页英雄区（CTA + Bento 网格可视化）
│   ├── Metrics.tsx         # 关键指标卡片行
│   ├── ResearchFocus.tsx   # 研究方向介绍
│   ├── SelectedWork.tsx    # 精选项目展示
│   ├── ExperienceTimeline.tsx # 工作经历时间线
│   ├── TechStack.tsx       # 技术栈展示
│   ├── Education.tsx       # 教育背景卡片
│   ├── Awards.tsx          # 获奖成就
│   ├── Contact.tsx         # 联系方式 + CV 下载
│   ├── SectionHeader.tsx   # 区块标题组件
│   ├── ProjectCard.tsx     # 项目卡片
│   └── CredibilityStrip.tsx # 可信标签条
└── data/                   # 内容数据文件
    ├── profile.ts
    ├── projects.ts
    └── experience.ts
```

---

## 📄 开源协议

本项目基于 MIT 协议开源。
