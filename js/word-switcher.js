// Chrome风格词语切换效果
document.addEventListener('DOMContentLoaded', function() {
    // 检查是否已经初始化，防止重复运行
    if (window.wordSwitcherInitialized) {
        console.log("词语切换器已经初始化，跳过...");
        return;
    }
    
    console.log("词语切换器初始化中...");
    
    // 设置标记，防止重复运行
    window.wordSwitcherInitialized = true;
    
    // 词语列表
    const words = ['未来形态', '智能化', '创新型', '交互式', '高效率'];
    const wordSwitcher = document.getElementById('word-switcher');
    
    // 确保元素存在
    if (!wordSwitcher) {
        console.error("错误：找不到词语切换元素!");
        return;
    }
    
    // 获取原始样式和内容
    const originalText = wordSwitcher.textContent;
    const originalColor = getComputedStyle(wordSwitcher).color;
    
    // 设置样式确保水平显示
    wordSwitcher.style.display = 'inline';
    wordSwitcher.style.position = 'relative';
    wordSwitcher.style.minWidth = '0'; // 移除最小宽度
    wordSwitcher.style.transition = 'opacity 0.5s ease';
    
    // 当前索引
    let currentIndex = 0;
    
    // 切换函数
    function switchWord() {
        // 淡出
        wordSwitcher.style.opacity = '0';
        
        // 等待淡出完成后切换词语
        setTimeout(function() {
            currentIndex = (currentIndex + 1) % words.length;
            wordSwitcher.textContent = words[currentIndex];
            
            // 淡入
            wordSwitcher.style.opacity = '1';
        }, 500);
    }
    
    // 开始定时切换
    setTimeout(function() {
        setInterval(switchWord, 3000);
    }, 3000);
}); 