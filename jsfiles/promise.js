class Promise2 {
    constructor (factory) {

        let stack = [], //  存储了传进来的回调函数，为什么使用一个数组呢，是为了将所有的回调注册对应，否则会导致1resolve对应2回调
            value = '',
            state = 'pending'
        this.then = (resolve, reject) => {
            stack.push({
                resolved: resolve,
                rejected: reject
            })
            return this
        }

        function resolve (data) {
            value = data
            state = 'resolved'
            // 执行所有收集的resolve回调
            stack.forEach(obj => obj.resolve(data))
            return this
        }

        function reject (msg) {
            state = 'rejected'
            // 执行所有收集的resolve回调
            stack.forEach(obj => obj.reject(msg))
            return this
        }

        if (typeof factory === 'function') {
            factory(resolve, reject)
        }
    }
}