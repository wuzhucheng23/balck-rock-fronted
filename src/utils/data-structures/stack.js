/**
 * @description 栈
 */
// 使用symbol符号，保护内部元素
const _items = Symbol('stackItems')
const _count = Symbol('stackCount')

// 栈实现类
export default class StackObject {
    constructor() {
        this[_count] = 0
        this[_items] = Object.create(null)
    }

    // 添加元素
    push(element) {
        this[_items][this[_count]] = element
        this[_count] += 1
    }

    // 判断栈是否为空
    isEmpty() {
        return this[_count] === 0
    }

    // 删除元素
    pop() {
        if (this.isEmpty()) {
            return undefined
        }
        this[_count] -= 1
        const result = this[_items][this[_count]]
        delete this[_items][this[_count]]
        return result
    }

    // 查看栈顶元素
    peek() {
        if (this.isEmpty()) {
            return undefined
        }
        return this[_items][this[_count] - 1]
    }

    // 查看栈长度
    size() {
        return this[_count]
    }

    // 清空栈
    clear() {
        this[_items] = Object.create(null)
        this[_count] = 0
    }

    // 打印字符串
    toString() {
        if (this.isEmpty()) {
            return ''
        }
        let objString = `${this[_items][0]}`
        for (let i = 1; i < this[_count]; i++) {
            objString = `${objString},${this[_items][i]}`
        }
        return objString
    }
}
