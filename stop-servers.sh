#!/bin/bash
# 停止所有 PON Portal 服务

echo "🛑 停止 PON Portal 服务..."

# 停止文件服务器
if [ -f /tmp/pon-file-server.pid ]; then
    PID=$(cat /tmp/pon-file-server.pid)
    if kill -0 "$PID" 2>/dev/null; then
        kill "$PID"
        echo "✅ 文件服务器已停止 (PID: $PID)"
    else
        echo "⚠️  文件服务器未运行"
    fi
    rm -f /tmp/pon-file-server.pid
fi

# 停止网站服务器
if [ -f /tmp/pon-web-server.pid ]; then
    PID=$(cat /tmp/pon-web-server.pid)
    if kill -0 "$PID" 2>/dev/null; then
        kill "$PID"
        echo "✅ 网站服务器已停止 (PID: $PID)"
    else
        echo "⚠️  网站服务器未运行"
    fi
    rm -f /tmp/pon-web-server.pid
fi

echo ""
echo "✅ 所有服务已停止"
