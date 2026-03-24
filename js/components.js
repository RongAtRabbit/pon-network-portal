/**
 * PON Network Portal - 组件库
 * 可复用的UI组件
 */

const Components = {
    // ========================================
    // 导航组件
    // ========================================
    Navbar: {
        init() {
            const toggle = document.getElementById('navToggle');
            const menu = document.getElementById('navMenu');
            
            if (toggle && menu) {
                toggle.addEventListener('click', () => {
                    menu.classList.toggle('active');
                });
                
                // 下拉菜单移动端支持
                const dropdowns = document.querySelectorAll('.nav-dropdown');
                dropdowns.forEach(dropdown => {
                    const link = dropdown.querySelector('.nav-link');
                    link.addEventListener('click', (e) => {
                        if (window.innerWidth <= 768) {
                            e.preventDefault();
                            dropdown.classList.toggle('active');
                        }
                    });
                });
            }
        }
    },
    
    // ========================================
    // 资讯卡片组件
    // ========================================
    NewsCard: {
        render(news) {
            const date = new Date(news.date);
            const day = date.getDate();
            const month = date.toLocaleString('zh-CN', { month: 'short' });
            
            // 链接到详情页
            const detailUrl = `detail.html?id=${news.id}`;
            
            // 数据来源链接
            const sourceLink = news.sourceUrl ? 
                `<a href="${news.sourceUrl}" target="_blank" class="news-source-link" onclick="event.stopPropagation();" title="查看原始报道">
                    📰 ${news.source} ↗
                </a>` : 
                `<span class="news-source">📰 ${news.source}</span>`;
            
            return `
                <article class="news-card-item" data-id="${news.id}" onclick="window.location.href='${detailUrl}'" style="cursor: pointer;">
                    <div class="news-date">
                        <span class="day">${day}</span>
                        <span class="month">${month}</span>
                    </div>
                    <div class="news-content">
                        <a href="${detailUrl}" class="news-title" onclick="event.stopPropagation();">${news.title}</a>
                        <div class="news-meta">
                            ${sourceLink}
                            <span class="tag tag-primary">${news.category}</span>
                        </div>
                        <p class="news-summary">${news.summary}</p>
                        <div class="news-tags">
                            ${news.tags.map(tag => `<span class="product-spec">#${tag}</span>`).join('')}
                        </div>
                    </div>
                </article>
            `;
        },
        
        renderList(newsList, container) {
            if (!container) return;
            
            if (newsList.length === 0) {
                container.innerHTML = '<p class="text-center">暂无资讯</p>';
                return;
            }
            
            container.innerHTML = newsList.map(news => this.render(news)).join('');
        }
    },
    
    // ========================================
    // 产品规格表格组件
    // ========================================
    SpecTable: {
        render(specs) {
            const rows = Object.entries(specs).map(([key, value]) => `
                <tr>
                    <td class="spec-name">${key}</td>
                    <td class="spec-value">${value}</td>
                </tr>
            `).join('');
            
            return `
                <table class="spec-table">
                    <tbody>${rows}</tbody>
                </table>
            `;
        }
    },
    
    // ========================================
    // 产品卡片组件
    // ========================================
    ProductCard: {
        render(product) {
            return `
                <div class="product-card">
                    <div class="product-image">
                        🔧
                    </div>
                    <div class="product-info">
                        <h4 class="product-name">${product.name}</h4>
                        <p class="product-desc">${product.description}</p>
                        <span class="tag tag-info">${product.type}</span>
                        <div class="product-specs">
                            ${Object.entries(product.specs).slice(0, 3).map(([k, v]) => 
                                `<span class="product-spec">${k}: ${v}</span>`
                            ).join('')}
                        </div>
                    </div>
                </div>
            `;
        }
    },
    
    // ========================================
    // 方案介绍组件
    // ========================================
    SolutionSection: {
        render(vendor) {
            const productsHtml = vendor.products.map(p => 
                Components.ProductCard.render(p)
            ).join('');
            
            const solutionsHtml = vendor.solutions.map(s => `
                <div class="card">
                    <div class="card-body">
                        <h4>${s.name}</h4>
                        <p><strong>目标客户:</strong> ${s.target}</p>
                        <p>${s.description}</p>
                    </div>
                </div>
            `).join('');
            
            return `
                <section class="solution-section">
                    <div class="solution-header">
                        <div class="solution-logo" style="background: ${vendor.color}">
                            ${vendor.logo}
                        </div>
                        <div class="solution-title">
                            <h2>${vendor.fullName}</h2>
                            <p>${vendor.description}</p>
                        </div>
                    </div>
                    
                    <div class="solution-content">
                        <div class="solution-main">
                            <h3>🎯 核心特性</h3>
                            <ul>
                                ${vendor.features.map(f => `<li>${f}</li>`).join('')}
                            </ul>
                            
                            <h3>📦 主要产品</h3>
                            <div class="product-grid">
                                ${productsHtml}
                            </div>
                        </div>
                        
                        <div class="solution-side">
                            <h3>💼 解决方案</h3>
                            ${solutionsHtml}
                            
                            <div class="card" style="margin-top: var(--spacing-6)">
                                <div class="card-body">
                                    <h4>🔗 官方资源</h4>
                                    <p><a href="${vendor.website}" target="_blank">官方网站 →</a></p>
                                    <p><a href="${vendor.docsUrl}" target="_blank">技术文档 →</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            `;
        }
    },
    
    // ========================================
    // 面包屑导航
    // ========================================
    Breadcrumb: {
        render(items) {
            const html = items.map((item, index) => {
                if (index === items.length - 1) {
                    return `<span class="breadcrumb-current">${item.label}</span>`;
                }
                return `<a href="${item.url}">${item.label}</a> <span class="breadcrumb-separator">/</span>`;
            }).join('');
            
            return `<nav class="breadcrumb">${html}</nav>`;
        }
    },
    
    // ========================================
    // 分页组件
    // ========================================
    Pagination: {
        render(currentPage, totalPages, onPageChange) {
            let html = '';
            
            // 上一页
            html += `
                <button class="pagination-btn" ${currentPage === 1 ? 'disabled' : ''} 
                        onclick="${onPageChange}(${currentPage - 1})">
                    ←
                </button>
            `;
            
            // 页码
            for (let i = 1; i <= totalPages; i++) {
                if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
                    html += `
                        <button class="pagination-btn ${i === currentPage ? 'active' : ''}"
                                onclick="${onPageChange}(${i})">
                            ${i}
                        </button>
                    `;
                } else if (i === currentPage - 2 || i === currentPage + 2) {
                    html += `<span class="pagination-btn" disabled>...</span>`;
                }
            }
            
            // 下一页
            html += `
                <button class="pagination-btn" ${currentPage === totalPages ? 'disabled' : ''}
                        onclick="${onPageChange}(${currentPage + 1})">
                    →
                </button>
            `;
            
            return `<div class="pagination">${html}</div>`;
        }
    },
    
    // ========================================
    // 搜索框组件
    // ========================================
    SearchBox: {
        render(placeholder = '搜索...', onSearch) {
            return `
                <div class="search-box">
                    <span class="search-icon">🔍</span>
                    <input type="text" 
                           class="search-input" 
                           placeholder="${placeholder}"
                           onkeyup="${onSearch}(this.value)">
                </div>
            `;
        }
    },
    
    // ========================================
    // 加载状态
    // ========================================
    Loading: {
        render() {
            return `<div class="loading-spinner"></div>`;
        }
    },
    
    // ========================================
    // 提示框
    // ========================================
    Alert: {
        render(type, message) {
            const icons = {
                success: '✅',
                warning: '⚠️',
                danger: '❌',
                info: 'ℹ️'
            };
            
            return `
                <div class="alert alert-${type}">
                    ${icons[type] || ''} ${message}
                </div>
            `;
        }
    },
    
    // ========================================
    // 富文本编辑器
    // ========================================
    Editor: {
        init(containerId) {
            const container = document.getElementById(containerId);
            if (!container) return;
            
            container.innerHTML = `
                <div class="editor-container">
                    <div class="editor-toolbar">
                        <button class="toolbar-btn" data-cmd="bold"><b>B</b></button>
                        <button class="toolbar-btn" data-cmd="italic"><i>I</i></button>
                        <button class="toolbar-btn" data-cmd="underline"><u>U</u></button>
                        <span class="toolbar-separator"></span>
                        <button class="toolbar-btn" data-cmd="insertUnorderedList">• 列表</button>
                        <button class="toolbar-btn" data-cmd="insertOrderedList">1. 列表</button>
                        <span class="toolbar-separator"></span>
                        <button class="toolbar-btn" data-cmd="formatBlock" data-value="H2">H2</button>
                        <button class="toolbar-btn" data-cmd="formatBlock" data-value="H3">H3</button>
                    </div>
                    <div class="editor-content" contenteditable="true">
                        <p>在此输入内容...</p>
                    </div>
                    <div class="editor-footer">
                        <span class="editor-status">就绪</span>
                        <button class="btn btn-primary btn-sm" onclick="Components.Editor.save()">保存</button>
                    </div>
                </div>
            `;
            
            // 绑定工具栏按钮
            container.querySelectorAll('.toolbar-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const cmd = btn.dataset.cmd;
                    const value = btn.dataset.value;
                    document.execCommand(cmd, false, value);
                });
            });
            
            // 自动保存状态更新
            const content = container.querySelector('.editor-content');
            const status = container.querySelector('.editor-status');
            
            content.addEventListener('input', () => {
                status.textContent = '编辑中...';
                clearTimeout(this.saveTimeout);
                this.saveTimeout = setTimeout(() => {
                    status.textContent = '已自动保存';
                }, 1000);
            });
        },
        
        getContent() {
            const content = document.querySelector('.editor-content');
            return content ? content.innerHTML : '';
        },
        
        setContent(html) {
            const content = document.querySelector('.editor-content');
            if (content) content.innerHTML = html;
        },
        
        save() {
            const content = this.getContent();
            // 这里可以发送到服务器
            console.log('保存内容:', content);
            alert('内容已保存！');
        }
    }
};

// 初始化所有组件
document.addEventListener('DOMContentLoaded', () => {
    Components.Navbar.init();
});
