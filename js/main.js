/**
 * PON Network Portal - 主程序
 */

// ========================================
// 应用初始化
// ========================================
const App = {
    init() {
        this.initStats();
        this.initNewsPreview();
        this.initLastUpdate();
        console.log('🌐 PON Network Portal 已加载');
    },
    
    // 初始化统计数据
    initStats() {
        const newsCountEl = document.getElementById('newsCount');
        if (newsCountEl && typeof DataAPI !== 'undefined') {
            const count = DataAPI.getWeeklyNewsCount();
            newsCountEl.textContent = count;
        }
    },
    
    // 初始化资讯预览
    initNewsPreview() {
        const container = document.getElementById('newsPreview');
        if (!container || typeof DataAPI === 'undefined' || typeof Components === 'undefined') return;
        
        // 模拟加载延迟
        setTimeout(() => {
            const news = DataAPI.getNews({ limit: 2 });
            if (news.length > 0) {
                container.innerHTML = news.map(n => `
                    <div class="news-card-item" style="padding: var(--spacing-3);">
                        <div class="news-content" style="margin-left: 0;">
                            <a href="pages/news/detail.html?id=${n.id}" class="news-title" style="font-size: 0.9rem;">${n.title}</a>
                            <div class="news-meta" style="font-size: 0.8rem;">
                                <span>${n.date}</span>
                                <span class="tag tag-primary" style="font-size: 0.7rem;">${n.category}</span>
                            </div>
                        </div>
                    </div>
                `).join('');
            } else {
                container.innerHTML = '<p style="color: var(--text-tertiary); text-align: center;">暂无最新资讯</p>';
            }
        }, 500);
    },
    
    // 初始化最后更新时间
    initLastUpdate() {
        const el = document.getElementById('lastUpdate');
        if (el) {
            const now = new Date();
            el.textContent = now.toLocaleDateString('zh-CN');
        }
    }
};

// ========================================
// 页面加载完成后初始化
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});

// ========================================
// 工具函数
// ========================================
const Utils = {
    // 格式化日期
    formatDate(date, format = 'YYYY-MM-DD') {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        
        return format
            .replace('YYYY', year)
            .replace('MM', month)
            .replace('DD', day);
    },
    
    // 截断文本
    truncate(text, length = 100) {
        if (text.length <= length) return text;
        return text.substring(0, length) + '...';
    },
    
    // 防抖函数
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // 复制到剪贴板
    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (err) {
            console.error('复制失败:', err);
            return false;
        }
    },
    
    // 平滑滚动到元素
    scrollToElement(selector, offset = 80) {
        const element = document.querySelector(selector);
        if (element) {
            const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    },
    
    // 存储本地数据
    storage: {
        get(key, defaultValue = null) {
            try {
                const item = localStorage.getItem(key);
                return item ? JSON.parse(item) : defaultValue;
            } catch (e) {
                return defaultValue;
            }
        },
        
        set(key, value) {
            try {
                localStorage.setItem(key, JSON.stringify(value));
                return true;
            } catch (e) {
                return false;
            }
        },
        
        remove(key) {
            localStorage.removeItem(key);
        }
    }
};

// ========================================
// 资讯收集模块（预留接口）
// ========================================
const NewsCollector = {
    // 收集资讯（实际项目中应调用后端API或爬虫服务）
    async collect() {
        console.log('开始收集最新资讯...');
        
        // 模拟API调用
        // 实际实现:
        // const response = await fetch('/api/news/collect');
        // const news = await response.json();
        
        return {
            success: true,
            message: '资讯收集完成',
            count: 5,
            timestamp: new Date().toISOString()
        };
    },
    
    // 获取上次更新时间
    getLastUpdateTime() {
        return Utils.storage.get('news_last_update');
    },
    
    // 检查是否需要更新
    shouldUpdate() {
        const lastUpdate = this.getLastUpdateTime();
        if (!lastUpdate) return true;
        
        const now = new Date();
        const last = new Date(lastUpdate);
        const hoursSinceLastUpdate = (now - last) / (1000 * 60 * 60);
        
        // 如果超过7天未更新，需要更新
        return hoursSinceLastUpdate > 24 * 7;
    },
    
    // 定时任务检查（每周五）
    checkScheduledUpdate() {
        const now = new Date();
        const dayOfWeek = now.getDay(); // 5 = Friday
        
        if (dayOfWeek === 5) {
            console.log('今天是周五，检查资讯更新...');
            if (this.shouldUpdate()) {
                this.collect().then(result => {
                    if (result.success) {
                        Utils.storage.set('news_last_update', now.toISOString());
                    }
                });
            }
        }
    }
};

// ========================================
// 文档编辑模块
// ========================================
const DocEditor = {
    // 加载文档
    load(category, sectionId) {
        if (typeof DOCS_DATA === 'undefined') return null;
        
        const doc = DOCS_DATA[category];
        if (!doc) return null;
        
        const section = doc.sections.find(s => s.id === sectionId);
        return section || null;
    },
    
    // 保存文档（实际项目中应调用后端API）
    async save(category, sectionId, content) {
        console.log('保存文档:', { category, sectionId, content });
        
        // 保存到本地存储（演示用途）
        const key = `doc_${category}_${sectionId}`;
        Utils.storage.set(key, {
            content,
            updatedAt: new Date().toISOString()
        });
        
        return { success: true, message: '文档已保存' };
    },
    
    // 获取已保存的内容
    getSavedContent(category, sectionId) {
        const key = `doc_${category}_${sectionId}`;
        return Utils.storage.get(key);
    }
};

// 导出模块（用于Node.js环境）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { App, Utils, NewsCollector, DocEditor };
}
