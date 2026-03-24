# 文件上传服务器配置

## 启动文件服务器

```bash
cd /home/ryes/.openclaw/workspace/pon-network-portal

# 启动文件上传服务器
python3 file-server.py
```

服务将在端口 8888 启动。

## API 接口

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/api/upload` | 上传文件 |
| GET | `/api/docs` | 获取文档列表 |
| GET | `/api/download/<id>` | 下载文件 |
| DELETE | `/api/docs/<id>` | 删除文档 |

## 配置

- **上传目录**: `uploads/`
- **元数据文件**: `uploads/docs.json`
- **最大文件大小**: 50MB
- **支持的格式**: PDF, Word, PPT, Excel, CHM, TXT, MD

## 与网站集成

文件服务器需要与网站一起运行：

```bash
# 终端 1: 启动文件服务器
python3 file-server.py

# 终端 2: 启动网站服务器
./server.sh start
```

然后访问网站上传文件，文件将保存到服务器而非浏览器本地存储。
