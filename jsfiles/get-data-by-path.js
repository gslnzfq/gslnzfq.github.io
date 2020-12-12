let a = {
    name: 'zhangsan',
    info: {
        addr: {
            province: 'prov'
        },
        age: 30
    }
}

function getDataByPath (data, path) {
    let arr = path.split('.'),
        temp = data
    while (arr.length) {
        temp = temp[arr.shift()]
        if (temp === undefined) {
            break
        }
    }
    return temp
}

console.log(getDataByPath(a, 'info.addr.province'))