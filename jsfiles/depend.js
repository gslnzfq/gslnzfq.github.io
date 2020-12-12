class Dep {
    //  初始化一个依赖的数据，为什么是一个数组，因为一个属性可能被多个computed所依赖
    constructor () {
        this.deps = []
    }
    depend () {
        //  此处由依赖的属性收集, 例如  obj.name被obj.info所引用，那个obj.info的监听函数就会自动注册到obj.name的依赖列表上
        if (Dep.target && this.deps.indexOf(Dep.target) === -1) {
            this.deps.push(Dep.target)
        }
    }
    notify () {
        //  一旦被依赖的属性发生了变化就会通知依赖的computed属性进行更新
        this.deps.forEach(dep => {
            dep()
        })
    }
}
class Observable {
    constructor (obj) {
        return this.init(obj)
    }
    //  将obj上第一层所有的属性都定义为可观测的，目前只支持对象的递归观测
    init (obj) {
        //  遍历所有的key
        Object.keys(obj).forEach(key => {
            this.defineReactive(obj, key, obj[key])
        })
        return obj
    }
    defineReactive (obj, key, val) {
        let dep = new Dep()
        // 如果值还是一个对象，就机柜观测
        if (Object.prototype.toString.call(val) === '[object Object]') {
            this.init(val)
        }
        Object.defineProperty(obj, key, {
            set (value) {
                val = value
                //  值修改以后通知自己的依赖去更新
                dep.notify()
            },
            get () {
                dep.depend()
                return val
            }
        })
    }
}
class Watcher {
    constructor (obj, key, cb, updateFn) {
        this.obj = obj
        this.key = key
        this.cb = cb
        this.updateFn = updateFn
        this.initComputed()
    }
    initComputed () {
        let me = this,
            //  每次更新需要调用的方法
            onComputed = () => {
                let val = me.cb.call(me.obj)
                me.updateFn(val)
            }
        Object.defineProperty(me.obj, me.key, {
            set () {
                throw new Error('计算属性不能赋值')
            },
            get () {
                //  添加依赖，如果存在就不重复添加
                Dep.target = onComputed
                //  这里会调用依赖的字段的get方法，get方法又会去调用dep.depend()，所以就将这个依赖添加到了列表中
                //  使用me.cb.call(me.obj)  这样就可以在cb中使用this获取obj的属性了
                let val = me.cb.call(me.obj)
                //  添加完依赖需要情空
                Dep.target = null
                return val
            }
        })
    }
}
let aaa = new Observable({
    name: 'zhangsan',
    age: 20
})
new Watcher(aaa, 'info', function () {
    return this.name + this.age;
}, function (val) {
    console.log('new ', val)
})

console.log(aaa.info)
aaa.age = 900
console.log('outer new ', aaa.info)