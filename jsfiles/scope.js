// 作用域安全的构造函数

function Person (name, age, addr) {
    if (this instanceof Person) {
        this.name = name
        this.age = age
        this.addr = addr
    } else {
        return new Person(...arguments)
    }
}

let p1 = Person('zhangsan', 22, 'beijing')
let p2 = new Person('zhangsan', 22, 'beijing')

console.log(p1 instanceof Person)
console.log(p2 instanceof Person)