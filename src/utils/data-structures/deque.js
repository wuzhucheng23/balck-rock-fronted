/**
 * @description 双端队列
 */
// 使用symbol符号，保护内部元素
const _items = Symbol('queueItems')
const _count = Symbol('queueCount')
const _lowestCount = Symbol('queueLowestCount')

// 双端队列实现类
export default class Deque {
    constructor() {
        this[_count] = 0
        this[_lowestCount] = 0
        this[_items] = Object.create(null)
    }

    // 判断是否为空
    isEmpty() {
        return this[_count] === this[_lowestCount]
    }

    // 添加尾部元素
    addBack(element) {
        this[_items][this[_count]] = element
        this[_count] += 1
    }

    // 添加头部元素
    addFront(element) {
        if (this.isEmpty()) {   // 若为空
            this.addBack(element)
        } else if (this[_lowestCount] > 0) {    // 若头部删除过元素
            this[_lowestCount] -= 1
            this[_items][this[_lowestCount]] = element
        } else {    // 不为空、且头部没删除过元素
            for (let i = this[_count]; i > 0; i--) {
                this[_items][i] = this[_items][i - 1]
            }
            this[_count] += 1
            this[_items][0] = element
        }
    }

    // 删除头部元素
    removeFront() {
        if (this.isEmpty()) {
            return undefined
        }
        const result = this[_items][this[_lowestCount]]
        delete this[_items][this[_lowestCount]]
        this[_lowestCount] += 1
        return result
    }

    // 删除尾部元素
    removeBack() {
        if (this.isEmpty()) {
            return undefined
        }
        const result = this[_items][this[_count] - 1]
        this[_count] -= 1
        delete this[_items][this[_count]]
        return result
    }

    // 查看队列头部元素
    front() {
        if (this.isEmpty()) {
            return undefined
        }
        return this[_items][this[_lowestCount]]
    }

    // 查看队列尾部元素
    back() {
        if (this.isEmpty()) {
            return undefined
        }
        return this[_items][this[_count] - 1]
    }

    // 查看队列大小
    size() {
        return this[_count] - this[_lowestCount]
    }

    // 清空队列
    clear() {
        this[_count] = 0
        this[_lowestCount] = 0
        this[_items] = Object.create(null)
    }

    // 打印字符串
    toString() {
        if (this.isEmpty()) {
            return ''
        }
        let objString = `${this[_items][this[_lowestCount]]}`
        for (let i = this[_lowestCount] + 1; i < this[_count]; i++) {
            objString = `${objString},${this[_items][i]}`
        }
        return objString
    }
}
