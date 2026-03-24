#!/bin/bash
# PON Portal 链接健康检查脚本
# 每30分钟运行一次，检查所有页面链接和标题

BASE_URL="http://127.0.0.1:8888"
CHECK_LOG="/home/ryes/.openclaw/workspace/pon-network-portal/logs/link-check.log"
ERROR_LOG="/home/ryes/.openclaw/workspace/pon-network-portal/logs/link-errors.log"

# 创建日志目录
mkdir -p /home/ryes/.openclaw/workspace/pon-network-portal/logs

# 获取当前时间
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

echo "========================================" >> "$CHECK_LOG"
echo "链接检查开始: $TIMESTAMP" >> "$CHECK_LOG"
echo "========================================" >> "$CHECK_LOG"

# 定义要检查的页面和预期标题
# 格式: "URL路径|预期标题包含的关键字"
PAGES=(
    "/index.html|PON网络资讯门户"
    "/pages/vendors/huawei-f5g.html|华为 F5G"
    "/pages/vendors/h3c-optical.html|华三 园区光网络"
    "/pages/vendors/zte-pon.html|中兴 PON"
    "/pages/vendors/fiberhome-pon.html|烽火 PON"
    "/pages/vendors/huawei/education.html|华为 F5G 教育光网"
    "/pages/vendors/huawei/healthcare.html|华为 F5G 医疗光网"
    "/pages/vendors/huawei/enterprise.html|华为 F5G 企业光网"
    "/pages/vendors/huawei/documents.html|华为技术文档库"
    "/pages/vendors/h3c/education.html|华三 教育光网"
    "/pages/vendors/h3c/documents.html|华三技术文档库"
    "/pages/vendors/zte/education.html|中兴 教育光网"
    "/pages/vendors/zte/healthcare.html|中兴 医疗光网"
    "/pages/vendors/zte/enterprise.html|中兴 企业光网"
    "/pages/vendors/zte/documents.html|中兴技术文档库"
    "/pages/vendors/fiberhome/education.html|烽火 教育光网"
    "/pages/vendors/fiberhome/healthcare.html|烽火 医疗光网"
    "/pages/vendors/fiberhome/enterprise.html|烽火 企业光网"
    "/pages/vendors/fiberhome/documents.html|烽火技术文档库"
    "/pages/news/index.html|最新资讯"
    "/pages/news/detail.html?id=news-001|资讯详情"
    "/pages/docs/center.html|技术文档中心"
    "/pages/docs/index.html|技术文档 | PON Portal"
)

ERRORS=0

for page_info in "${PAGES[@]}"; do
    # 分割URL和预期标题
    URL_PATH=$(echo "$page_info" | cut -d'|' -f1)
    EXPECTED_TITLE=$(echo "$page_info" | cut -d'|' -f2)
    
    FULL_URL="${BASE_URL}${URL_PATH}"
    
    # 获取HTTP状态码和页面内容
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$FULL_URL")
    
    if [ "$HTTP_CODE" = "200" ]; then
        # 获取页面标题
        PAGE_TITLE=$(curl -s "$FULL_URL" | grep -oP '(?<=<title>).*?(?=</title>)' | head -1)
        
        # 检查标题是否包含预期关键字
        if echo "$PAGE_TITLE" | grep -q "$EXPECTED_TITLE"; then
            echo "✅ [OK] $URL_PATH" >> "$CHECK_LOG"
            echo "   标题: $PAGE_TITLE" >> "$CHECK_LOG"
        else
            echo "⚠️  [标题不匹配] $URL_PATH" >> "$CHECK_LOG"
            echo "   预期: $EXPECTED_TITLE" >> "$CHECK_LOG"
            echo "   实际: $PAGE_TITLE" >> "$CHECK_LOG"
            ERRORS=$((ERRORS + 1))
            
            # 记录到错误日志
            echo "$TIMESTAMP - 标题不匹配: $URL_PATH" >> "$ERROR_LOG"
            echo "  预期: $EXPECTED_TITLE, 实际: $PAGE_TITLE" >> "$ERROR_LOG"
        fi
    else
        echo "❌ [无法访问] $URL_PATH - HTTP $HTTP_CODE" >> "$CHECK_LOG"
        ERRORS=$((ERRORS + 1))
        
        # 记录到错误日志
        echo "$TIMESTAMP - 无法访问: $URL_PATH (HTTP $HTTP_CODE)" >> "$ERROR_LOG"
    fi
done

echo "" >> "$CHECK_LOG"
echo "检查结果: 共 ${#PAGES[@]} 个页面, $ERRORS 个错误" >> "$CHECK_LOG"
echo "检查完成: $(date '+%Y-%m-%d %H:%M:%S')" >> "$CHECK_LOG"
echo "" >> "$CHECK_LOG"

# 如果有错误，输出警告
if [ $ERRORS -gt 0 ]; then
    echo "⚠️ 发现 $ERRORS 个问题，请查看 $ERROR_LOG"
    exit 1
else
    echo "✅ 所有链接检查通过"
    exit 0
fi
