// 文件上传服务器 API 配置
const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
    ? 'http://localhost:8888' 
    : 'http://192.168.100.124:8888';

// 默认文档数据（示例文档）
const defaultDocs = [
    { id: 'g984', title: 'ITU-T G.984 GPON标准', category: 'standard', desc: 'GPON技术规范完整文档，包含GTC层、OMCI协议等核心技术规范。', format: 'PDF', date: '2026-03-20' },
    { id: 'g987', title: 'ITU-T G.987 XG-PON标准', category: 'standard', desc: '10G GPON技术标准，定义XG-PON和XGS-PON的物理层和TC层规范。', format: 'PDF', date: '2026-03-18' },
    { id: 'hard-slice', title: '硬切片与物理隔离技术', category: 'vendortech', desc: '华为硬切片 vs 中兴FlexE vs 华三/烽火的隔离方案对比。', format: 'PDF', date: '2026-03-22', vendors: ['华为', '华三', '中兴', '烽火'] },
    { id: 'f5g-whitepaper', title: 'F5G全光网技术白皮书', category: 'whitepaper', desc: 'ETSI F5G标准解读，技术演进路线图，应用场景分析。', format: 'PDF', date: '2026-02-28' }
];

// 获取分类名称
function getCategoryName(cat) {
    const map = {
        'standard': '📋 标准规范',
        'protocol': '🔌 协议解读',
        'tech': '🔧 关键技术',
        'vendortech': '🏭 厂商关键技术',
        'competitive': '⚔️ 竞品方案',
        'whitepaper': '📖 白皮书'
    };
    return map[cat] || cat;
}

// 获取文档图标
function getDocIcon(format) {
    const icons = {
        'PDF': '📄', 'Word': '📝', 'PPT': '📊',
        'Excel': '📈', 'CHM': '📑'
    };
    return icons[format] || '📎';
}

// 打开/关闭模态框
function openUploadModal() {
    document.getElementById('uploadModal').classList.add('active');
}

function closeUploadModal() {
    document.getElementById('uploadModal').classList.remove('active');
    document.getElementById('uploadForm').reset();
    document.getElementById('selectedFileName').textContent = '';
}

// 更新文件名显示
function updateFileName(input) {
    if (input.files && input.files[0]) {
        const file = input.files[0];
        const size = (file.size / 1024 / 1024).toFixed(2);
        document.getElementById('selectedFileName').innerHTML = 
            `✅ 已选择: <strong>${file.name}</strong> (${size} MB)`;
    }
}

// 渲染用户上传的文档
async function renderUserDocs() {
    const grid = document.getElementById('userDocsContainer');
    const countBadge = document.getElementById('userDocCount');
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/docs`);
        if (!response.ok) throw new Error('获取文档列表失败');
        
        const userDocs = await response.json();
        
        if (userDocs.length === 0) {
            grid.innerHTML = '<p style="color: var(--text-tertiary); padding: 20px;">暂无用户上传的文档</p>';
        } else {
            grid.innerHTML = userDocs.map(doc => `
                <div class="doc-card" style="border-left: 4px solid #10b981;">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                        <div class="doc-icon">${getDocIcon(doc.format)}</div>
                        <span class="doc-format ${doc.format.toLowerCase()}">${doc.format}</span>
                    </div>
                    <div class="doc-title">${doc.title}</div>
                    <div class="doc-desc">${doc.description || '暂无简介'}</div>
                    <div style="margin: 10px 0;">
                        <span class="tag tag-success">${getCategoryName(doc.category)}</span>
                    </div>
                    <div class="doc-meta">
                        <span>📅 ${doc.uploadDate}</span>
                        <span>📊 ${doc.sizeFormatted}</span>
                    </div>
                    <div style="margin-top: 15px; display: flex; gap: 10px;">
                        <a href="${API_BASE_URL}/api/download/${doc.id}" 
                           class="btn btn-primary btn-sm" 
                           style="flex: 1; text-align: center; text-decoration: none;"
                           download="${doc.originalName}">
                            ⬇️ 下载
                        </a>
                        <button class="btn btn-secondary btn-sm" onclick="viewDocServer('${doc.id}')" style="flex: 1;">
                            👁️ 预览
                        </button>
                    </div>
                    <div style="margin-top: 8px; text-align: right;">
                        <button onclick="deleteDocServer('${doc.id}')" style="background: none; border: none; color: #ef4444; cursor: pointer; font-size: 0.8rem;">
                            🗑️ 删除
                        </button>
                    </div>
                </div>
            `).join('');
        }
        
        if (countBadge) {
            countBadge.textContent = `${userDocs.length} 个文档`;
        }
    } catch (error) {
        console.error('获取文档列表失败:', error);
        grid.innerHTML = '<p style="color: #ef4444; padding: 20px;">⚠️ 无法连接到文件服务器<br>请确保服务器已启动: python3 file-server.py</p>';
    }
}

// 从服务器预览文档
async function viewDocServer(docId) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/download/${docId}`);
        if (!response.ok) throw new Error('获取文档失败');
        
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        
        // 根据文件类型处理
        if (blob.type === 'application/pdf') {
            window.open(url, '_blank');
        } else {
            alert('📄 该文件类型不支持在线预览\n\n请使用下载按钮获取文件。');
        }
    } catch (error) {
        alert('❌ 预览失败: ' + error.message);
    }
}

// 从服务器删除文档
async function deleteDocServer(docId) {
    if (!confirm('⚠️ 确定要删除这个文档吗？此操作不可恢复。')) {
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/api/docs/${docId}`, {
            method: 'DELETE'
        });

        if (!response.ok) throw new Error('删除失败');
        
        await renderUserDocs();
        alert('✅ 文档已删除');
    } catch (error) {
        alert('❌ 删除失败: ' + error.message);
    }
}

// 查看默认文档
function viewDoc(docId) {
    const doc = defaultDocs.find(d => d.id === docId);
    if (doc) {
        alert(`📄 ${doc.title}\n\n${doc.desc}\n\n📅 发布日期: ${doc.date}\n📎 格式: ${doc.format}\n\n这是示例文档。`);
    }
}

// 筛选文档
function filterDocs(category) {
    const sections = document.querySelectorAll('.category-section');
    sections.forEach(section => {
        if (category === 'all' || section.dataset.category === category) {
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    });
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    // 渲染用户文档
    renderUserDocs();
    
    // 拖拽上传
    const uploadZone = document.getElementById('uploadZone');
    if (uploadZone) {
        uploadZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadZone.classList.add('dragover');
        });
        uploadZone.addEventListener('dragleave', () => {
            uploadZone.classList.remove('dragover');
        });
        uploadZone.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadZone.classList.remove('dragover');
            const files = e.dataTransfer.files;
            if (files.length) {
                openUploadModal();
                document.getElementById('docFile').files = files;
                updateFileName(document.getElementById('docFile'));
            }
        });
    }
    
    // 表单提交
    const uploadForm = document.getElementById('uploadForm');
    if (uploadForm) {
        uploadForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const fileInput = document.getElementById('docFile');
            const title = document.getElementById('docTitle').value;
            const category = document.getElementById('docCategory').value;
            const subCategory = document.getElementById('docSubCategory');
            const desc = document.getElementById('docDesc').value;

            if (!fileInput.files || !fileInput.files[0] || !title || !category) {
                alert('❌ 请填写完整信息并选择文件');
                return;
            }

            const file = fileInput.files[0];
            const submitBtn = e.target.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // 构建完整分类路径
            let fullCategory = category;
            if (subCategory && subCategory.value) {
                fullCategory = `${category}/${subCategory.value}`;
            }
            
            try {
                submitBtn.textContent = '⏳ 上传中...';
                submitBtn.disabled = true;

                // 创建 FormData
                const formData = new FormData();
                formData.append('file', file);
                formData.append('title', title);
                formData.append('category', fullCategory);
                formData.append('description', desc || '');

                // 上传到服务器
                const response = await fetch(`${API_BASE_URL}/api/upload`, {
                    method: 'POST',
                    body: formData
                });

                if (!response.ok) {
                    const error = await response.text();
                    throw new Error(error);
                }

                const result = await response.json();
                
                alert(`✅ 文档上传成功！\n\n📄 标题: ${result.doc.title}\n📁 分类: ${fullCategory}\n📎 格式: ${result.doc.format}\n📊 大小: ${result.doc.sizeFormatted}`);
                
                closeUploadModal();
                await renderUserDocs();
            } catch (error) {
                alert('❌ 上传失败: ' + error.message);
                console.error('Upload error:', error);
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }
    
    // 分类筛选
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const category = tab.dataset.category;
            filterDocs(category);
        });
    });
    
    // 点击模态框外部关闭
    document.getElementById('uploadModal').addEventListener('click', (e) => {
        if (e.target.id === 'uploadModal') closeUploadModal();
    });
    
    console.log('📚 文档中心已加载，使用服务器存储');
});
