function share_() {
    let url = window.location.origin + window.location.pathname;
    try {
        // 截取标题
        var title = document.title;
        var subTitle = title.endsWith("| Bernon's Blog") ? title.substring(0, title.length - 14) : title;
        var shareText = 'Bernon\'s Blog的站内分享\n标题：' + subTitle + '\n链接：' + url + '\n欢迎来访！🍭🍭🍭';
        
        navigator.clipboard.writeText(shareText).then(() => {
            // 使用 Hexo 内置 snackbar 通知
            if (typeof btf !== 'undefined' && btf.snackbarShow) {
                btf.snackbarShow("成功复制分享信息🎉");
            } else {
                alert("成功复制分享信息🎉");
            }
        }).catch(err => {
            console.error('复制失败！', err);
        });
    } catch (err) {
        console.error('分享失败！', err);
    }
}

// 防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 执行防抖分享
const share = debounce(share_, 300);