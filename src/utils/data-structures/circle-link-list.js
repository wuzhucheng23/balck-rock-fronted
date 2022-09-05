/**
 * @description 循环链表
 */

// 使用symbol符号，保护内部元素
const _count = Symbol('linkListCount');
const _head = Symbol('linkListHead');

// 元素类
class Node {
    constructor(element) {
        this.element = element;
        this.next = null;
    }
}

// 循环链表类
export default class CircleLinkList {
    constructor() {
        this[_count] = 0;      // 元素数量
        this[_head] = null;   // 表头元素（其他元素都是通过此元素来查找）
    }

    // 向链表尾部添加一个新元素
    push(element) {
        const node = new Node(element);
        if (this[_head] === null) {   // 若链表为空
            this[_head] = node;
        } else {    // 若链表不为空
            let current = this[_head];
            for (let i = 0; i < this[_count] - 1; i++) {
                current = current.next
            }
            current.next = node;
        }
        node.next = this[_head]
        this[_count] += 1;
    }

    // 向链表指定位置插入一个新元素
    insert(element, index) {
        if (index >= 0 && index <= this[_count]) {    // 若索引有效
            const node = new Node(element);
            let current = this[_head];
            if (index === 0) {  // 若插入的是头元素
                if (this[_head] === null) { // 若链表为空
                    this[_head] = node;
                    node.next = this[_head];
                } else {
                    node.next = current;
                    this[_head] = node;
                    for (let i = 0; i < this[_count]; i++) {   // 循环找到索引元素，和索引的前一个元素
                        current = current.next;
                    }
                    current.next = this[_head];
                }
            } else {
                let previous = null;
                for (let i = 0; i < index; i++) {   // 循环找到索引元素，和索引的前一个元素
                    previous = current;
                    current = current.next;
                }
                previous.next = node;
                node.next = current;
            }
            this[_count] += 1;
            return true;
        }
        return false;
    }

    // 返回链表中指定位置的元素
    getElementAt(index) {
        if (index >= 0 && index < this[_count]) {     // 若索引有效
            let node = this[_head];
            for (let i = 0; i < index; i++) {
                node = node.next;
            }
            return node;
        }
        return undefined;
    }

    // 返回元素索引
    indexOf(element) {
        if (this[_head] !== null) {   // 若头元素不为null，即链表长度不为0
            let current = this[_head];
            for (let i = 0; i < this[_count]; i++) {
                if (element === current.element) {
                    return i;
                }
                current = current.next;
            }
        }
        return -1;
    }

    // 从链表的指定位置移除一个元素
    removeAt(index) {
        if (index >= 0 && index < this[_count]) {     // 若索引有效
            let current = this[_head];
            if (index === 0) {  // 若删除的是头元素
                if (this[_count] === 1) {   // 若链表长度为1
                    this[_head] = null
                } else {
                    const remove = this[_head]  // 保留删除元素（避免丢失，因为要返回删除元素）
                    this[_head] = current.next;
                    for (let i = 0; i < this[_count]; i++) {
                        current = current.next
                    }
                    current.next = this[_head]
                    current = remove    // 令current等于删除元素（因为要返回删除元素）
                }
            } else {
                let previous = null;
                for (let i = 0; i < index; i++) {   // 循环找到索引元素，和索引的前一个元素
                    previous = current;
                    current = current.next;
                }
                previous.next = current.next;
            }
            this[_count] -= 1;
            return current.element;
        }
        return undefined;
    }

    // 从链表中移除一个元素
    remove(element) {
        const index = this.indexOf(element);
        return this.removeAt(index);
    }

    // 判断链表是否为空
    isEmpty() {
        return this[_count] === 0;
    }

    // 获取链表长度
    size() {
        return this[_count];
    }

    // 获取头元素
    getHead() {
        return this[_head];
    }

    // 清空链表
    clear() {
        this[_count] = 0;
        this[_head] = null;
    }

    // 字符串表示
    toString() {
        if (this[_count] === 0) {   // 若链表为空
            return '';
        }
        let objString = `${this[_head]['element']}`;
        let current = this[_head]['next'];
        for (let i = 1; i < this[_count]; i++) {
            objString = `${objString},${current.element}`;
            current = current.next;
        }
        return objString;
    }
}
