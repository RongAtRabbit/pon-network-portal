/**
 * 侧边导航栏组件
 */
const Sidebar = {
    init() {
        this.render();
        this.bindEvents();
        this.highlightCurrentPage();
    },
    
    render() {
        const currentPath = window.location.pathname;
        const isHome = currentPath === '/' || currentPath.endsWith('index.html');
        const isVendor = currentPath.includes('/vendors/');
        const isNews = currentPath.includes('/news/');
        const isDocs = currentPath.includes('/docs/');
        const isInsights = currentPath.includes('insights.html');
        
        // 计算基础路径
        let basePath = '';
        if (currentPath.includes('/pages/')) {
            // 计算从当前页面到根目录的路径
            // 例如：/pages/vendors/huawei/education.html -> ../../../
            const pathParts = currentPath.split('/');
            const pagesIndex = pathParts.indexOf('pages');
            if (pagesIndex >= 0) {
                const depth = pathParts.length - pagesIndex - 1; // 减去文件名
                basePath = '../'.repeat(depth);
            }
        }
        
        const sidebarHTML = `
            <!-- 侧边导航栏 -->
            <aside class="sidebar" id="sidebar">
                <div class="sidebar-header">
                    <div class="sidebar-title">
                        <span>📑</span>
                        <span>目录导航</span>
                    </div>
                </div>
                
                <nav class="sidebar-nav">
                    <!-- 首页 -->
                    <div class="sidebar-section">
                        <ul class="sidebar-menu">
                            <li class="sidebar-item">
                                <a href="${basePath}index.html" class="sidebar-link ${isHome ? 'active' : ''}">
                                    <span class="sidebar-icon">🏠</span>
                                    <span>首页</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    
                    <!-- 厂商方案 -->
                    <div class="sidebar-section">
                        <div class="sidebar-section-title">厂商方案</div>
                        <ul class="sidebar-menu">
                            <li class="sidebar-item ${isVendor && currentPath.includes('huawei') ? 'expanded' : ''}">
                                <a href="#" class="sidebar-link" onclick="Sidebar.toggleSubmenu(this); return false;">
                                    <span class="vendor-tag-sidebar huawei"></span>
                                    <span>华为 F5G</span>
                                    <span class="sidebar-arrow">▶</span>
                                </a>
                                <ul class="sidebar-submenu">
                                    <li><a href="${basePath}pages/vendors/huawei-f5g.html" class="sidebar-link">厂商首页</a></li>
                                    <li><a href="${basePath}pages/vendors/huawei/education.html" class="sidebar-link">🎓 教育方案</a></li>
                                    <li><a href="${basePath}pages/vendors/huawei/healthcare.html" class="sidebar-link">🏥 医疗方案</a></li>
                                    <li><a href="${basePath}pages/vendors/huawei/enterprise.html" class="sidebar-link">🏢 企业方案</a></li>
                                    <li><a href="${basePath}pages/vendors/huawei/documents.html" class="sidebar-link">📚 技术文档</a></li>
                                </ul>
                            </li>
                            <li class="sidebar-item ${isVendor && currentPath.includes('h3c') ? 'expanded' : ''}">
                                <a href="#" class="sidebar-link" onclick="Sidebar.toggleSubmenu(this); return false;">
                                    <span class="vendor-tag-sidebar h3c"></span>
                                    <span>华三 光网络</span>
                                    <span class="sidebar-arrow">▶</span>
                                </a>
                                <ul class="sidebar-submenu">
                                    <li><a href="${basePath}pages/vendors/h3c-optical.html" class="sidebar-link">厂商首页</a></li>
                                    <li><a href="${basePath}pages/vendors/h3c/education.html" class="sidebar-link">🎓 教育方案</a></li>
                                    <li><a href="${basePath}pages/vendors/h3c/healthcare.html" class="sidebar-link">🏥 医疗方案</a></li>
                                    <li><a href="${basePath}pages/vendors/h3c/enterprise.html" class="sidebar-link">🏢 企业方案</a></li>
                                    <li><a href="${basePath}pages/vendors/h3c/documents.html" class="sidebar-link">📚 技术文档</a></li>
                                </ul>
                            </li>
                            <li class="sidebar-item ${isVendor && currentPath.includes('zte') ? 'expanded' : ''}">
                                <a href="#" class="sidebar-link" onclick="Sidebar.toggleSubmenu(this); return false;">
                                    <span class="vendor-tag-sidebar zte"></span>
                                    <span>中兴 PON</span>
                                    <span class="sidebar-arrow">▶</span>
                                </a>
                                <ul class="sidebar-submenu">
                                    <li><a href="${basePath}pages/vendors/zte-pon.html" class="sidebar-link">厂商首页</a></li>
                                    <li><a href="${basePath}pages/vendors/zte/education.html" class="sidebar-link">🎓 教育方案</a></li>
                                    <li><a href="${basePath}pages/vendors/zte/healthcare.html" class="sidebar-link">🏥 医疗方案</a></li>
                                    <li><a href="${basePath}pages/vendors/zte/enterprise.html" class="sidebar-link">🏢 企业方案</a></li>
                                    <li><a href="${basePath}pages/vendors/zte/documents.html" class="sidebar-link">📚 技术文档</a></li>
                                </ul>
                            </li>
                            <li class="sidebar-item ${isVendor && currentPath.includes('fiberhome') ? 'expanded' : ''}">
                                <a href="#" class="sidebar-link" onclick="Sidebar.toggleSubmenu(this); return false;">
                                    <span class="vendor-tag-sidebar fiberhome"></span>
                                    <span>烽火 PON</span>
                                    <span class="sidebar-arrow">▶</span>
                                </a>
                                <ul class="sidebar-submenu">
                                    <li><a href="${basePath}pages/vendors/fiberhome-pon.html" class="sidebar-link">厂商首页</a></li>
                                    <li><a href="${basePath}pages/vendors/fiberhome/education.html" class="sidebar-link">🎓 教育方案</a></li>
                                    <li><a href="${basePath}pages/vendors/fiberhome/healthcare.html" class="sidebar-link">🏥 医疗方案</a></li>
                                    <li><a href="${basePath}pages/vendors/fiberhome/enterprise.html" class="sidebar-link">🏢 企业方案</a></li>
                                    <li><a href="${basePath}pages/vendors/fiberhome/documents.html" class="sidebar-link">📚 技术文档</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    
                    <!-- 行业场景 -->
                    <div class="sidebar-section">
                        <div class="sidebar-section-title">行业场景</div>
                        <ul class="sidebar-menu">
                            <li class="sidebar-item">
                                <a href="#" class="sidebar-link" onclick="Sidebar.toggleSubmenu(this); return false;">
                                    <span class="sidebar-icon">🎓</span>
                                    <span>智慧教育</span>
                                    <span class="sidebar-arrow">▶</span>
                                </a>
                                <ul class="sidebar-submenu">
                                    <li><a href="${basePath}pages/vendors/huawei/education.html" class="sidebar-link"><span class="vendor-tag-sidebar huawei"></span>华为</a></li>
                                    <li><a href="${basePath}pages/vendors/h3c/education.html" class="sidebar-link"><span class="vendor-tag-sidebar h3c"></span>华三</a></li>
                                    <li><a href="${basePath}pages/vendors/zte/education.html" class="sidebar-link"><span class="vendor-tag-sidebar zte"></span>中兴</a></li>
                                    <li><a href="${basePath}pages/vendors/fiberhome/education.html" class="sidebar-link"><span class="vendor-tag-sidebar fiberhome"></span>烽火</a></li>
                                </ul>
                            </li>
                            <li class="sidebar-item">
                                <a href="#" class="sidebar-link" onclick="Sidebar.toggleSubmenu(this); return false;">
                                    <span class="sidebar-icon">🏥</span>
                                    <span>智慧医疗</span>
                                    <span class="sidebar-arrow">▶</span>
                                </a>
                                <ul class="sidebar-submenu">
                                    <li><a href="${basePath}pages/vendors/huawei/healthcare.html" class="sidebar-link"><span class="vendor-tag-sidebar huawei"></span>华为</a></li>
                                    <li><a href="${basePath}pages/vendors/h3c/healthcare.html" class="sidebar-link"><span class="vendor-tag-sidebar h3c"></span>华三</a></li>
                                    <li><a href="${basePath}pages/vendors/zte/healthcare.html" class="sidebar-link"><span class="vendor-tag-sidebar zte"></span>中兴</a></li>
                                    <li><a href="${basePath}pages/vendors/fiberhome/healthcare.html" class="sidebar-link"><span class="vendor-tag-sidebar fiberhome"></span>烽火</a></li>
                                </ul>
                            </li>
                            <li class="sidebar-item">
                                <a href="#" class="sidebar-link" onclick="Sidebar.toggleSubmenu(this); return false;">
                                    <span class="sidebar-icon">🏢</span>
                                    <span>智慧企业</span>
                                    <span class="sidebar-arrow">▶</span>
                                </a>
                                <ul class="sidebar-submenu">
                                    <li><a href="${basePath}pages/vendors/huawei/enterprise.html" class="sidebar-link"><span class="vendor-tag-sidebar huawei"></span>华为</a></li>
                                    <li><a href="${basePath}pages/vendors/h3c/enterprise.html" class="sidebar-link"><span class="vendor-tag-sidebar h3c"></span>华三</a></li>
                                    <li><a href="${basePath}pages/vendors/zte/enterprise.html" class="sidebar-link"><span class="vendor-tag-sidebar zte"></span>中兴</a></li>
                                    <li><a href="${basePath}pages/vendors/fiberhome/enterprise.html" class="sidebar-link"><span class="vendor-tag-sidebar fiberhome"></span>烽火</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    
                    <!-- 其他模块 -->
                    <div class="sidebar-section">
                        <div class="sidebar-section-title">其他</div>
                        <ul class="sidebar-menu">
                            <li class="sidebar-item">
                                <a href="${basePath}pages/news/index.html" class="sidebar-link ${isNews ? 'active' : ''}">
                                    <span class="sidebar-icon">📰</span>
                                    <span>最新资讯</span>
                                </a>
                            </li>
                            <li class="sidebar-item">
                                <a href="${basePath}pages/docs/center.html" class="sidebar-link ${isDocs ? 'active' : ''}">
                                    <span class="sidebar-icon">📚</span>
                                    <span>技术文档</span>
                                </a>
                            </li>
                            <li class="sidebar-item">
                                <a href="${basePath}insights.html" class="sidebar-link ${isInsights ? 'active' : ''}">
                                    <span class="sidebar-icon">🔮</span>
                                    <span>技术洞察</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </aside>
            
            <!-- 移动端遮罩 -->
            <div class="sidebar-overlay" id="sidebarOverlay" onclick="Sidebar.close()"></div>
            
            <!-- 移动端切换按钮 -->
            <button class="sidebar-toggle" id="sidebarToggle" onclick="Sidebar.toggle()">☰</button>
        `;
        
        // 插入到body开头
        document.body.insertAdjacentHTML('afterbegin', sidebarHTML);
        document.body.classList.add('has-sidebar');
    },
    
    bindEvents() {
        // 点击页面其他地方关闭移动端侧边栏
        document.addEventListener('click', (e) => {
            const sidebar = document.getElementById('sidebar');
            const toggle = document.getElementById('sidebarToggle');
            
            if (window.innerWidth <= 1024 && 
                sidebar && sidebar.classList.contains('open') &&
                !sidebar.contains(e.target) && 
                !toggle.contains(e.target)) {
                this.close();
            }
        });
    },
    
    toggleSubmenu(element) {
        const item = element.parentElement;
        item.classList.toggle('expanded');
    },
    
    toggle() {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebarOverlay');
        
        if (sidebar) {
            sidebar.classList.toggle('open');
            if (overlay) overlay.classList.toggle('show');
        }
    },
    
    close() {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebarOverlay');
        
        if (sidebar) sidebar.classList.remove('open');
        if (overlay) overlay.classList.remove('show');
    },
    
    highlightCurrentPage() {
        const currentPath = window.location.pathname;
        const links = document.querySelectorAll('.sidebar-link');
        
        links.forEach(link => {
            const href = link.getAttribute('href');
            if (href && currentPath.includes(href.replace(/^\.\.\//, '').replace(/^\//, ''))) {
                link.classList.add('active');
                // 展开父菜单
                const parentItem = link.closest('.sidebar-item');
                if (parentItem) parentItem.classList.add('expanded');
            }
        });
    }
};

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    Sidebar.init();
});
