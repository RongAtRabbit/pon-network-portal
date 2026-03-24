# 🌐 PON Network Portal - 局域网共享配置

## 快速启动

### 方法 1: 前台运行（适合临时使用）

```bash
cd /home/ryes/.openclaw/workspace/pon-network-portal
./start-server.sh
```

按 `Ctrl+C` 停止服务。

### 方法 2: 后台运行（推荐）

```bash
cd /home/ryes/.openclaw/workspace/pon-network-portal
./server.sh start    # 启动服务
./server.sh stop     # 停止服务
./server.sh restart  # 重启服务
./server.sh status   # 查看状态
```

---

## 访问地址

服务启动后，局域网内的设备可以通过以下地址访问：

| 地址类型 | URL | 说明 |
|---------|-----|------|
| 本机访问 | http://localhost:8080 | 仅限本机 |
| 局域网 1 | http://192.168.100.124:8080 | 网段 1 (ens18) |
| 局域网 2 | http://192.168.1.104:8080 | 网段 2 (ens19) |

### 查看本机 IP

```bash
ip addr show
```

---

## 防火墙配置

如果局域网内的其他设备无法访问，可能需要开放端口：

### Ubuntu/Debian (UFW)

```bash
# 开放 8080 端口
sudo ufw allow 8080/tcp

# 查看防火墙状态
sudo ufw status
```

### CentOS/RHEL (FirewallD)

```bash
# 开放 8080 端口
sudo firewall-cmd --permanent --add-port=8080/tcp
sudo firewall-cmd --reload

# 查看防火墙状态
sudo firewall-cmd --list-ports
```

### 临时关闭防火墙（测试用）

```bash
# Ubuntu/Debian
sudo ufw disable

# CentOS/RHEL
sudo systemctl stop firewalld
```

---

## 目录结构说明

```
pon-network-portal/
├── index.html              # 网站首页
├── insights.html           # 技术洞察
├── js/
│   ├── data.js            # 数据层（资讯、厂商数据）
│   └── components.js      # 组件库
├── css/                    # 样式文件
├── pages/
│   ├── news/              # 最新资讯
│   │   ├── index.html     # 资讯列表
│   │   └── detail.html    # 资讯详情
│   ├── docs/              # 技术文档
│   │   └── center.html    # 文档中心（含上传功能）
│   └── vendors/           # 厂商方案
│       ├── huawei-f5g.html
│       ├── h3c-optical.html
│       ├── zte-pon.html
│       └── fiberhome-pon.html
├── start-server.sh        # 前台启动脚本
├── server.sh              # 后台服务脚本
└── LAN_ACCESS.md          # 本文档
```

---

## 使用场景

### 场景 1: 本机测试
```bash
./start-server.sh
# 浏览器访问: http://localhost:8080
```

### 场景 2: 局域网共享给同事
```bash
./server.sh start
# 告诉同事访问: http://192.168.100.124:8080
```

### 场景 3: 临时演示
```bash
./start-server.sh
# 在同一局域网的设备上打开浏览器访问显示的路由
# 演示完成后按 Ctrl+C 停止
```

---

## 常见问题

### Q: 其他设备无法访问？
**A:** 检查以下几点：
1. 确认服务已启动：`./server.sh status`
2. 检查防火墙：确保 8080 端口已开放
3. 确认设备在同一局域网
4. 尝试使用 IP 地址而非主机名访问

### Q: 如何修改端口？
**A:** 编辑 `server.sh` 和 `start-server.sh`，修改 `PORT` 变量：
```bash
PORT=8080  # 修改为你需要的端口
```

### Q: 如何查看访问日志？
**A:** 后台服务的日志保存在：
```bash
tail -f /tmp/pon-portal-server.log
```

### Q: 开机自动启动？
**A:** 可以创建一个 systemd 服务：

```bash
sudo tee /etc/systemd/system/pon-portal.service > /dev/null << EOF
[Unit]
Description=PON Network Portal
After=network.target

[Service]
Type=simple
User=ryes
WorkingDirectory=/home/ryes/.openclaw/workspace/pon-network-portal
ExecStart=/usr/bin/python3 -m http.server 8080 --bind 0.0.0.0
Restart=always

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable pon-portal
sudo systemctl start pon-portal
```

---

## 安全提示

⚠️ **注意**: 当前配置使用 Python 的简单 HTTP 服务器，仅适合局域网内部使用，不建议直接暴露到公网。

如需公网访问，建议：
1. 使用 Nginx/Apache 作为反向代理
2. 配置 HTTPS 加密
3. 添加访问认证

---

## 相关文件

- 启动脚本: `start-server.sh`
- 服务脚本: `server.sh`
- 监控 Agent: `../agents/portal-tracker/`
