#!/bin/bash
# PON Network Portal 监控脚本
# 由 portal-tracker Agent 调用

PORTAL_DIR="/home/ryes/.openclaw/workspace/pon-network-portal"
TRACKER_DIR="/home/ryes/.openclaw/workspace/agents/portal-tracker"
DATE=$(date +%Y-%m-%d)
DATETIME=$(date +%Y-%m-%d_%H-%M-%S)

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "========================================"
echo "  PON Portal Monitor - $DATETIME"
echo "========================================"

# 1. 检查目录存在
if [ ! -d "$PORTAL_DIR" ]; then
    echo -e "${RED}✗${NC} Portal 目录不存在: $PORTAL_DIR"
    exit 1
fi

echo -e "${GREEN}✓${NC} Portal 目录检查通过"

# 2. 统计资讯数量
NEWS_COUNT=$(grep -c "id: 'news-" "$PORTAL_DIR/js/data.js" 2>/dev/null || echo "0")
echo "📰 资讯数量: $NEWS_COUNT 条"

# 3. 检查最新资讯日期
LATEST_NEWS_DATE=$(grep -A1 "sourceUrl" "$PORTAL_DIR/js/data.js" | grep "date:" | head -1 | sed 's/.*date: '\''\(.*\)'\''.*/\1/')
echo "📅 最新资讯日期: $LATEST_NEWS_DATE"

# 4. 检查 sourceUrl 完整性
SOURCEURL_COUNT=$(grep -c "sourceUrl:" "$PORTAL_DIR/js/data.js" 2>/dev/null || echo "0")
if [ "$SOURCEURL_COUNT" -eq "$NEWS_COUNT" ]; then
    echo -e "${GREEN}✓${NC} 所有资讯都有 sourceUrl ($SOURCEURL_COUNT/$NEWS_COUNT)"
else
    echo -e "${YELLOW}⚠${NC} 发现 $((NEWS_COUNT - SOURCEURL_COUNT)) 条资讯缺少 sourceUrl ($SOURCEURL_COUNT/$NEWS_COUNT)"
fi

# 5. 检查文件变更
if [ -d "$PORTAL_DIR/.git" ]; then
    CHANGES=$(cd "$PORTAL_DIR" && git status --short | wc -l)
    if [ "$CHANGES" -gt "0" ]; then
        echo -e "${YELLOW}⚠${NC} 发现 $CHANGES 个未提交变更"
    else
        echo -e "${GREEN}✓${NC} 工作区干净，无未提交变更"
    fi
else
    echo -e "${YELLOW}⚠${NC} 未初始化 Git 仓库"
fi

# 6. 检查关键文件存在性
KEY_FILES=(
    "index.html"
    "js/data.js"
    "js/components.js"
    "pages/news/index.html"
    "pages/news/detail.html"
    "pages/docs/center.html"
    "pages/vendors/fiberhome/documents.html"
)

MISSING_FILES=0
for file in "${KEY_FILES[@]}"; do
    if [ ! -f "$PORTAL_DIR/$file" ]; then
        echo -e "${RED}✗${NC} 关键文件缺失: $file"
        MISSING_FILES=$((MISSING_FILES + 1))
    fi
done

if [ "$MISSING_FILES" -eq "0" ]; then
    echo -e "${GREEN}✓${NC} 所有关键文件存在"
fi

# 7. 生成状态摘要
echo ""
echo "========================================"
echo "  状态摘要"
echo "========================================"
echo "检查时间: $DATETIME"
echo "资讯总数: $NEWS_COUNT"
echo "最新日期: $LATEST_NEWS_DATE"
echo "检查状态: 完成"
echo "========================================"

# 保存状态到 JSON
jq --arg date "$DATETIME" \
   --arg news "$NEWS_COUNT" \
   --arg latest "$LATEST_NEWS_DATE" \
   '.lastCheck = $date | .statistics.totalChecks += 1' \
   "$TRACKER_DIR/data/state.json" > "$TRACKER_DIR/data/state.json.tmp" && \
   mv "$TRACKER_DIR/data/state.json.tmp" "$TRACKER_DIR/data/state.json"

echo -e "${GREEN}✓${NC} 状态已更新到 $TRACKER_DIR/data/state.json"
