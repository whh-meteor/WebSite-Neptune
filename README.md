# Neptune 官方网站

> Neptune 海洋环境数据处理与模拟工具的官方网站，基于纯 HTML + CSS + JavaScript 构建，零依赖、零框架。

```
    _   __                  __                       
   / | / /  ___     ____   / /_  __  __   ____   ___ 
  /  |/ /  / _ \   / __ \ / __/ / / / /  / __ \ / _ \
 / /|  /  /  __/  / /_/ // /_  / /_/ /  / / / //  __/
/_/ |_/   \___/  / .___/ \__/  \__,_/  /_/ /_/ \___/ 
                _/                                  
```

## 项目简介

本仓库是 **Neptune** 软件的官方网站前端项目。Neptune 是一款海洋环境数据处理与模拟工具，提供网格处理、岸线处理、水深处理、NetCDF 数据解析、气象数据下载等功能。

网站采用纯原生技术栈（HTML5 + CSS3 + 原生 JavaScript），不依赖任何前端框架或构建工具，开箱即用，部署简单。

## 核心特性

- **纯原生技术栈** — HTML + CSS + JavaScript，零依赖，零构建步骤
- **中英文双语** — 内置 i18n 国际化系统，一键切换中/英文，语言偏好本地持久化
- **完整 SEO** — Meta 标签、Open Graph、Twitter Card、Schema.org JSON-LD 结构化数据
- **搜索引擎友好** — 包含 `robots.txt` 与 `sitemap.xml`，支持多语言 hreflang
- **响应式设计** — 完美适配桌面电脑、平板与手机端
- **海洋主题视觉** — 深海蓝 + 青色渐变，高级简洁的现代设计风格
- **流畅交互动画** — 滚动揭示、平滑锚点跳转、移动端汉堡菜单
- **性能优化** — 纯 CSS 动画、Intersection Observer 懒加载、无外部 JS 库

## 目录结构

```
WebSite-Neptune/
├── index.html              # 主页面（含完整 SEO meta 与 JSON-LD）
├── css/
│   └── style.css           # 全局样式表（设计变量、响应式、动画）
├── js/
│   ├── i18n.js             # 国际化语言包（中英文翻译数据 + 气象模式数据）
│   └── main.js             # 主交互脚本（语言切换、菜单、滚动效果等）
├── assets/
│   ├── favicon.ico         # 浏览器标签图标（取自 Neptune 软件 logo）
│   ├── logo.ico            # 软件 logo 原始文件
│   └── hero.jpg            # Hero 区主视觉背景图
├── robots.txt              # 搜索引擎爬虫指引
├── sitemap.xml             # 站点地图
└── README.md               # 本文档
```

## 页面结构

| 区块 | ID | 说明 |
|------|-----|------|
| 头部导航 | `#header` | 固定导航栏，含 Logo、菜单、语言切换、GitHub 链接 |
| Hero 主视觉 | `#hero` | 全屏首屏，软件名称、简介、统计数字、CTA 按钮 |
| 核心优势 | `#features` | 四大核心特性卡片 |
| 功能模块 | `#modules` | 七大功能模块详细介绍 |
| 气象模式 | `#weather` | 可切换 Tab 的气象模式数据表格（20+ 模式） |
| 技术架构 | `#tech` | 底层技术栈展示 |
| 下载 | `#download` | 版本信息与下载入口 |
| 页脚 | `.footer` | 品牌信息、快捷链接、版权声明 |

## 快速开始

### 本地预览

无需安装任何依赖，直接用浏览器打开即可：

1. 双击 `index.html` 在浏览器中打开
2. 或使用本地服务器获得最佳体验：

```bash
# 方式一：Python 内置服务器
python -m http.server 8080

# 方式二：Node.js http-server
npx http-server -p 8080

# 然后访问 http://localhost:8080
```

### 部署

网站为纯静态文件，可部署到任意静态托管服务：

- **GitHub Pages** — 将文件推送到仓库，启用 Pages 服务
- **Netlify / Vercel** — 拖拽文件夹即可部署
- **Nginx / Apache** — 复制文件到 web 根目录
- **对象存储** — 上传到 OSS / COS / S3 并开启静态网站托管

## SEO 配置说明

### Meta 标签

`index.html` 的 `<head>` 中已配置完整的 SEO 元标签：

- `title` / `description` / `keywords` — 基础搜索优化
- `og:title` / `og:description` / `og:image` / `og:url` — Open Graph 社交分享
- `twitter:card` / `twitter:title` — Twitter Card
- `canonical` — 规范化 URL
- `theme-color` — 浏览器主题色

### Schema.org JSON-LD

已嵌入三组结构化数据：

1. **SoftwareApplication** — 软件应用信息（名称、版本、功能列表、评分）
2. **BreadcrumbList** — 面包屑导航
3. **WebSite** — 网站搜索信息

### robots.txt

```
User-agent: *
Allow: /
Sitemap: https://cupgis.cn/sitemap.xml
```

### sitemap.xml

包含首页及各锚点区块的 URL，附带 `hreflang` 多语言备用链接。

### 部署前需修改

将以下 URL 替换为你的实际域名：

- `index.html` 中的 `og:url`、`og:image`、`canonical`
- `robots.txt` 中的 `Sitemap` 地址
- `sitemap.xml` 中的所有 `<loc>` 地址
- JSON-LD 中的 `url`、`downloadUrl`、`screenshot`

## 中英文双语切换

### 工作原理

1. 所有需要翻译的文本元素添加 `data-i18n="key"` 属性
2. `js/i18n.js` 中维护 `I18N` 对象，包含 `zh-CN` 与 `en` 两套翻译
3. `js/main.js` 的 `applyLanguage()` 函数遍历 `data-i18n` 元素并替换文本
4. 语言偏好通过 `localStorage` 持久化保存
5. 切换语言时同步更新 `<html lang>`、`meta description` 与气象表格

### 添加新翻译

在 `js/i18n.js` 的 `zh-CN` 和 `en` 对象中添加对应 key：

```javascript
"zh-CN": {
  "new.feature": "新特性",
},
"en": {
  "new.feature": "New Feature",
}
```

在 HTML 中使用：

```html
<span data-i18n="new.feature">新特性</span>
```

### 支持的 data 属性

| 属性 | 用途 |
|------|------|
| `data-i18n` | 替换 `textContent` |
| `data-i18n-html` | 替换 `innerHTML`（含 HTML 标签） |
| `data-i18n-placeholder` | 替换 `placeholder` 属性 |

## 响应式断点

| 断点 | 适配设备 | 调整内容 |
|------|----------|----------|
| `> 1024px` | 桌面电脑 | 四列特性、两列模块、完整导航 |
| `769px - 1024px` | 平板 | 两列特性、两列模块 |
| `481px - 768px` | 手机（横屏） | 单列布局、汉堡菜单、横向滚动表格 |
| `≤ 480px` | 手机（竖屏） | 紧凑间距、全宽按钮 |

## 浏览器图标 (Favicon)

浏览器标签页图标使用 Neptune 软件自身的 `logo.ico`，位于 `assets/favicon.ico`。该图标通过以下方式引用：

```html
<link rel="icon" type="image/x-icon" href="assets/favicon.ico">
<link rel="shortcut icon" type="image/x-icon" href="assets/favicon.ico">
<link rel="apple-touch-icon" href="assets/favicon.ico">
```

如需替换图标，将新的 `.ico` 文件覆盖 `assets/favicon.ico` 即可。

## 自定义指南

### 修改主题色

编辑 `css/style.css` 顶部的 `:root` 变量：

```css
:root {
  --ocean-deep: #0B3D5C;      /* 深海蓝 */
  --ocean-accent: #00A8CC;     /* 青色强调色 */
  /* 修改这两个变量即可全局换色 */
}
```

### 修改气象模式数据

编辑 `js/i18n.js` 中的 `WEATHER_MODELS` 对象，按分类添加/修改模式条目：

```javascript
{
  code: "NEW_MODEL",
  name_zh: "新模式中文名",
  name_en: "New Model English Name",
  res: "3km",
  range_zh: "48小时",
  range_en: "48h"
}
```

### 修改版本号

全局搜索 `v1.3.2` 替换为新版本号（涉及 `index.html` 与 `js/i18n.js`）。

## 浏览器兼容性

| 浏览器 | 最低版本 |
|--------|----------|
| Chrome / Edge | 88+ |
| Firefox | 84+ |
| Safari | 14+ |
| 移动端 Safari / Chrome | iOS 14+ / Android 8+ |

> 使用了 CSS Grid、CSS Custom Properties、Intersection Observer、backdrop-filter 等现代特性。

## 无障碍性 (A11y)

- 语义化 HTML5 标签（`<header>` `<nav>` `<section>` `<footer>`）
- 所有交互元素含 `aria-label`
- 颜色对比度符合 WCAG AA 标准（≥ 4.5:1）
- 支持 `prefers-reduced-motion` 减少动画
- 键盘可导航的菜单与链接

## 性能优化

- **零外部依赖** — 无 CDN、无字体加载、无 JS 框架
- **CSS 动画** — 使用 `transform` 与 `opacity` 实现高性能动画
- **Intersection Observer** — 滚动揭示仅在元素进入视口时触发
- **passive scroll** — 滚动事件监听使用 `{ passive: true }`
- **图片优化** — Hero 图使用 `fetchpriority="high"`

## 技术栈

| 技术 | 用途 |
|------|------|
| HTML5 | 页面结构与语义化标签 |
| CSS3 | 样式、响应式布局、动画（Grid / Flexbox / Custom Properties） |
| JavaScript (ES5+) | 交互逻辑、i18n、DOM 操作 |
| SVG | 内联图标（零图片请求） |
| Schema.org JSON-LD | 结构化数据 |

## 许可证

本网站项目随 Neptune 软件一同发布，许可证待定。

## 相关链接

- **Neptune 官网**：[cupgis.cn](https://cupgis.cn)
- **QGIS 官网**：[qgis.org](https://qgis.org)

---

© 2026 Neptune. All rights reserved.
