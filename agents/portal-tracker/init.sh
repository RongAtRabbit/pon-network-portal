#!/bin/bash
# Portal Tracker Agent 初始化脚本

echo "🚀 PON Network Portal Tracker Agent 初始化"
echo "=========================================="

TRACKER_DIR="/home/ryes/.openclaw/workspace/agents/portal-tracker"
PORTAL_DIR="/home/ryes/.openclaw/workspace/pon-network-portal"

# 1. 确保目录结构存在
echo "📁 检查目录结构..."
mkdir -p "$TRACKER_DIR"/{logs/{daily,weekly,monthly,issues},data}
echo "✓ 目录结构已就绪"

# 2. 检查监控脚本
echo "🔧 检查监控脚本..."
if [ -f "$TRACKER_DIR/monitor.sh" ]; then
    chmod +x "$TRACKER_DIR/monitor.sh"
    echo "✓ 监控脚本已就绪"
else
    echo "✗ 监控脚本不存在"
    exit 1
fi

# 3. 初始化状态文件
echo "💾 初始化状态数据库..."
if [ ! -f "$TRACKER_DIR/data/state.json" ]; then
cat > "$TRACKER_DIR/data/state.json" << 'EOF'
{
  "version": "1.0",
  "created": "2026-03-22",
  "baseline": {
    "files": {},
    "newsCount": 12,
    "lastNewsDate": "2026-03-20",
    "vendorCount": 4
  },
  "lastCheck": null,
  "statistics": {
    "totalChecks": 0,
    "issuesFound": 0,
    "issuesFixed": 0
  },
  "history": []
}
EOF
    echo "✓ 状态数据库已创建"
else
    echo "✓ 状态数据库已存在"
fi

# 4. 运行首次监控
echo ""
echo "🔍 执行首次监控检查..."
echo "=========================================="
"$TRACKER_DIR/monitor.sh"

echo ""
echo "=========================================="
echo "✅ Portal Tracker Agent 初始化完成"
echo ""
echo "使用方式:"
echo "  手动检查: ./agents/portal-tracker/monitor.sh"
echo "  查看日志: cat agents/portal-tracker/logs/daily/*.md"
echo "  查看状态: cat agents/portal-tracker/data/state.json"
echo ""
echo "Agent 将在每次 Heartbeat 时自动执行监控任务"
echo "=========================================="
