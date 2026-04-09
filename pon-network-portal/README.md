# PON Network Portal

> 🌐 PON网络技术资讯门户 | 汇聚行业前沿方案 · 追踪最新技术动态 · 构建专业知识库

## 项目简介

PON Network Portal 是一个专注于PON（Passive Optical Network，无源光网络）技术的综合资讯门户平台，收录华为、华三、中兴、烽火等主流厂商的F5G/光网络解决方案。

## 功能特性

- 📊 **厂商方案库** - 华为F5G、华三园区光网络、中兴PON、烽火PON等主流方案
- 📰 **最新资讯** - 追踪行业动态、产品发布、技术趋势
- 📖 **技术文档中心** - 沉淀技术知识、方案对比、白皮书解读
- 🔬 **关键技术** - XGS-PON测距、光链路故障诊断、ODN可视化等技术专题
- 🏢 **场景化方案** - 教育、医疗、企业等行业的FTTR/FTTH解决方案

## 技术架构

| 项目 | 技术方案 |
|------|---------|
| **前端框架** | 原生 HTML5 + CSS3 + JavaScript |
| **页面渲染** | 静态站点，响应式布局 |
| **数据存储** | JSON文件 + LocalStorage |
| **部署方式** | 静态托管 / GitHub Pages / Netlify / 本地服务器 |

## 页面预览

```
├── index.html              # 首页
├── insights.html           # 技术洞察
├── pages/
│   ├── vendors/           # 厂商方案
│   │   ├── huawei-f5g.html
│   │   ├── h3c-optical.html
│   │   ├── zte-pon.html
│   │   └── fiberhome-pon.html
│   ├── news/              # 最新资讯
│   ├── docs/              # 技术文档中心
│   └── tech/              # 关键技术专题
│       └── xgs-pon-ranging.html
└── css/                   # 样式文件
```

## 快速开始

### 本地运行

```bash
# 方法1: 使用Python服务器
cd pon-network-portal
python3 -m http.server 8080

# 方法2: 使用Node.js
npx serve .

# 方法3: 直接打开index.html（部分功能需服务器环境）
```

### 访问地址

- 本地开发: http://localhost:8080
- 局域网访问: http://192.168.100.124:8080

## 部署指南

### GitHub Pages（推荐）

1. Fork 本仓库
2. 进入 Settings → Pages
3. Source 选择 `Deploy from a branch` → `main` → `/ (root)`
4. 保存后访问 `https://yourusername.github.io/pon-network-portal`

### Netlify（免费托管）

```bash
# 拖拽上传整个项目文件夹到 https://app.netlify.com/drop
# 或使用CLI:
npm install -g netlify-cli
netlify deploy --prod --dir=.
```

### 阿里云/腾讯云

参考 [DEPLOY.md](./DEPLOY.md) 获取详细部署指南。

## 技术专题

### XGS-PON测距技术

深入分析XGS-PON网络中的测距技术原理、OTDR应用、TOD技术等。  
👉 查看：[XGS-PON测距技术专题](./pages/tech/xgs-pon-ranging.html)

### 光链路故障诊断

涵盖光链路故障分类、华为OAI方案、中兴OTDR+GIS方案、软件诊断路线等。  
📄 飞书文档：[光链路故障问题综合分析](https://feishu.cn/docx/SWr3deROQo2AaLxkunFc87YAnOc)

## 相关资源

- 飞书文档库：https://feishu.cn/docx/VOj0dVIz4olR2hxcsEXc3WQMnZd
- 技术洞察：https://feishu.cn/docx/DOENd9AnMoE4dExviHacdTJonmb

## 贡献指南

欢迎提交Issue和Pull Request！

## 许可证

MIT License
