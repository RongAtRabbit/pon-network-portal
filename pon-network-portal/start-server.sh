#!/bin/bash
# PON Network Portal 局域网共享启动脚本

echo "🌐 PON Network Portal - 局域网共享"
echo "====================================="

# 获取本机IP地址
IP1=$(ip addr show ens18 2>/dev/null | grep "inet " | awk '{print $2}' | cut -d'/' -f1)
IP2=$(ip addr show ens19 2>/dev/null | grep "inet " | awk '{print $2}' | cut -d'/' -f1)

PORT=8080
PORTAL_DIR="/home/ryes/.openclaw/workspace/pon-network-portal"

echo ""
echo "📁 共享目录: $PORTAL_DIR"
echo "🚪 服务端口: $PORT"
echo ""

if [ -n "$IP1" ]; then
    echo "🔗 局域网访问地址 1: http://$IP1:$PORT"
fi

if [ -n "$IP2" ]; then
    echo "🔗 局域网访问地址 2: http://$IP2:$PORT"
fi

echo "🔗 本机访问地址: http://localhost:$PORT"
echo ""
echo "📱 局域网内的其他设备可以通过以上地址访问网站"
echo "⚠️  按 Ctrl+C 停止服务"
echo "====================================="
echo ""

# 切换到网站目录并启动服务器
cd "$PORTAL_DIR" || exit 1

# 使用 Python 启动简单 HTTP 服务器
python3 -m http.server $PORT --bind 0.0.0.0
