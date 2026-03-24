# PON Portal 网站发布指南

## 快速开始

### 局域网访问（最简单）

在局域网内快速共享网站给同事访问：

```bash
cd /home/ryes/.openclaw/workspace/pon-network-portal

# 方法1: 前台运行（按Ctrl+C停止）
./start-server.sh

# 方法2: 后台运行（推荐）
./server.sh start

# 查看状态
./server.sh status
```

访问地址：
- 本机: http://localhost:8080
- 局域网: http://192.168.100.124:8080

详细配置见: [LAN_ACCESS.md](LAN_ACCESS.md)

---

## 当前状态
- **运行方式**: Python HTTP Server (开发环境)
- **访问地址**: `http://192.168.100.124:8888`
- **问题**: 仅适合开发测试，不适合生产环境

---

## 方案一：静态网站托管（推荐）

适合：无后端、纯静态HTML网站

### 1. GitHub Pages（免费）
```bash
# 1. 创建GitHub仓库
cd /home/ryes/.openclaw/workspace/pon-network-portal
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/pon-portal.git
git push -u origin main

# 2. 在GitHub仓库设置中启用GitHub Pages
# Settings → Pages → Source: Deploy from branch → main / root
```
**访问地址**: `https://yourusername.github.io/pon-portal`

### 2. Netlify（免费，推荐）
```bash
# 1. 安装Netlify CLI
npm install -g netlify-cli

# 2. 部署
cd /home/ryes/.openclaw/workspace/pon-network-portal
netlify deploy --prod --dir=.

# 或使用拖拽部署
# 访问 https://app.netlify.com/drop
# 将整个 pon-network-portal 文件夹拖拽上传
```
**优点**: 自动HTTPS、全球CDN、自定义域名免费

### 3. Vercel（免费）
```bash
# 安装Vercel CLI
npm install -g vercel

# 部署
cd /home/ryes/.openclaw/workspace/pon-network-portal
vercel --prod
```

---

## 方案二：云服务器部署

适合：需要独立域名、企业级部署

### 阿里云/腾讯云轻量服务器（推荐）

**步骤1：购买服务器**
- 阿里云轻量应用服务器（2核2G，约60元/年）
- 腾讯云轻量应用服务器（2核2G，约50元/年）
- 系统选择：Ubuntu 22.04 / CentOS 8

**步骤2：安装Nginx**
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install nginx -y

# CentOS/RHEL
sudo yum install nginx -y
```

**步骤3：上传网站文件**
```bash
# 使用scp上传
scp -r /home/ryes/.openclaw/workspace/pon-network-portal/* root@your-server-ip:/var/www/html/

# 或使用rsync
rsync -avz /home/ryes/.openclaw/workspace/pon-network-portal/ root@your-server-ip:/var/www/html/
```

**步骤4：配置Nginx**
```bash
sudo nano /etc/nginx/sites-available/pon-portal
```

添加配置：
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/html;
    index index.html;
    
    location / {
        try_files $uri $uri/ =404;
    }
    
    # 启用gzip压缩
    gzip on;
    gzip_types text/plain text/css application/json application/javascript;
}
```

启用配置：
```bash
sudo ln -s /etc/nginx/sites-available/pon-portal /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

**步骤5：配置域名和HTTPS**
```bash
# 安装Certbot获取免费SSL证书
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d your-domain.com
```

---

## 方案三：内网/本地服务器部署

适合：企业内部使用、局域网访问

### 使用Nginx（推荐）

**安装Nginx**
```bash
# Ubuntu
sudo apt update
sudo apt install nginx -y

# CentOS
sudo yum install epel-release -y
sudo yum install nginx -y
```

**配置网站**
```bash
# 复制网站文件
sudo cp -r /home/ryes/.openclaw/workspace/pon-network-portal/* /var/www/html/

# 设置权限
sudo chown -R www-data:www-data /var/www/html

# 启动Nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

**防火墙配置**
```bash
# 开放80端口
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw reload
```

**访问地址**
```
http://服务器IP地址/
```

---

## 方案四：Docker部署

适合：容器化环境、快速部署

**创建Dockerfile**
```dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
```

**构建并运行**
```bash
cd /home/ryes/.openclaw/workspace/pon-network-portal

# 构建镜像
docker build -t pon-portal .

# 运行容器
docker run -d -p 80:80 --name pon-portal pon-portal
```

---

## 快速部署命令（一键部署）

### 使用Surge.sh（最简单）
```bash
# 安装Surge
npm install -g surge

# 部署
cd /home/ryes/.openclaw/workspace/pon-network-portal
surge

# 按提示输入域名，如 pon-portal.surge.sh
```

---

## 推荐部署流程

### 内网部署（最快）
```bash
# 1. 安装Nginx
sudo apt install nginx -y

# 2. 复制网站文件
sudo rm -rf /var/www/html/*
sudo cp -r /home/ryes/.openclaw/workspace/pon-network-portal/* /var/www/html/

# 3. 启动服务
sudo systemctl restart nginx

# 4. 访问 http://本机IP/
```

### 公网部署（推荐Netlify）
1. 访问 https://app.netlify.com/drop
2. 将 `pon-network-portal` 文件夹压缩为zip
3. 拖拽上传到Netlify
4. 获得 `xxx.netlify.app` 域名
5. （可选）绑定自定义域名

---

## 部署检查清单

- [ ] 所有页面能正常访问
- [ ] 链接跳转正确
- [ ] 图片资源加载正常
- [ ] CSS/JS文件加载正常
- [ ] 移动端显示正常
- [ ] 配置HTTPS（生产环境）
- [ ] 配置域名（可选）

---

## 常见问题

**Q: 当前Python服务器可以一直运行吗？**
A: 不建议。Python HTTP Server是开发服务器，不适合生产环境，性能差、不安全。

**Q: 需要备案吗？**
A: 国内服务器+域名需要ICP备案。使用GitHub Pages/Netlify等海外服务不需要备案。

**Q: 如何更新网站内容？**
A: 静态托管：重新上传文件；云服务器：替换/var/www/html目录文件。
