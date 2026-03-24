# PON网络实时资讯与技术系统 - 系统设计文档

## 系统概述

**系统名称**: PON Intelligence Hub  
**定位**: PON网络行业资讯、技术文档、厂商方案的统一平台  
**更新机制**: 自动采集 + 人工编辑 + 用户上传  
**核心模块**: 4大模块，覆盖行业、资讯、技术、互动

---

## 模块一：业内行业了解（厂商方案库）

### 1.1 数据结构

```javascript
// 厂商数据模型
const VendorSchema = {
  id: String,              // huawei/h3c/zte/fiberhome
  name: String,            // 显示名称
  brandColor: String,      // 品牌色
  logo: String,            // Logo URL
  
  // 方案介绍
  solution: {
    overview: String,      // 方案概述
    architecture: String,  // 组网架构
    values: Array,         // 方案价值点
    scenarios: Array       // 适用场景
  },
  
  // 产品组成
  products: {
    olt: Array,            // OLT产品线
    onu: Array,            // ONU产品线
    accessories: Array     // 配件/光模块
  },
  
  // 产品规格
  specifications: {
    oltSpecs: Object,      // OLT规格表
    onuSpecs: Object,      // ONU规格表
    performance: Object    // 性能指标
  },
  
  // 行业方案
  industrySolutions: {
    education: Object,     // 教育方案
    healthcare: Object,    // 医疗方案
    enterprise: Object,    // 企业方案
    government: Object     // 政务方案（可选）
  },
  
  // 元数据
  metadata: {
    lastUpdated: Date,
    version: String,
    dataSource: String     // 数据来源
  }
}
```

### 1.2 厂商内容模板

#### 华为 F5G

**方案介绍**:
- **品牌**: F5G (第五代固定网络)
- **核心技术**: XGS-PON、50G PON、硬切片、FTTR
- **架构特点**: 极简POL、确定性时延、AI运维
- **适用场景**: 教育、医疗、企业、工业

**产品组成**:
| 类型 | 产品系列 | 代表型号 | 关键特性 |
|------|----------|----------|----------|
| OLT | MA5800系列 | MA5800-X17/X7 | 14.4T容量、50G PON |
| OLT | EA5800系列 | EA5800-X7 | 紧凑型、2.4T容量 |
| ONU | OptiXstar P系列 | P813E/P612E/P603E | Wi-Fi 6、PoE++ |
| ONU | OptiXstar T系列 | T672E | 工业级、宽温 |

**产品规格（MA5800-X17）**:
- 交换容量: 14.4 Tbps
- PON口: 最大17,280个
- 业务槽位: 16个
- 支持技术: GPON/XG-PON/XGS-PON/50G PON
- 电源: 双电源冗余
- 尺寸: 482.6mm × 615mm × 486mm

**教育方案**:
- **组网**: XGS-PON到教室、FTTR到宿舍
- **价值**: 千兆到桌面、Wi-Fi 6全覆盖、极简运维
- **案例**: 北京大学、人大附中

**医疗方案**:
- **组网**: 硬切片隔离、确定性时延
- **价值**: <1ms时延、等保四级、四网合一
- **案例**: 北京协和医院

---

#### 华三 园区光网络

**方案介绍**:
- **品牌**: H3C POL (Passive Optical LAN)
- **核心技术**: XGS-PON、SRv6、AD-Campus
- **架构特点**: 极简架构、SDN管控、高性价比
- **适用场景**: 教育、医疗、企业园区

**产品组成**:
| 类型 | 产品系列 | 代表型号 | 关键特性 |
|------|----------|----------|----------|
| OLT | S7600系列 | S7610-OLT | 4.8T容量、SRv6 |
| OLT | S5500系列 | S5560-OLT | 经济型 |
| ONU | EGT300系列 | EGT304/310/312 | Wi-Fi 6、PoE |

**产品规格（S7610-OLT）**:
- 交换容量: 4.8 Tbps
- PON口: 最大2,160个
- 支持技术: XGS-PON
- 管控: AD-Campus平台
- 特色: 极简配置、批量部署

**方案对比**:
- 相比华为: 成本更低、配置更简单
- 相比中兴: SDN能力更强
- 相比烽火: 品牌知名度更高

---

#### 中兴 PON

**方案介绍**:
- **品牌**: 中兴POL、TSN over PON
- **核心技术**: XGS-PON、50G PON、TSN、工业PON
- **架构特点**: TSN确定性时延、工业级可靠
- **适用场景**: 工业控制、智能制造、交通

**产品组成**:
| 类型 | 产品系列 | 代表型号 | 关键特性 |
|------|----------|----------|----------|
| OLT | C600系列 | C600 | 4.8T容量、50G PON |
| OLT | C300系列 | C300 | 经典型 |
| ONU | F600系列 | F600/F600A | 工业级 |

**特色技术**:
- **TSN over PON**: 业界首创，<100μs时延
- **工业PON**: 宽温(-40℃~75℃)、抗电磁干扰
- **50G PON**: 平滑演进支持

---

#### 烽火 PON

**方案介绍**:
- **品牌**: FiberHome PON
- **核心技术**: XGS-PON、Combo PON、自主芯片
- **架构特点**: 国产化、自主可控、性价比高
- **适用场景**: 政务、教育、中小企业

**产品组成**:
| 类型 | 产品系列 | 代表型号 | 关键特性 |
|------|----------|----------|----------|
| OLT | AN6000系列 | AN6000-17 | 自研芯片 |
| ONU | HG系列 | HG260/310 | 经济型 |

**特色优势**:
- **自研芯片**: 烽火自研PON芯片，成本优势明显
- **Combo PON**: 三模共存(GPON/XGS-PON/50G)
- **国产化**: 100%自主可控

---

## 模块二：业内最新资讯

### 2.1 数据采集策略

**采集频率**: 每周五自动刷新  
**采集来源**:
- 厂商官网新闻中心
- 行业媒体（C114、飞象网、通信世界）
- 标准组织（ITU-T、IEEE、CCSA）
- 运营商公告

### 2.2 资讯分类

```javascript
const NewsCategory = {
  PRODUCT_RELEASE: '产品发布',      // 新品发布、版本更新
  TECHNOLOGY: '技术动态',           // 新技术、标准进展
  INDUSTRY: '行业应用',             // 部署案例、行业报告
  MARKET: '市场动态',               // 市场份额、竞争分析
  POLICY: '政策标准'                // 国家政策、行业标准
}
```

### 2.3 资讯数据模型

```javascript
const NewsSchema = {
  id: String,              // 唯一标识
  title: String,           // 标题
  category: String,        // 分类
  date: Date,              // 发布日期
  source: String,          // 来源
  sourceUrl: String,       // 原文链接
  summary: String,         // 摘要
  content: String,         // 内容（HTML）
  
  // 标签系统
  tags: Array,             // 标签数组
  vendors: Array,          // 相关厂商
  technologies: Array,     // 相关技术
  
  // 媒体
  coverImage: String,      // 封面图
  images: Array,           // 配图
  
  // 元数据
  views: Number,           // 浏览次数
  isFeatured: Boolean,     // 是否精选
  createdAt: Date,
  updatedAt: Date
}
```

### 2.4 采集模板（示例）

**资讯条目示例**:
```json
{
  "id": "news-2026-0322-001",
  "title": "华为发布F5G Advanced解决方案",
  "category": "产品发布",
  "date": "2026-03-22",
  "source": "华为官网",
  "sourceUrl": "https://www.huawei.com/...",
  "summary": "华为正式发布F5G Advanced解决方案，支持50G PON、硬切片、AI运维等特性...",
  "content": "...",
  "tags": ["华为", "F5G", "50G PON"],
  "vendors": ["huawei"],
  "technologies": ["50G-PON", "AI-OPS"],
  "isFeatured": true
}
```

---

## 模块三：PON技术说明

### 3.1 技术文档结构

```
技术文档中心
├── 📋 标准规范
│   ├── GPON标准 (ITU-T G.984)
│   ├── XG-PON标准 (ITU-T G.987)
│   ├── XGS-PON标准 (ITU-T G.9807)
│   ├── 50G PON标准 (ITU-T G.9804)
│   └── 中国通信行业标准
├── 🔌 协议解读
│   ├── OMCI协议详解
│   ├── GEM帧结构
│   ├── DBA动态带宽分配
│   └── ONU注册流程
├── 🔧 关键技术
│   ├── 光分配网络(ODN)
│   ├── 光模块技术
│   ├── 测距与延时补偿
│   ├── FEC前向纠错
│   ├── AES加密
│   └── 光功率预算
├── 🏭 厂商关键技术
│   ├── 硬切片与物理隔离
│   ├── 确定性时延与TSN
│   ├── Combo PON演进
│   ├── AI智能运维
│   ├── 自主芯片与国产化
│   └── PON+Wi-Fi融合
├── ⚔️ 竞品方案对比
│   ├── 华为 vs 华三
│   ├── 华为 vs 中兴
│   └── 四大厂商综合对比
└── 📖 白皮书
    ├── F5G技术白皮书
    ├── POL园区网络白皮书
    └── 50G PON技术白皮书
```

### 3.2 技术文档数据模型

```javascript
const DocumentSchema = {
  id: String,              // 唯一标识
  title: String,           // 文档标题
  category: String,        // 分类
  
  // 内容
  abstract: String,        // 摘要
  content: String,         // 内容（Markdown/HTML）
  toc: Array,              // 目录结构
  
  // 文件
  fileType: String,        // 类型: pdf/word/ppt/chm/html
  fileSize: Number,        // 文件大小
  fileUrl: String,         // 文件URL
  downloadUrl: String,     // 下载链接
  
  // 关联
  vendors: Array,          // 相关厂商
  technologies: Array,     // 相关技术
  relatedDocs: Array,      // 相关文档
  
  // 元数据
  author: String,          // 作者
  version: String,         // 版本
  publishDate: Date,       // 发布日期
  updateDate: Date,        // 更新日期
  views: Number,           // 浏览次数
  downloads: Number,       // 下载次数
  
  // 来源
  source: String,          // 来源: official/upload/community
  uploader: String,        // 上传者
  status: String           // 状态: published/draft/pending
}
```

### 3.3 在线编辑功能

**编辑器特性**:
- Markdown编辑 + 实时预览
- 富文本编辑器（TinyMCE/Editor.js）
- 代码高亮（技术文档）
- 图片上传/拖拽
- 表格编辑
- 版本历史

**权限管理**:
```javascript
const Permission = {
  ADMIN: '管理员',        // 全部权限
  EDITOR: '编辑',         // 编辑、发布
  UPLOADER: '上传者',     // 上传文档
  VIEWER: '访客'          // 只读
}
```

---

## 模块四：系统管理与数据更新

### 4.1 数据采集脚本

**每周五自动采集任务**:
```bash
#!/bin/bash
# news-collector.sh

# 1. 采集厂商新闻
curl -s "https://www.huawei.com/cn/news" | parse_huawei_news
curl -s "https://www.h3c.com/cn/About_H3C/Company_News/" | parse_h3c_news

# 2. 采集行业媒体
# ...

# 3. 生成资讯JSON
node generate-news.js

# 4. 更新网站数据
cp news-data.json js/data.js
```

### 4.2 人工审核流程

```
采集/上传 → 待审核 → 编辑审核 → 发布/驳回
                ↓
            定时发布（可选）
```

### 4.3 数据更新接口

```javascript
// 资讯更新API
POST /api/news/collect
{
  source: 'huawei',
  dateRange: '2026-03-15_to_2026-03-22',
  autoPublish: false
}

// 文档上传API
POST /api/docs/upload
{
  title: '...',
  category: 'tech',
  file: File,
  tags: ['PON', '华为']
}
```

---

## 5. 系统架构图

```
┌─────────────────────────────────────────────────────────────┐
│                      PON Intelligence Hub                    │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │  厂商方案库  │  │  最新资讯   │  │    技术文档中心     │ │
│  │  (模块一)   │  │  (模块二)   │  │     (模块三)       │ │
│  ├─────────────┤  ├─────────────┤  ├─────────────────────┤ │
│  │ • 华为F5G   │  │ • 自动采集  │  │ • 标准规范         │ │
│  │ • 华三POL   │  │ • 每周更新  │  │ • 协议解读         │ │
│  │ • 中兴PON   │  │ • 人工审核  │  │ • 关键技术         │ │
│  │ • 烽火PON   │  │ • 标签分类  │  │ • 在线编辑         │ │
│  │ • 产品规格  │  │ • 全文搜索  │  │ • 用户上传         │ │
│  └─────────────┘  └─────────────┘  └─────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│                      系统管理层                              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │ 数据采集器  │  │  内容管理   │  │    用户权限管理     │ │
│  │ • 定时任务  │  │ • 审核发布  │  │ • 角色权限         │ │
│  │ • 爬虫脚本  │  │ • 版本控制  │  │ • 操作日志         │ │
│  └─────────────┘  └─────────────┘  └─────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│                      数据存储层                              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │  JSON文件   │  │  Markdown   │  │    上传文件存储     │ │
│  │ • 结构化数据│  │ • 技术文档  │  │ • PDF/Word/PPT     │ │
│  └─────────────┘  └─────────────┘  └─────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

---

## 6. 实施建议

### 第一阶段：基础架构（1-2周）
- [ ] 搭建静态网站框架
- [ ] 创建厂商方案页面
- [ ] 实现基础导航和布局
- [ ] 添加侧边栏导航

### 第二阶段：内容填充（2-3周）
- [ ] 收集整理4厂商资料
- [ ] 撰写技术文档
- [ ] 创建资讯数据结构
- [ ] 编写采集脚本

### 第三阶段：功能完善（1-2周）
- [ ] 实现在线编辑器
- [ ] 添加用户上传功能
- [ ] 实现搜索功能
- [ ] 添加响应式适配

### 第四阶段：自动化（持续）
- [ ] 部署定时采集任务
- [ ] 建立审核工作流
- [ ] 数据备份机制

---

*文档版本: 1.0*  
*创建时间: 2026-03-22*
