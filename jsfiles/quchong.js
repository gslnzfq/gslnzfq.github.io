var b = [2, 2, 4, 1, 2, 1, 5, 8, 0];
var newb = [];
for (var i = 0; i < b.length; i++) {
    // 看看是不是已经在新的数组里面了
    var exist = false;
    for (var j = 0; j < newb.length; j++) {
        // 找到相同的就说明在数组了
        if (newb[j] === b[i]){
            exist = true;
            break;
        }
    }
    // 不存在再push
    if (!exist) {
        newb.push(b[i]);
    }
}
console.log(newb);
