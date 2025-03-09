/**
 * Class OS 彩蛋功能脚本
 * 实现点击彩蛋按钮6次后跳转到B站视频
 */

// 确保在页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 彩蛋按钮处理
    const eggButton = document.getElementById('eggButton');
    
    if (eggButton) {
        // 使用闭包来保持点击计数
        let clickCount = 0;
        
        eggButton.addEventListener('click', function(e) {
            // 防止事件冒泡和默认行为
            e.stopPropagation();
            e.preventDefault();
            
            // 增加点击计数
            clickCount++;
            
            // 添加震动动画
            eggButton.classList.add('shake');
            
            // 动画结束后移除动画类
            setTimeout(function() {
                eggButton.classList.remove('shake');
            }, 500);
            
            // 如果点击了6次，则直接跳转到B站视频
            if (clickCount === 6) {
                window.open('https://www.bilibili.com/video/BV1uT4y1P7CX', '_blank');
                // 重置点击计数
                clickCount = 0;
            }
        });
        
        // 移除其他可能影响彩蛋按钮的事件处理程序
        const oldEggButton = eggButton.cloneNode(true);
        eggButton.parentNode.replaceChild(oldEggButton, eggButton);
        
        // 重新添加事件监听器
        oldEggButton.addEventListener('click', function(e) {
            // 防止事件冒泡和默认行为
            e.stopPropagation();
            e.preventDefault();
            
            // 增加点击计数
            clickCount++;
            
            // 添加震动动画
            oldEggButton.classList.add('shake');
            
            // 动画结束后移除动画类
            setTimeout(function() {
                oldEggButton.classList.remove('shake');
            }, 500);
            
            // 如果点击了6次，则直接跳转到B站视频
            if (clickCount === 6) {
                window.open('https://www.bilibili.com/video/BV1uT4y1P7CX', '_blank');
                // 重置点击计数
                clickCount = 0;
            }
        });
    } else {
        console.error('未找到彩蛋按钮，ID为eggButton的元素不存在');
    }
}); 