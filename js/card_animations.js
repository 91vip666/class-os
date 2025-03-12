/**
 * Class OS 卡片动画脚本
 * 用于实现首页展示方块的各种动画效果
 */

document.addEventListener('DOMContentLoaded', function() {
    // 获取所有系统卡片
    const systemCards = document.querySelectorAll('.system-card');
    
    // 为每个卡片添加动画效果
    systemCards.forEach((card, index) => {
        // 设置初始延迟，使卡片按顺序出现
        const initialDelay = index * 100;
        card.style.transitionDelay = `${initialDelay}ms`;
        
        // 添加卡片内容的动画
        setupCardContentAnimations(card, index);
        
        // 添加悬停时的3D效果
        setupCard3DEffect(card);
        
        // 添加点击时的按压效果
        setupCardPressEffect(card);
        
        // 添加边框发光效果
        setupCardGlowEffect(card);
    });
    
    // 监听滚动事件，触发卡片入场动画
    window.addEventListener('scroll', function() {
        animateCardsOnScroll();
    });
    
    // 初始触发一次动画，显示视口内的卡片
    animateCardsOnScroll();
});

/**
 * 设置卡片内容的动画效果
 * @param {HTMLElement} card - 卡片元素
 * @param {Number} index - 卡片索引
 */
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

/**
 * 设置卡片的3D效果
 * @param {HTMLElement} card - 卡片元素
 */
function setupCard3DEffect(card) {
    // 添加3D变换效果
    card.addEventListener('mousemove', function(e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; // 鼠标在卡片内的X坐标
        const y = e.clientY - rect.top;  // 鼠标在卡片内的Y坐标
        
        // 计算旋转角度（最大±5度）
        const rotateY = ((x / rect.width) - 0.5) * 10; // X轴位置决定Y轴旋转
        const rotateX = ((y / rect.height) - 0.5) * -10; // Y轴位置决定X轴旋转
        
        // 应用3D变换
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        card.style.transition = 'transform 0.1s ease';
    });
    
    // 鼠标离开时恢复原状
    card.addEventListener('mouseleave', function() {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        card.style.transition = 'transform 0.5s ease';
    });
    
    // 鼠标进入时添加阴影
    card.addEventListener('mouseenter', function() {
        if (document.body.classList.contains('dark-mode')) {
            card.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.3), 0 0 15px rgba(77, 166, 255, 0.2)';
        } else {
            card.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15), 0 0 15px rgba(0, 120, 212, 0.2)';
        }
    });
}

/**
 * 设置卡片的按压效果
 * @param {HTMLElement} card - 卡片元素
 */
function setupCardPressEffect(card) {
    // 点击时的按压效果
    card.addEventListener('mousedown', function() {
        card.style.transform = 'perspective(1000px) scale3d(0.98, 0.98, 0.98)';
        card.style.transition = 'transform 0.1s ease';
    });
    
    // 释放时恢复
    card.addEventListener('mouseup', function() {
        card.style.transform = 'perspective(1000px) scale3d(1, 1, 1)';
        card.style.transition = 'transform 0.3s ease';
    });
}

/**
 * 设置卡片的边框发光效果
 * @param {HTMLElement} card - 卡片元素
 */
function setupCardGlowEffect(card) {
    // 创建发光边框元素
    const glowBorder = document.createElement('div');
    glowBorder.className = 'card-glow-border';
    glowBorder.style.position = 'absolute';
    glowBorder.style.inset = '-2px';
    glowBorder.style.borderRadius = 'inherit';
    glowBorder.style.opacity = '0';
    glowBorder.style.transition = 'opacity 0.3s ease';
    glowBorder.style.pointerEvents = 'none';
    
    // 将边框添加到卡片中
    card.style.position = 'relative';
    card.style.overflow = 'hidden';
    card.appendChild(glowBorder);
    
    // 鼠标进入时显示发光边框
    card.addEventListener('mouseenter', function() {
        glowBorder.style.opacity = '1';
        if (document.body.classList.contains('dark-mode')) {
            glowBorder.style.boxShadow = 'inset 0 0 0 2px rgba(77, 166, 255, 0.5)';
        } else {
            glowBorder.style.boxShadow = 'inset 0 0 0 2px rgba(0, 120, 212, 0.5)';
        }
    });
    
    // 鼠标离开时隐藏发光边框
    card.addEventListener('mouseleave', function() {
        glowBorder.style.opacity = '0';
    });
}

/**
 * 滚动时触发卡片入场动画
 */
function animateCardsOnScroll() {
    const systemCards = document.querySelectorAll('.system-card');
    
    systemCards.forEach((card, index) => {
        const cardTop = card.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        // 当卡片进入视口时
        if (cardTop < windowHeight * 0.9) {
            // 设置交错延迟
            setTimeout(() => {
                // 添加入场动画，只改变透明度，不改变位置
                card.style.opacity = '1';
                // 移除了translateY的变换，取消上下移动效果
            }, index * 100); // 每个卡片延迟100ms
        }
    });
}

// 添加CSS样式到页面
function addCardAnimationStyles() {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        /* 卡片动画相关样式 */
        .system-card {
            transition: opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                        box-shadow 0.3s ease,
                        background-color 0.3s ease;
            will-change: opacity, box-shadow;
        }
        
        /* 卡片内容淡入动画 */
        .system-card .card-content {
            opacity: 0;
            animation: cardContentFadeIn 0.5s forwards;
            animation-delay: 0.2s;
        }
        
        @keyframes cardContentFadeIn {
            to {
                opacity: 1;
            }
        }
        
        /* 卡片背景渐变效果 */
        .system-card:hover {
            background: linear-gradient(135deg, rgba(255,255,255,0.95), rgba(240,240,240,0.95));
        }
        
        body.dark-mode .system-card:hover {
            background: linear-gradient(135deg, rgba(30,41,59,0.95), rgba(15,23,42,0.95));
        }
    `;
    
    document.head.appendChild(styleElement);
}

// 页面加载完成后添加样式
document.addEventListener('DOMContentLoaded', addCardAnimationStyles);