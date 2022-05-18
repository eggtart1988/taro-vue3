// 缓存服务
class Cache {
    constructor(name) {
        this.name = name
    }

    set(key, value) {
        this[key] = value
        return this[key]
    }
    get(key) {
        return this[key]
    }

    clear() {
        // 清空
        Object.keys(this).forEach(v => {
            this[v] = undefined
        })
    }
}

export const createCache = (name) => {
    return new Cache(name)
}

export const cacheCover = new Cache('cover')

export default {
    createCache,
    cacheCover
}