#!/usr/bin/env python3
"""
PON Network Portal - 文件上传服务器
提供文档上传、存储、下载功能
"""

import os
import json
import uuid
from datetime import datetime
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import parse_qs, urlparse
import cgi
import io

# 配置
BASE_DIR = "/home/ryes/.openclaw/workspace/文档中心"
UPLOAD_DIR = os.path.join(BASE_DIR, "上传文档")
DOCS_METADATA_FILE = os.path.join(BASE_DIR, "docs.json")
MAX_FILE_SIZE = 50 * 1024 * 1024  # 50MB
ALLOWED_EXTENSIONS = {'.pdf', '.doc', '.docx', '.ppt', '.pptx', '.xls', '.xlsx', '.chm', '.txt', '.md'}

# 文件类型分类映射
FILE_TYPE_DIRS = {
    '.pdf': 'PDF文档',
    '.doc': 'Word文档',
    '.docx': 'Word文档',
    '.ppt': 'PPT文档',
    '.pptx': 'PPT文档',
    '.xls': 'Excel文档',
    '.xlsx': 'Excel文档',
    '.chm': 'CHM文档',
}

# 确保上传目录存在
os.makedirs(UPLOAD_DIR, exist_ok=True)
for dir_name in FILE_TYPE_DIRS.values():
    os.makedirs(os.path.join(UPLOAD_DIR, dir_name), exist_ok=True)
os.makedirs(os.path.join(UPLOAD_DIR, '其他文档'), exist_ok=True)

# 初始化文档元数据
if not os.path.exists(DOCS_METADATA_FILE):
    with open(DOCS_METADATA_FILE, 'w', encoding='utf-8') as f:
        json.dump([], f)


def get_docs_metadata():
    """获取所有文档元数据"""
    try:
        with open(DOCS_METADATA_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    except:
        return []


def save_docs_metadata(docs):
    """保存文档元数据"""
    with open(DOCS_METADATA_FILE, 'w', encoding='utf-8') as f:
        json.dump(docs, f, ensure_ascii=False, indent=2)


def allowed_file(filename):
    """检查文件类型是否允许"""
    return os.path.splitext(filename)[1].lower() in ALLOWED_EXTENSIONS


class FileHandler(BaseHTTPRequestHandler):
    """HTTP请求处理器"""
    
    def log_message(self, format, *args):
        """自定义日志格式"""
        print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] {args[0]}")
    
    def do_OPTIONS(self):
        """处理CORS预检请求"""
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
    
    def send_cors_headers(self):
        """发送CORS头"""
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
    
    def do_GET(self):
        """处理GET请求"""
        parsed_path = urlparse(self.path)
        path = parsed_path.path
        
        # 获取文档列表
        if path == '/api/docs':
            docs = get_docs_metadata()
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_cors_headers()
            self.end_headers()
            self.wfile.write(json.dumps(docs).encode())
            return
        
        # 下载文件
        if path.startswith('/api/download/'):
            doc_id = path.split('/')[-1]
            docs = get_docs_metadata()
            doc = next((d for d in docs if d['id'] == doc_id), None)
            
            if not doc:
                self.send_error(404, "文档不存在")
                return
            
            # 支持新的路径格式和旧的路径格式
            if 'storagePath' in doc:
                file_path = os.path.join(BASE_DIR, doc['storagePath'])
            elif 'fullPath' in doc:
                file_path = os.path.join(UPLOAD_DIR, doc['fullPath'])
            elif 'typeDir' in doc:
                file_path = os.path.join(UPLOAD_DIR, doc['typeDir'], doc['filename'])
            else:
                file_path = os.path.join(UPLOAD_DIR, doc['filename'])
            
            if not os.path.exists(file_path):
                self.send_error(404, "文件不存在")
                return
            
            try:
                with open(file_path, 'rb') as f:
                    file_data = f.read()
                
                self.send_response(200)
                self.send_header('Content-Type', 'application/octet-stream')
                self.send_header('Content-Disposition', f'attachment; filename="{doc["originalName"]}"')
                self.send_header('Content-Length', len(file_data))
                self.send_cors_headers()
                self.end_headers()
                self.wfile.write(file_data)
            except Exception as e:
                self.send_error(500, f"读取文件失败: {str(e)}")
            return
        
        # 其他请求返回404
        self.send_error(404, "Not Found")
    
    def do_POST(self):
        """处理POST请求（文件上传）"""
        parsed_path = urlparse(self.path)
        path = parsed_path.path
        
        if path != '/api/upload':
            self.send_error(404, "Not Found")
            return
        
        try:
            # 解析 multipart/form-data
            content_type = self.headers.get('Content-Type', '')
            if not content_type.startswith('multipart/form-data'):
                self.send_error(400, "Content-Type 必须是 multipart/form-data")
                return
            
            # 读取请求体
            content_length = int(self.headers.get('Content-Length', 0))
            if content_length > MAX_FILE_SIZE:
                self.send_error(413, f"文件太大，最大允许 {MAX_FILE_SIZE // 1024 // 1024}MB")
                return
            
            post_data = self.rfile.read(content_length)
            
            # 解析表单数据
            boundary = content_type.split('boundary=')[1].split(';')[0].strip()
            parts = post_data.split(b'--' + boundary.encode())
            
            file_data = None
            original_name = None
            title = None
            category = None
            description = None
            
            for part in parts:
                if not part or part == b'--\r\n':
                    continue
                
                # 分离头部和数据
                try:
                    headers, data = part.split(b'\r\n\r\n', 1)
                except ValueError:
                    continue
                
                headers = headers.decode('utf-8', errors='ignore')
                data = data.rstrip(b'\r\n')
                
                # 检查是否是文件字段
                if 'filename=' in headers:
                    # 提取文件名
                    filename_start = headers.find('filename="') + 10
                    filename_end = headers.find('"', filename_start)
                    original_name = headers[filename_start:filename_end]
                    
                    # 检查文件类型
                    if not allowed_file(original_name):
                        self.send_error(400, f"不支持的文件类型: {original_name}")
                        return
                    
                    file_data = data
                
                # 提取其他字段
                elif 'name="title"' in headers:
                    title = data.decode('utf-8', errors='ignore')
                elif 'name="category"' in headers:
                    category = data.decode('utf-8', errors='ignore')
                elif 'name="description"' in headers:
                    description = data.decode('utf-8', errors='ignore')
            
            if not file_data:
                self.send_error(400, "没有找到文件数据")
                return
            
            # 生成唯一ID和文件名
            doc_id = str(uuid.uuid4())[:8]
            ext = os.path.splitext(original_name)[1].lower()
            safe_name = f"{doc_id}_{original_name.replace(' ', '_')}"
            
            # 根据用户选择的分类确定存储路径
            # category 格式可能是: "厂商资料/华为" 或 "技术白皮书"
            if category and '/' in category:
                # 有子分类，如 "厂商资料/华为"
                main_cat, sub_cat = category.split('/', 1)
                storage_dir = os.path.join(BASE_DIR, main_cat, sub_cat)
                relative_path = os.path.join(main_cat, sub_cat, safe_name)
            elif category:
                # 只有主分类，如 "技术白皮书"
                storage_dir = os.path.join(BASE_DIR, category)
                relative_path = os.path.join(category, safe_name)
            else:
                # 没有分类，按文件类型归档到上传文档
                type_dir = FILE_TYPE_DIRS.get(ext, '其他文档')
                storage_dir = os.path.join(UPLOAD_DIR, type_dir)
                relative_path = os.path.join('上传文档', type_dir, safe_name)
            
            # 确保目录存在
            os.makedirs(storage_dir, exist_ok=True)
            file_path = os.path.join(storage_dir, safe_name)
            
            # 保存文件
            with open(file_path, 'wb') as f:
                f.write(file_data)
            
            # 创建文档元数据
            doc_info = {
                'id': doc_id,
                'title': title or original_name,
                'originalName': original_name,
                'filename': safe_name,
                'category': category or 'uncategorized',
                'storagePath': relative_path,
                'description': description or '',
                'size': len(file_data),
                'sizeFormatted': f"{len(file_data) / 1024:.1f} KB" if len(file_data) < 1024 * 1024 else f"{len(file_data) / 1024 / 1024:.2f} MB",
                'format': ext.upper().replace('.', ''),
                'uploadTime': datetime.now().isoformat(),
                'uploadDate': datetime.now().strftime('%Y-%m-%d')
            }
            
            # 保存元数据
            docs = get_docs_metadata()
            docs.insert(0, doc_info)  # 新文档插入开头
            save_docs_metadata(docs)
            
            # 返回成功响应
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_cors_headers()
            self.end_headers()
            self.wfile.write(json.dumps({
                'success': True,
                'message': '上传成功',
                'doc': doc_info
            }).encode())
            
            print(f"✅ 文件上传成功: {original_name} ({doc_info['sizeFormatted']})")
            
        except Exception as e:
            print(f"❌ 上传失败: {str(e)}")
            self.send_error(500, f"上传失败: {str(e)}")
    
    def do_DELETE(self):
        """处理DELETE请求（删除文档）"""
        parsed_path = urlparse(self.path)
        path = parsed_path.path
        
        if not path.startswith('/api/docs/'):
            self.send_error(404, "Not Found")
            return
        
        doc_id = path.split('/')[-1]
        docs = get_docs_metadata()
        doc = next((d for d in docs if d['id'] == doc_id), None)
        
        if not doc:
            self.send_error(404, "文档不存在")
            return
        
        try:
            # 删除文件
            if 'storagePath' in doc:
                file_path = os.path.join(BASE_DIR, doc['storagePath'])
            elif 'fullPath' in doc:
                file_path = os.path.join(UPLOAD_DIR, doc['fullPath'])
            elif 'typeDir' in doc:
                file_path = os.path.join(UPLOAD_DIR, doc['typeDir'], doc['filename'])
            else:
                file_path = os.path.join(UPLOAD_DIR, doc['filename'])
            
            if os.path.exists(file_path):
                os.remove(file_path)
            
            # 更新元数据
            docs = [d for d in docs if d['id'] != doc_id]
            save_docs_metadata(docs)
            
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_cors_headers()
            self.end_headers()
            self.wfile.write(json.dumps({
                'success': True,
                'message': '删除成功'
            }).encode())
            
            print(f"✅ 文件删除成功: {doc['originalName']}")
            
        except Exception as e:
            self.send_error(500, f"删除失败: {str(e)}")


def main():
    """主函数"""
    import socket
    
    # 获取本机IP
    hostname = socket.gethostname()
    try:
        ip = socket.getaddrinfo(hostname, None, socket.AF_INET)[0][4][0]
    except:
        ip = "127.0.0.1"
    
    port = 8888
    
    server = HTTPServer(('0.0.0.0', port), FileHandler)
    
    print("=" * 60)
    print("🚀 PON Network Portal 文件上传服务器")
    print("=" * 60)
    print(f"📁 基础目录: {BASE_DIR}")
    print(f"📂 上传目录: {UPLOAD_DIR}")
    print(f"   - PDF文档: {os.path.join(UPLOAD_DIR, 'PDF文档')}")
    print(f"   - Word文档: {os.path.join(UPLOAD_DIR, 'Word文档')}")
    print(f"   - PPT文档: {os.path.join(UPLOAD_DIR, 'PPT文档')}")
    print(f"   - Excel文档: {os.path.join(UPLOAD_DIR, 'Excel文档')}")
    print(f"   - CHM文档: {os.path.join(UPLOAD_DIR, 'CHM文档')}")
    print(f"   - 其他文档: {os.path.join(UPLOAD_DIR, '其他文档')}")
    print(f"🌐 服务地址: http://{ip}:{port}")
    print(f"🖥️  本机地址: http://localhost:{port}")
    print("=" * 60)
    print("API 端点:")
    print(f"  📥 POST http://{ip}:{port}/api/upload    - 上传文件")
    print(f"  📋 GET  http://{ip}:{port}/api/docs      - 获取文档列表")
    print(f"  📤 GET  http://{ip}:{port}/api/download/<id> - 下载文件")
    print(f"  🗑️  DELETE http://{ip}:{port}/api/docs/<id>  - 删除文档")
    print("=" * 60)
    print("按 Ctrl+C 停止服务")
    print("=" * 60)
    
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\n\n🛑 服务器已停止")
        server.shutdown()


if __name__ == '__main__':
    main()
