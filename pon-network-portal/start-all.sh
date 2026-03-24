#!/bin/bash
# PON Network Portal - 完整服务启动脚本
# 同时启动网站服务器和文件上传服务器

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}"
echo "╔════════════════════════════════════════════════════════════╗"
echo "║     PON Network Portal - 完整服务启动                     ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo -e "${NC}"
echo ""

# 获取本机IP
IP=$(hostname -I | awk '{print $1}')

echo -e "${GREEN}📁 工作目录:${NC} $SCRIPT_DIR"
echo -e "${GREEN}🌐 本机IP:${NC} $IP"
echo ""

# 检查端口占用
check_port() {
    local port=$1
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1; then
        return 1
    else
        return 0
    fi
}

# 启动文件服务器
echo -e "${YELLOW}🚀 启动文件上传服务器...${NC}"
if check_port 8888; then
    python3 file-server.py > /tmp/pon-file-server.log 2>&1 &
echo $! > /tmp/pon-file-server.pid
    sleep 1
    if kill -0 $(cat /tmp/pon-file-server.pid) 2>/dev/null; then
        echo -e "${GREEN}✅ 文件服务器已启动${NC}"
        echo -e "   地址: ${BLUE}http://$IP:8888${NC}"
        echo -e "   日志: /tmp/pon-file-server.log"
    else
        echo -e "${RED}❌ 文件服务器启动失败${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  端口 8888 已被占用，文件服务器可能已在运行${NC}"
fi

echo ""

# 启动网站服务器
echo -e "${YELLOW}🚀 启动网站服务器...${NC}"
if check_port 8080; then
    python3 -m http.server 8080 --bind 0.0.0.0 > /tmp/pon-web-server.log 2>&1 &
echo $! > /tmp/pon-web-server.pid
    sleep 1
    if kill -0 $(cat /tmp/pon-web-server.pid) 2>/dev/null; then
        echo -e "${GREEN}✅ 网站服务器已启动${NC}"
        echo -e "   地址: ${BLUE}http://$IP:8080${NC}"
        echo -e "   日志: /tmp/pon-web-server.log"
    else
        echo -e "${RED}❌ 网站服务器启动失败${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  端口 8080 已被占用，网站服务器可能已在运行${NC}"
fi

echo ""
echo -e "${GREEN}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║  服务启动完成！                                          ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "📂 ${YELLOW}文件上传服务:${NC} http://$IP:8888"
echo -e "   - 上传接口: POST http://$IP:8888/api/upload"
echo -e "   - 文档列表: GET  http://$IP:8888/api/docs"
echo -e ""
echo -e "🌐 ${YELLOW}网站访问地址:${NC} http://$IP:8080"
echo -e "   - 本机访问: http://localhost:8080"
echo -e "   - 局域网访问: http://$IP:8080"
echo ""
echo -e "📝 ${YELLOW}查看日志:${NC}"
echo -e "   tail -f /tmp/pon-file-server.log"
echo -e "   tail -f /tmp/pon-web-server.log"
echo ""
echo -e "🛑 ${YELLOW}停止服务:${NC} ./stop-servers.sh"
echo ""
echo -e "${GREEN}按 Ctrl+C 可以查看此信息，服务将在后台继续运行${NC}"
echo ""

# 保持脚本运行，按 Ctrl+C 时不会杀死后台进程
trap 'echo -e "\n${YELLOW}提示: 服务仍在后台运行${NC}"; exit 0' INT

while true; do
    sleep 1
done
