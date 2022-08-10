export const debounce =  (handle,duration) => {
    return () => {
        const self = this;
        const args = arguments;
        if (window.timer) clearTimeout(window.timer);
        window.timer = setTimeout( () => {
            handle.apply(self,args);
        },duration || 1000);
    }
}
