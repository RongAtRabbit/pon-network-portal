// 权限管理模块
const AUTH_CONFIG = {
    // 默认管理员账号（实际生产环境应该在服务器端配置）
    adminUsername: 'admin',
    adminPassword: 'admin123', // 简单示例，实际应该加密
    sessionTimeout: 24 * 60 * 60 * 1000 // 24小时
};

// 检查是否已登录
function isLoggedIn() {
    const session = localStorage.getItem('pon_portal_session');
    if (!session) return false;
    
    try {
        const sessionData = JSON.parse(session);
        // 检查会话是否过期
        if (Date.now() - sessionData.loginTime > AUTH_CONFIG.sessionTimeout) {
            logout();
            return false;
        }
        return sessionData.isAdmin === true;
    } catch {
        return false;
    }
}

// 获取当前用户信息
function getCurrentUser() {
    const session = localStorage.getItem('pon_portal_session');
    if (!session) return null;
    
    try {
        return JSON.parse(session);
    } catch {
        return null;
    }
}

// 登录
function login(username, password) {
    if (username === AUTH_CONFIG.adminUsername && password === AUTH_CONFIG.adminPassword) {
        const session = {
            username: username,
            isAdmin: true,
            loginTime: Date.now()
        };
        localStorage.setItem('pon_portal_session', JSON.stringify(session));
        return { success: true, message: '登录成功' };
    }
    return { success: false, message: '用户名或密码错误' };
}

// 登出
function logout() {
    localStorage.removeItem('pon_portal_session');
    window.location.reload();
}

// 显示登录模态框
function showLoginModal() {
    const modal = document.createElement('div');
    modal.id = 'loginModal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    `;
    
    modal.innerHTML = `
        <div style="
            background: white;
            padding: 40px;
            border-radius: 12px;
            width: 90%;
            max-width: 400px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        ">
            <div style="text-align: center; margin-bottom: 30px;">
                <div style="font-size: 3rem; margin-bottom: 10px;">🔐</div>
                <h2 style="margin: 0; color: var(--text-primary);">管理员登录</h2>
                <p style="color: var(--text-secondary); margin-top: 10px; font-size: 0.9rem;">请输入管理员账号密码</p>
            </div>
            
            <div id="loginError" style="color: #ef4444; margin-bottom: 15px; text-align: center; display: none;"></div>
            
            <div style="margin-bottom: 20px;">
                <label style="display: block; margin-bottom: 8px; font-weight: 500;">用户名</label>
                <input type="text" id="loginUsername" style="
                    width: 100%;
                    padding: 12px;
                    border: 1px solid var(--gray-300);
                    border-radius: 8px;
                    font-size: 1rem;
                " placeholder="输入用户名">
            </div>
            
            <div style="margin-bottom: 25px;">
                <label style="display: block; margin-bottom: 8px; font-weight: 500;">密码</label>
                <input type="password" id="loginPassword" style="
                    width: 100%;
                    padding: 12px;
                    border: 1px solid var(--gray-300);
                    border-radius: 8px;
                    font-size: 1rem;
                " placeholder="输入密码">
            </div>
            
            <div style="display: flex; gap: 15px;">
                <button onclick="closeLoginModal()" style="
                    flex: 1;
                    padding: 12px;
                    border: 1px solid var(--gray-300);
                    background: white;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: 500;
                ">取消</button>
                
                <button onclick="handleLogin()" style="
                    flex: 1;
                    padding: 12px;
                    border: none;
                    background: var(--primary);
                    color: white;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: 500;
                ">登录</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // 点击模态框外部关闭
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeLoginModal();
    });
    
    // 回车键登录
    modal.querySelector('#loginPassword').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleLogin();
    });
}

// 关闭登录模态框
function closeLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) modal.remove();
}

// 处理登录
function handleLogin() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const errorDiv = document.getElementById('loginError');
    
    if (!username || !password) {
        errorDiv.textContent = '请输入用户名和密码';
        errorDiv.style.display = 'block';
        return;
    }
    
    const result = login(username, password);
    
    if (result.success) {
        closeLoginModal();
        window.location.reload();
    } else {
        errorDiv.textContent = result.message;
        errorDiv.style.display = 'block';
    }
}

// 检查权限并显示/隐藏功能
function checkPermissions() {
    const isAdmin = isLoggedIn();
    const user = getCurrentUser();
    
    // 添加上传按钮（仅管理员可见）
    const uploadButtons = document.querySelectorAll('.admin-only');
    uploadButtons.forEach(btn => {
        btn.style.display = isAdmin ? 'block' : 'none';
    });
    
    // 显示用户状态栏
    updateUserStatusBar(isAdmin, user);
}

// 更新用户状态栏
function updateUserStatusBar(isAdmin, user) {
    let statusBar = document.getElementById('userStatusBar');
    
    if (!statusBar) {
        statusBar = document.createElement('div');
        statusBar.id = 'userStatusBar';
        statusBar.style.cssText = `
            position: fixed;
            top: 70px;
            right: 20px;
            background: white;
            padding: 10px 20px;
            border-radius: 20px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            z-index: 100;
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 0.9rem;
        `;
        document.body.appendChild(statusBar);
    }
    
    if (isAdmin && user) {
        statusBar.innerHTML = `
            <span style="color: #10b981;">👤 ${user.username} (管理员)</span>
            <button onclick="logout()" style="
                background: none;
                border: none;
                color: #ef4444;
                cursor: pointer;
                font-size: 0.85rem;
                padding: 0;
            ">退出</button>
        `;
    } else {
        statusBar.innerHTML = `
            <span style="color: var(--text-secondary);">👤 访客（只读）</span>
            <button onclick="showLoginModal()" style="
                background: var(--primary);
                color: white;
                border: none;
                padding: 5px 15px;
                border-radius: 15px;
                cursor: pointer;
                font-size: 0.85rem;
            ">登录</button>
        `;
    }
}

// 保护功能（需要管理员权限）
function requireAdmin(callback) {
    if (isLoggedIn()) {
        callback();
    } else {
        showLoginModal();
        // 保存回调，登录成功后执行
        window._pendingCallback = callback;
    }
}

// 初始化权限管理
document.addEventListener('DOMContentLoaded', () => {
    checkPermissions();
    
    // 如果有待执行的回调（登录后）
    if (window._pendingCallback && isLoggedIn()) {
        window._pendingCallback();
        window._pendingCallback = null;
    }
});

// 导出函数供其他脚本使用
window.Auth = {
    isLoggedIn,
    getCurrentUser,
    login,
    logout,
    showLoginModal,
    requireAdmin,
    checkPermissions
};
