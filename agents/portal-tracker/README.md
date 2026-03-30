# Portal Tracker Agent

**PON Network Portal 专职追踪专家**

---

## 📋 简介

Portal Tracker 是一个持久化的专用 Agent，负责持续监控、分析和报告 PON Network Portal 网站的演进与更新。

## 🎯 核心职责

1. **持续监控** - 定期检查网站内容、结构和数据的变化
2. **版本追踪** - 记录每次修改，建立变更历史
3. **质量审计** - 检查链接有效性、内容一致性、数据完整性
4. **演进报告** - 生成更新摘要和改进建议
5. **知识沉淀** - 将重要变更同步到 MEMORY.md

## 📁 目录结构

```
agents/portal-tracker/
├── portal-tracker.md     # Agent 能力档案（本文件）
├── monitor.sh            # 监控脚本
├── data/
│   └── state.json        # 监控状态数据库
└── logs/
    ├── daily/            # 每日日志
    ├── weekly/           # 每周报告
    ├── monthly/          # 月度报告
    └── issues/           # 问题记录
```

## 🚀 使用方式

### 手动触发监控
```bash
./agents/portal-tracker/monitor.sh
```

### 通过 Agent 调用
```
检查 PON Portal 网站状态
生成网站监控报告
检查资讯数据完整性
```

### Heartbeat 自动触发
在每次心跳检查时，Agent 会自动执行监控任务（已配置在 HEARTBEAT.md）。

## 📊 监控指标

| 指标 | 说明 | 阈值 |
|------|------|------|
| 资讯数量 | NEWS_DATA 条目数 | 每周应 ≥ 12 条 |
| 资讯时效性 | 最新资讯日期 | 不应超过 7 天 |
| 数据来源 | sourceUrl 完整性 | 100% 覆盖 |
| 厂商信息 | VENDOR_DATA 完整性 | 4 家厂商完整 |

## 📝 报告类型

- **日报** (`logs/daily/YYYY-MM-DD.md`) - 每日状态快照
- **周报** (`logs/weekly/week-XX-YYYY.md`) - 每周演进汇总
- **月报** (`logs/monthly/YYYY-MM.md`) - 月度深度分析
- **问题记录** (`logs/issues/issue-XXX.md`) - 发现的问题及修复

## 🔧 配置

监控规则和目标可在 `portal-tracker.md` 中调整。

状态数据存储在 `data/state.json`。

---

*创建日期: 2026-03-22*  
*版本: v1.0*
