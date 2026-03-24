#!/bin/bash
# PON Network Portal - 网站健康检查与自动刷新脚本
# 每10分钟执行一次，检测服务状态并自动重启

LOG_FILE="/tmp/pon-portal-monitor.log"
WEB_PORT=8080
FILE_PORT=8888
WORK_DIR="/home/ryes/.openclaw/workspace/pon-network-portal"

echo "[$(date '+%Y-%m-%d %H:%M:%S')] 开始检测PON网站服务状态..." >> $LOG_FILE

# 检查Web服务(8080端口)
WEB_PID=$(ss -tlnp | grep ":$WEB_PORT" | grep -o 'pid=[0-9]*' | cut -d= -f2)
if [ -z "$WEB_PID" ]; then
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] ⚠️ Web服务(8080)未运行，正在启动..." >> $LOG_FILE
    cd $WORK_DIR && nohup python3 -m http.server 8080 --bind 0.0.0.0 > /tmp/web.log 2>&1 &
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] ✅ Web服务已启动，PID: $!" >> $LOG_FILE
else
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] ✅ Web服务(8080)运行正常，PID: $WEB_PID" >> $LOG_FILE
fi

# 检查文件服务(8888端口)
FILE_PID=$(ss -tlnp | grep ":$FILE_PORT" | grep -o 'pid=[0-9]*' | cut -d= -f2)
if [ -z "$FILE_PID" ]; then
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] ⚠️ 文件服务(8888)未运行，正在启动..." >> $LOG_FILE
    cd $WORK_DIR && nohup python3 file-server.py > /tmp/file-server.log 2>&1 &
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] ✅ 文件服务已启动，PID: $!" >> $LOG_FILE
else
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] ✅ 文件服务(8888)运行正常，PID: $FILE_PID" >> $LOG_FILE
fi

# 测试HTTP响应
echo "[$(date '+%Y-%m-%d %H:%M:%S')] 测试网站响应..." >> $LOG_FILE
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:$WEB_PORT/ 2>/dev/null)
if [ "$HTTP_CODE" = "200" ]; then
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] ✅ 网站响应正常(HTTP 200)" >> $LOG_FILE
else
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] ⚠️ 网站响应异常(HTTP $HTTP_CODE)，尝试重启..." >> $LOG_FILE
    # 杀死现有进程
    pkill -f "http.server 8080" 2>/dev/null
    sleep 1
    cd $WORK_DIR && nohup python3 -m http.server 8080 --bind 0.0.0.0 > /tmp/web.log 2>&1 &
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] ✅ Web服务已重启" >> $LOG_FILE
fi

echo "[$(date '+%Y-%m-%d %H:%M:%S')] 检测完成" >> $LOG_FILE
echo "----------------------------------------" >> $LOG_FILE
