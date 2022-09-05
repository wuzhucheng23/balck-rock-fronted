/**
 * @description 防抖
 * @param handle {Function} 处理函数
 * @param duration {Number} 间隔时间
 * @return Function 返回一个执行函数
 */
export const debounce = (handle, duration = 1000) => {
    return () => {
        const self = this;
        const args = arguments;
        if (window.timer) clearTimeout(window.timer);
        window.timer = setTimeout(() => {
            handle.apply(self, args);
        }, duration);
    };
};
