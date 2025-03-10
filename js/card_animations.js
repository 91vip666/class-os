/**
 * Class OS 展示方块动画效果
 * 为首页展示方块添加更丰富的动画效果
 */

document.addEventListener('DOMContentLoaded', function() {
    // 获取所有展示方块
    const systemCards = document.querySelectorAll('.system-card');
    
    // 为每个展示方块添加入场动画延迟，创造错落有致的效果
    systemCards.forEach((card, index) => {
        // 仅为首页展示方块（在max-w-7xl容器内的系统卡片）添加延迟动画
        const isPreviewCard = card.closest('.max-w-7xl') !== null;
        
        if (isPreviewCard) {
            // 设置不同的动画延迟，形成波浪效果
            card.style.transitionDelay = `${0.1 * index}s`;
            
            // 为卡片内的图标和文字添加动画效果
            setupCardContentAnimations(card, index);
        }
    });
    
    // 为卡片内的内容添加动画效果
    function setupCardContentAnimations(card, index) {
        // 获取卡片内的图标和文字元素
        const icons = card.querySelectorAll('i, svg');
        const texts = card.querySelectorAll('h3, p, span');
        
        // 为图标添加动画效果
        icons.forEach(icon => {
            // 初始状态
            icon.style.transition = 'transform 0.5s ease, color 0.5s ease';
            icon.style.transitionDelay = '0.1s';
            
            // 鼠标进入卡片时的动画
            card.addEventListener('mouseenter', () => {
                icon.style.transform = 'scale(1.15) translateY(-2px)';
                if (document.body.classList.contains('dark-mode')) {
                    icon.style.color = '#4da6ff';
                    // 添加发光效果
                    icon.style.filter = 'drop-shadow(0 0 3px rgba(77, 166, 255, 0.5))';
                } else {
                    icon.style.color = '#0078D4';
                }
            });
            
            // 鼠标离开卡片时的动画
            card.addEventListener('mouseleave', () => {
                icon.style.transform = 'scale(1) translateY(0)';
                icon.style.filter = 'none';
                // 恢复原来的颜色
                if (document.body.classList.contains('dark-mode')) {
                    icon.style.color = '#e0e0e0';
                } else {
                    icon.style.color = '';
                }
            });
        });
        
        // 为文字添加动画效果
        texts.forEach((text, textIndex) => {
            // 初始状态
            text.style.transition = 'transform 0.4s ease, color 0.4s ease';
            text.style.transitionDelay = `${0.1 + 0.05 * textIndex}s`;
            
            // 鼠标进入卡片时的动画
            card.addEventListener('mouseenter', () => {
                text.style.transform = 'translateY(-2px)';
                if (document.body.classList.contains('dark-mode')) {
                    if (text.tagName === 'H3') {
                        text.style.color = '#4da6ff';
                    }
                } else {
                    if (text.tagName === 'H3') {
                        text.style.color = '#0078D4';
                    }
                }
            });
            
            // 鼠标离开卡片时的动画
            card.addEventListener('mouseleave', () => {
                text.style.transform = 'translateY(0)';
                // 恢复原来的颜色
                if (document.body.classList.contains('dark-mode')) {
                    text.style.color = '#e0e0e0';
                } else {
                    text.style.color = '';
                }
            });
        });
    }
    
    // 添加3D倾斜效果（鼠标移动时卡片轻微倾斜）
    systemCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            // 获取鼠标在卡片上的相对位置
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left; // 鼠标X坐标相对于卡片
            const y = e.clientY - rect.top;  // 鼠标Y坐标相对于卡片
            
            // 计算倾斜角度（最大倾斜5度）
            const tiltX = ((y / rect.height) * 10 - 5) * 0.5;
            const tiltY = ((x / rect.width) * 10 - 5) * -0.5;
            
            // 应用3D变换
            this.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-5px) scale(1.02)`;
        });
        
        // 鼠标离开时恢复原状
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
        });
        
        // 鼠标点击时添加按压效果
        card.addEventListener('mousedown', function() {
            this.style.transform = 'perspective(1000px) scale(0.98)';
        });
        
        // 鼠标释放时恢复
        card.addEventListener('mouseup', function() {
            this.style.transform = 'perspective(1000px) scale(1.02)';
        });
    });
    
    // 监听主题变化，重新应用动画效果
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class' && 
                mutation.target === document.body) {
                // 更新卡片样式
                updateCardStylesForTheme();
            }
        });
    });
    
    observer.observe(document.body, { attributes: true });
    
    // 根据主题更新卡片样式
    function updateCardStylesForTheme() {
        const isDarkMode = document.body.classList.contains('dark-mode');
        
        systemCards.forEach(card => {
            const icons = card.querySelectorAll('i, svg');
            const titles = card.querySelectorAll('h3');
            
            if (card.matches(':hover')) {
                if (isDarkMode) {
                    icons.forEach(icon => {
                        icon.style.color = '#4da6ff';
                        icon.style.filter = 'drop-shadow(0 0 3px rgba(77, 166, 255, 0.5))';
                    });
                    
                    titles.forEach(title => {
                        title.style.color = '#4da6ff';
                    });
                } else {
                    icons.forEach(icon => {
                        icon.style.color = '#0078D4';
                        icon.style.filter = 'none';
                    });
                    
                    titles.forEach(title => {
                        title.style.color = '#0078D4';
                    });
                }
            }
        });
    }
    
    // 初始化时检查一次
    updateCardStylesForTheme();
});