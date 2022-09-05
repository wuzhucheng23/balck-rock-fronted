/**
 * @description 队列
 */
// 使用symbol符号，保护内部元素
const _items = Symbol('queueItems')
const _count = Symbol('queueCount')
const _lowestCount = Symbol('queueLowestCount')

// 队列实现类
export default class Queue {
    constructor() {
        this[_count] = 0
        this[_lowestCount] = 0
        this[_items] = Object.create(null)
    }

    // 添加元素
    enqueue(element) {
        this[_items][this[_count]] = element
        this[_count] += 1
    }

    // 判断是否为空
    isEmpty() {
        return this[_count] === this[_lowestCount]
    }

    // 删除元素
    dequeue() {
        if (this.isEmpty()) {
            return undefined
        }
        const result = this[_items][this[_lowestCount]]
        delete this[_items][this[_lowestCount]]
        this[_lowestCount] += 1
        return result
    }

    // 查看队列头部元素
    front() {
        if (this.isEmpty()) {
            return undefined
        }
        return this[_items][this[_lowestCount]]
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
