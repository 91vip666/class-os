/**
 * Class OS 页面动画脚本
 * 用于实现滚动动画、轮播图和其他交互效果
 */

// 预加载处理
const preloader = document.getElementById('preloader');

// 确保预加载器不会一直显示的安全机制
if (preloader) {
    // 强制在5秒后隐藏预加载器，即使加载事件没有触发
    setTimeout(function() {
        preloader.classList.add('fade-out');
        setTimeout(function() {
            if (preloader.parentNode) {
                preloader.parentNode.removeChild(preloader);
            }
        }, 500);
    }, 5000);
    
    // 页面加载完成后
    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.classList.add('fade-out');
            // 移除预加载器，释放内存
            setTimeout(function() {
                if (preloader.parentNode) {
                    preloader.parentNode.removeChild(preloader);
                }
            }, 500);
        }, 500);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // 页面加载进度条
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        // 初始显示进度
        progressBar.style.width = '30%';
        
        // 页面加载事件
        window.addEventListener('load', () => {
            progressBar.style.width = '100%';
            setTimeout(() => {
                progressBar.style.opacity = '0';
            }, 500);
        });
        
        // 模拟加载进度
        let width = 30;
        const interval = setInterval(() => {
            if (width >= 90) {
                clearInterval(interval);
            } else {
                width += 1;
                progressBar.style.width = width + '%';
            }
        }, 50);
    }

    // 轮播图逻辑
    const carousel = document.querySelector('.carousel');
    if (carousel) {
        const container = carousel.querySelector('.screenshot-container');
        const prevBtn = carousel.querySelector('.prev');
        const nextBtn = carousel.querySelector('.next');
        const images = container.querySelectorAll('img');
        const indicatorsContainer = carousel.querySelector('.carousel-indicators');
        let currentIndex = 0;
        let autoSlideInterval;
        let lastClickTime = 0; // 记录最后一次点击时间

        // 创建指示器点
        function createIndicators() {
            // 清空现有指示器
            indicatorsContainer.innerHTML = '';
            
            // 为每张图片创建一个指示器点
            for (let i = 0; i < images.length; i++) {
                const indicator = document.createElement('div');
                indicator.classList.add('carousel-indicator');
                if (i === currentIndex) {
                    indicator.classList.add('active');
                }
                indicator.setAttribute('data-index', i);
                indicator.setAttribute('aria-label', `幻灯片 ${i + 1}`);
                indicator.setAttribute('role', 'button');
                
                // 点击指示器切换到对应的图片
                indicator.addEventListener('click', () => {
                    currentIndex = i;
                    updateCarousel();
                    stopAutoSlide();
                    startAutoSlide();
                });
                
                indicatorsContainer.appendChild(indicator);
            }
        }

        function updateCarousel() {
            container.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            // 更新指示器点状态
            const indicators = indicatorsContainer.querySelectorAll('.carousel-indicator');
            indicators.forEach((indicator, index) => {
                if (index === currentIndex) {
                    indicator.classList.add('active');
                } else {
                    indicator.classList.remove('active');
                }
            });
            
            // 更新辅助信息
            updateAccessibilityInfo();
        }
        
        // 更新辅助信息（可访问性增强）
        function updateAccessibilityInfo() {
            // 移除之前的活动状态
            images.forEach((img) => {
                img.setAttribute('aria-current', 'false');
            });
            
            // 设置当前图片的活动状态
            images[currentIndex].setAttribute('aria-current', 'true');
        }

        function startAutoSlide() {
            autoSlideInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % images.length;
                updateCarousel();
            }, 5000);
        }

        function stopAutoSlide() {
            clearInterval(autoSlideInterval);
        }

        prevBtn.addEventListener('click', () => {
            stopAutoSlide();
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            updateCarousel();
            startAutoSlide();
        });

        nextBtn.addEventListener('click', () => {
            stopAutoSlide();
            currentIndex = (currentIndex + 1) % images.length;
            updateCarousel();
            startAutoSlide();
        });

        // 处理图片点击，避免与轮播切换冲突
        images.forEach((img, index) => {
            img.addEventListener('click', (e) => {
                // 确保这是一个点击事件而不是轮播导致的变化
                const now = new Date().getTime();
                if (now - lastClickTime < 300) { // 如果两次点击间隔小于300ms，视为轮播切换，不触发放大
                    e.stopPropagation(); // 阻止事件冒泡
                    return false;
                }
                lastClickTime = now;
                
                // 更新当前索引
                currentIndex = index;
                updateCarousel();
                
                // 正常放大图片逻辑
                // openZoom(img) 已经在HTML中通过onclick属性设置
            });
        });

        // 触摸事件支持
        let touchStartX = 0;
        let touchEndX = 0;

        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            stopAutoSlide();
        }, { passive: true });

        carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            if (touchStartX - touchEndX > 50) { // 向左滑动
                currentIndex = (currentIndex + 1) % images.length;
            } else if (touchEndX - touchStartX > 50) { // 向右滑动
                currentIndex = (currentIndex - 1 + images.length) % images.length;
            }
            updateCarousel();
            startAutoSlide();
        }, { passive: true });

        // 创建指示器点并设置初始状态
        createIndicators();
        updateAccessibilityInfo();
        startAutoSlide();
    }

    // 滚动动画
    // 用于跟踪元素是否已经离开视口的Map
    const animationVisibilityMap = new Map();
    
    function checkAnimations() {
        const animations = document.querySelectorAll('.animation');
        const systemCards = document.querySelectorAll('.system-card');
        const glassEffects = document.querySelectorAll('.glass-effect');
        const isDarkMode = document.body.classList.contains('dark-mode');
        
        // 处理带有animation类的元素
        animations.forEach(animation => {
            const boundingBox = animation.getBoundingClientRect();
            const isVisible = (boundingBox.top <= window.innerHeight * 0.8);
            const isOutOfView = (boundingBox.bottom < 0 || boundingBox.top > window.innerHeight);
            
            // 如果元素不在视口内，标记为已离开视口
            if (isOutOfView) {
                animationVisibilityMap.set(animation, false);
                // 当元素离开视口时，移除visible类，这样当它再次进入视口时可以重新播放动画
                animation.classList.remove('visible');
            }
            
            if (isVisible) {
                // 检查元素是否之前已经离开过视口或者是第一次显示
                const wasOutOfView = animationVisibilityMap.get(animation) === false;
                
                // 如果元素之前离开过视口或者是第一次显示，则添加visible类触发动画
                if (wasOutOfView || animationVisibilityMap.get(animation) === undefined) {
                    animation.classList.add('visible');
                    // 更新元素状态为已显示
                    animationVisibilityMap.set(animation, true);
                }
                
                // 在深色模式下，不再为标题元素添加微光效果
                if (animation.tagName === 'H2' || animation.tagName === 'H3') {
                    // 对于标题元素，不添加dark-glow效果
                    if (animation.classList.contains('dark-glow')) {
                        animation.classList.remove('dark-glow');
                    }
                } else if (isDarkMode && !animation.classList.contains('dark-glow')) {
                    animation.classList.add('dark-glow');
                    
                    // 动态添加样式
                    if (!document.getElementById('dark-mode-animation-styles')) {
                        const styleEl = document.createElement('style');
                        styleEl.id = 'dark-mode-animation-styles';
                        styleEl.textContent = `
                            .dark-glow {
                                box-shadow: 0 0 15px rgba(77, 166, 255, 0.1);
                                transition: box-shadow 0.5s ease;
                            }
                            .dark-mode .carousel button {
                                background-color: rgba(30, 41, 59, 0.7);
                                color: #e0e0e0;
                            }
                            .dark-mode .carousel button:hover {
                                background-color: rgba(30, 41, 59, 0.9);
                            }
                        `;
                        document.head.appendChild(styleEl);
                    }
                } else if (!isDarkMode && animation.classList.contains('dark-glow')) {
                    animation.classList.remove('dark-glow');
                }
            }
        });
        
        // 处理系统卡片元素
        systemCards.forEach(card => {
            const boundingBox = card.getBoundingClientRect();
            const isVisible = (boundingBox.top <= window.innerHeight * 0.8);
            const isOutOfView = (boundingBox.bottom < 0 || boundingBox.top > window.innerHeight);
            
            if (isOutOfView) {
                animationVisibilityMap.set(card, false);
                card.classList.remove('visible');
            }
            
            if (isVisible) {
                const wasOutOfView = animationVisibilityMap.get(card) === false;
                
                if (wasOutOfView || animationVisibilityMap.get(card) === undefined) {
                    card.classList.add('visible');
                    animationVisibilityMap.set(card, true);
                }
            }
        });
        
        // 处理玻璃效果元素
        glassEffects.forEach(effect => {
            const boundingBox = effect.getBoundingClientRect();
            const isVisible = (boundingBox.top <= window.innerHeight * 0.8);
            const isOutOfView = (boundingBox.bottom < 0 || boundingBox.top > window.innerHeight);
            
            if (isOutOfView) {
                animationVisibilityMap.set(effect, false);
                effect.classList.remove('visible');
            }
            
            if (isVisible) {
                const wasOutOfView = animationVisibilityMap.get(effect) === false;
                
                if (wasOutOfView || animationVisibilityMap.get(effect) === undefined) {
                    effect.classList.add('visible');
                    animationVisibilityMap.set(effect, true);
                }
            }
        });
    }

    // 监听主题变化，重新应用动画效果
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class' && 
                mutation.target === document.body) {
                checkAnimations();
                
                // 更新轮播图按钮样式
                updateCarouselStylesForTheme();
            }
        });
    });
    
    observer.observe(document.body, { attributes: true });
    
    // 根据主题更新轮播图样式
    function updateCarouselStylesForTheme() {
        const isDarkMode = document.body.classList.contains('dark-mode');
        const carousel = document.querySelector('.carousel');
        
        if (carousel) {
            const buttons = carousel.querySelectorAll('button');
            buttons.forEach(button => {
                if (isDarkMode) {
                    button.style.backgroundColor = 'rgba(30, 41, 59, 0.7)';
                    button.style.color = '#e0e0e0';
                } else {
                    button.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
                    button.style.color = '#333';
                }
            });
            
            // 添加悬停事件处理
            buttons.forEach(button => {
                button.addEventListener('mouseenter', () => {
                    if (isDarkMode) {
                        button.style.backgroundColor = 'rgba(30, 41, 59, 0.9)';
                    } else {
                        button.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
                    }
                });
                
                button.addEventListener('mouseleave', () => {
                    if (isDarkMode) {
                        button.style.backgroundColor = 'rgba(30, 41, 59, 0.7)';
                    } else {
                        button.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
                    }
                });
            });
        }
    }
    
    window.addEventListener('scroll', checkAnimations);
    // 页面加载时检查一次
    checkAnimations();
    updateCarouselStylesForTheme();

    // 彩蛋按钮动画
    const eggButton = document.getElementById('eggButton');
    if (eggButton) {
        let clickCount = 0;

        eggButton.addEventListener('click', () => {
            clickCount++;
            eggButton.classList.add('shake');

            // 动画结束后移除shake类
            setTimeout(() => {
                eggButton.classList.remove('shake');
            }, 500);

            if (clickCount === 6) {
                window.open('https://www.bilibili.com/video/BV1uT4y1P7CX', '_blank');
                clickCount = 0; // 重置点击计数
            }
        });
    }

    // 改进下载按钮体验
    const downloadButtons = document.querySelectorAll('.download-btn');
    downloadButtons.forEach(button => {
        // 添加悬停效果
        button.addEventListener('mouseenter', () => {
            button.classList.add('pulse');
        });
        
        button.addEventListener('mouseleave', () => {
            button.classList.remove('pulse');
        });
    });

    // 回到顶部按钮
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        // 检测滚动位置显示/隐藏按钮
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        // 点击按钮滚动到顶部
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 图片放大查看
    const zoomImages = document.querySelectorAll('.image-zoom-container img');
    const zoomOverlay = document.getElementById('zoomOverlay');
    const enlargedImage = document.getElementById('enlargedImage');

    if (zoomImages.length > 0 && zoomOverlay && enlargedImage) {
        zoomImages.forEach(img => {
            img.addEventListener('click', () => {
                enlargedImage.src = img.src;
                zoomOverlay.classList.add('visible');
            });
        });

        zoomOverlay.addEventListener('click', () => {
            zoomOverlay.classList.remove('visible');
        });
    }
});