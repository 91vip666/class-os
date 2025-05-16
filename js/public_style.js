/**
 * Class OS 公共样式加载脚本
 * 用于加载导航栏和页脚等公共组件
 */

document.addEventListener('DOMContentLoaded', function() {
    // 创建导航栏
    const header = document.getElementById('header');
    if (header) {
        const nav = document.createElement('nav');
        nav.className = 'fixed top-0 left-0 right-0 z-50 glass-effect border-b border-gray-200';
        nav.innerHTML = `
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between h-16 items-center">
                    <div class="flex items-center">
                        <span class="text-2xl font-['Pacifico'] text-primary">CO</span>
                    </div>
                    <div class="hidden md:flex space-x-8">
                        <a href="index.html" class="nav-link text-gray-700 hover:text-primary transition-colors">首页</a>
                        <a href="docs-user.html" class="nav-link text-gray-700 hover:text-primary transition-colors">使用文档</a>
                        <a href="docs-dev.html" class="nav-link text-gray-700 hover:text-primary transition-colors">开发文档</a>
                        <a href="#" class="download-link text-gray-700 hover:text-primary transition-colors">下载</a>
                        <a href="#" id="nav-community" class="text-gray-700 hover:text-primary transition-colors">社区</a>
                    </div>
                    <div class="flex items-center space-x-4">
                        
                        <!-- 移动端菜单按钮 -->
                        <button class="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors" title="菜单" id="mobile-menu-button">
                            <i class="ri-menu-line text-gray-600"></i>
                        </button>
                    </div>
                </div>
            </div>
            <!-- 移动端菜单 -->
            <div class="md:hidden mobile-menu hidden" id="mobile-menu">
                <div class="glass-effect py-2 px-4 mt-1 mx-4 rounded-lg shadow-lg">
                    <a href="index.html" class="nav-link block py-2 text-gray-700 hover:text-primary transition-colors">首页</a>
                    <a href="docs-user.html" class="nav-link block py-2 text-gray-700 hover:text-primary transition-colors">使用文档</a>
                    <a href="docs-dev.html" class="nav-link block py-2 text-gray-700 hover:text-primary transition-colors">开发文档</a>
                    <a href="#" class="download-link block py-2 text-gray-700 hover:text-primary transition-colors">下载</a>
                    <a href="#" id="nav-community-mobile" class="block py-2 text-gray-700 hover:text-primary transition-colors">社区</a>
                </div>
            </div>
        `;
        header.appendChild(nav);
        
        // 移动端菜单的显示和隐藏
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (mobileMenuButton && mobileMenu) {
            mobileMenuButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
                
                // 切换图标
                const icon = mobileMenuButton.querySelector('i');
                if (mobileMenu.classList.contains('hidden')) {
                    icon.className = 'ri-menu-line text-gray-600';
                } else {
                    icon.className = 'ri-close-line text-gray-600';
                }
            });
            
            // 点击页面其他区域关闭菜单
            document.addEventListener('click', (e) => {
                if (!mobileMenuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
                    mobileMenu.classList.add('hidden');
                    mobileMenuButton.querySelector('i').className = 'ri-menu-line text-gray-600';
                }
            });
            
            // 点击移动端菜单中的社区链接
            const navCommunityMobile = document.getElementById('nav-community-mobile');
            if (navCommunityMobile) {
                navCommunityMobile.addEventListener('click', function(e) {
                    e.preventDefault();
                    // 关闭移动菜单
                    mobileMenu.classList.add('hidden');
                    mobileMenuButton.querySelector('i').className = 'ri-menu-line text-gray-600';
                    
                    // 在新标签页中打开网页
                    window.open('https://github.com/classos', '_blank');
                    
                    // 触发页面底部"加入社区"按钮的点击事件
                    const joinCommunityBtn = document.getElementById('join-community');
                    if (joinCommunityBtn) {
                        joinCommunityBtn.click();
                    }
                });
            }
        }
    }

    // 创建页脚
    const footer = document.getElementById('footer');
    if (footer) {
        footer.className = 'glass-effect mt-16 py-6';
        footer.innerHTML = `
            <div class="max-w-7xl mx-auto px-4 text-center text-gray-600">
                <p>© 2025 Class OS. 你们知道吗？什么不会吧？真的吗？Class OS是Evan开发的✪ ω ✪</p>
            </div>
        `;
    }

    // 设置深色模式
    document.body.classList.add('dark-mode');
    document.body.style.background = 'linear-gradient(to bottom right, #111827, #1e293b)';
    
    // 处理下载链接
    document.querySelectorAll('.download-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (window.location.pathname.includes('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/')) {
                // 如果在首页，直接滚动到下载区域
                const downloadSection = document.getElementById('download-section');
                if (downloadSection) {
                    // 如果是移动菜单中的链接，先关闭菜单
                    if (this.closest('.mobile-menu')) {
                        const mobileMenu = document.getElementById('mobile-menu');
                        const mobileMenuButton = document.getElementById('mobile-menu-button');
                        if (mobileMenu && mobileMenuButton) {
                            mobileMenu.classList.add('hidden');
                            mobileMenuButton.querySelector('i').className = 'ri-menu-line text-gray-600';
                        }
                    }
                    downloadSection.scrollIntoView({ behavior: 'smooth' });
                }
            } else {
                // 如果不在首页，跳转回首页
                window.location.href = 'index.html#download-section';
            }
        });
    });
    
    // 导航栏社区链接点击事件
    const navCommunity = document.getElementById('nav-community');
    if (navCommunity) {
        navCommunity.addEventListener('click', function(e) {
            e.preventDefault();
            // 触发页面底部"加入社区"按钮的点击事件
            const joinCommunityBtn = document.getElementById('join-community');
            if (joinCommunityBtn) {
                joinCommunityBtn.click();
            }
        });
    }
});