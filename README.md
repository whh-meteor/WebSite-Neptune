# Neptune 官方网站

Neptune 1.3.7 的静态官方网站，使用 HTML5、CSS3 和原生 JavaScript 构建，无前端依赖和构建步骤。

## 当前产品信息

- 产品版本：1.3.7
- 平台：Windows 10/11 64 位
- 安装包大小：258,843,873 字节（约 247 MiB）
- 安装包 SHA-256：`12403D247182F1C39591F955A844DBCEEBC2D5B71C6650FD2DF3A7B75C727641`
- 官网域名：<https://cupgis.cn>
- 源码：<https://github.com/whh-meteor/QGIS_Tools>
- 下载地址：`index.html` 中现有百度网盘 URL；发布前必须确认该链接已经指向 1.3.7

## 展示的产品能力

- 7 个 Ribbon 业务模块：开始、网格、岸线、水深、模拟、气象、设置；
- 右侧 DeepSeek AI 独立能力区，基于 LangChain，提供 16 项白名单工具；
- 完整网格生成、中心/近岸加密、质检和 Mesh/GeoJSON 转换；
- 岸线绘制、顶点编辑、选择、合并与等间距抽稀；
- NetCDF 六类结果可视化与 FVCOM 5.1.0 运行；
- 19 种气象模式下载与内嵌天气预报；
- 6 套桌面主题。

网站必须明确：独立水深插值/编辑和桌面语言切换在 1.3.7 仍为预留入口。网页自身的中英文切换不等于桌面程序已经完成国际化。

## 目录结构

```text
WebSite-Neptune/
├── index.html
├── css/style.css
├── js/
│   ├── i18n.js
│   └── main.js
├── assets/
│   ├── favicon.ico
│   ├── logo.ico
│   └── hero.jpg
├── docs/
│   ├── Neptune_功能说明文档.pdf
│   └── Neptune_功能说明文档v1.3.7.pdf
├── robots.txt
├── sitemap.xml
├── AGENTS.md
└── README.md
```

## 页面结构

| 区块 | ID | 说明 |
| --- | --- | --- |
| 导航 | `#header` | Logo、锚点导航、中英文切换和主站入口 |
| 主视觉 | `#hero` | 1.3.7 简介、统计信息、下载与文档入口 |
| 核心优势 | `#features` | QGIS、海洋算法、NetCDF、气象 |
| 能力域 | `#modules` | 7 个业务模块与 DeepSeek AI 助手 |
| FVCOM | `#fvcom` | 5.1.0 前处理、运行和结果可视化流程 |
| 气象 | `#weather` | 19 种模式的双语数据表 |
| 技术栈 | `#tech` | QGIS/PyQt5、GDAL、NumPy/SciPy、NetCDF、Herbie |
| 下载 | `#download` | 版本、平台、大小、许可和外部下载入口 |
| PDF 预览 | `#pdfModal` | 站内使用说明书预览 |

## 本地预览

直接打开 `index.html` 可以查看大部分内容。为保证 PDF iframe 和资源路径行为与部署一致，推荐运行本地服务器：

```bash
python -m http.server 8080
```

然后访问 <http://localhost:8080>。

## 国际化

`js/i18n.js` 包含 `zh-CN` 和 `en` 两套文案，以及网站气象模式表格。`js/main.js` 的 `applyLanguage()` 根据 `data-i18n`、`data-i18n-html` 和 `data-i18n-placeholder` 更新页面，并把语言偏好保存到 `localStorage`。

新增或修改任何产品文案时，必须同时更新中英文 key。HTML 中的中文默认文案也要与 `zh-CN` 一致，避免 JavaScript 加载前短暂显示旧内容。

## 版本更新清单

发布新版本时逐项检查：

1. `index.html` 的 JSON-LD `softwareVersion`、描述、功能列表和下载 URL；
2. `index.html` 的 Hero 默认文案、统计数字、能力状态、下载版本和大小；
3. `js/i18n.js` 的中英文版本、能力和下载信息；
4. `js/main.js` 的中英文 meta description；
5. `docs/Neptune_功能说明文档.pdf` 与带版本文件名的归档 PDF；
6. `sitemap.xml` 的 `lastmod`；
7. README 的产品事实；
8. 百度网盘链接确实指向新安装包；
9. 搜索旧版本号、`Nuptune`、过期的“待实现”和虚构统计数据。

不要用简单的全局替换代替检查；版本号同时存在于默认 HTML、i18n、结构化数据和下载卡片中。

## 静态检查

项目没有构建步骤。提交前至少检查：

- HTML 标签结构可解析；
- `data-i18n` key 在中英文对象中都存在；
- 本地 `href`、`src` 和 PDF 文件存在；
- JSON-LD 是合法 JSON；
- 气象模式行数与软件 `WEATHER_MODELS` 一致；
- 页面中不存在旧版本或过度承诺；
- 桌面、平板和手机断点下模块卡片正常排列。

## 部署

整个目录可部署到 Nginx/Apache、对象存储或静态托管服务。部署前确认 `canonical`、Open Graph、Twitter Card、`robots.txt` 和 `sitemap.xml` 均使用生产域名。

## 许可证

网站与 Neptune 软件的许可证当前待定，发布文案不得推断具体开源许可证。

## 联系方式

- 官网：<https://cupgis.cn>
- 邮箱：martleth@163.com
