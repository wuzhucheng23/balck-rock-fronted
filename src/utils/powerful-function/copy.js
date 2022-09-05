/**
 * @description 复制
 * @param dom {DOMElement} 要复制文本的外层DOM元素
 * @return undefined
 */
export const copy = (dom) => {
    const input = document.createElement('input');
    input.setAttribute("value", dom.innerText);
    document.body.appendChild(input);
    input.select();
    document.execCommand("Copy");
    document.body.removeChild(input);
};
