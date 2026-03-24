#!/bin/bash
# PON Network Portal 后台服务启动脚本

PORT=8080
PORTAL_DIR="/home/ryes/.openclaw/workspace/pon-network-portal"
PID_FILE="/tmp/pon-portal-server.pid"

start() {
    if [ -f "$PID_FILE" ] && kill -0 $(cat "$PID_FILE") 2>/dev/null; then
        echo "⚠️  服务已经在运行 (PID: $(cat $PID_FILE))"
        show_status
        exit 0
    fi

    echo "🚀 启动 PON Network Portal 服务..."
    cd "$PORTAL_DIR" || exit 1
    
    # 使用 nohup 在后台运行
    nohup python3 -m http.server $PORT --bind 0.0.0.0 > /tmp/pon-portal-server.log 2>&1 &
    echo $! > "$PID_FILE"
    
    sleep 1
    
    if kill -0 $(cat "$PID_FILE") 2>/dev/null; then
        echo "✅ 服务启动成功！"
        show_status
    else
        echo "❌ 服务启动失败"
        exit 1
    fi
}

stop() {
    if [ -f "$PID_FILE" ]; then
        PID=$(cat "$PID_FILE")
        if kill -0 "$PID" 2>/dev/null; then
            echo "🛑 停止服务 (PID: $PID)..."
            kill "$PID"
            rm -f "$PID_FILE"
            echo "✅ 服务已停止"
        else
            echo "⚠️  服务未运行"
            rm -f "$PID_FILE"
        fi
    else
        echo "⚠️  未找到运行中的服务"
    fi
}

status() {
    if [ -f "$PID_FILE" ] && kill -0 $(cat "$PID_FILE") 2>/dev/null; then
        echo "✅ 服务运行中 (PID: $(cat $PID_FILE))"
        show_status
    else
        echo "❌ 服务未运行"
        [ -f "$PID_FILE" ] && rm -f "$PID_FILE"
    fi
}

show_status() {
    IP1=$(ip addr show ens18 2>/dev/null | grep "inet " | awk '{print $2}' | cut -d'/' -f1)
    IP2=$(ip addr show ens19 2>/dev/null | grep "inet " | awk '{print $2}' | cut -d'/' -f1)
    
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
}

case "${1:-start}" in
    start)
        start
        ;;
    stop)
        stop
        ;;
    restart)
        stop
        sleep 1
        start
        ;;
    status)
        status
        ;;
    *)
        echo "用法: $0 {start|stop|restart|status}"
        exit 1
        ;;
esac
