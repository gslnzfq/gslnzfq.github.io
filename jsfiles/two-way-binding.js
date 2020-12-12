let obj = {
    name: 'zhansgan',
    age: 90
}

Object.keys(obj).forEach(key => {
    let val = obj[key]
    Object.defineProperty(obj, key, {
        set (value) {
            console.log(`set ${key} = ${val}`)
            val = value
        },
        get () {
            console.log(`get ${key} = ${val}`)
            return val
        }
    })
})

console.log(obj.name)
obj.name = 'lisi'
console.log(obj.name)