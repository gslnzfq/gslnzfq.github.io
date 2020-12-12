// 1. 1元，2元，5元，10元，20元，50元，100元，凑钱, 手写。

/**
 *
 * @param list 可选钱的列表
 * @param money 需要找的钱
 */
function greedyMoney (list = [], money = 0) {
  let len = list.length, i = 0, result = [];
  list = list.sort((a, b) => b - a);
  for (; i < len; i++) {
    let n = list[i]
    while (money >= n && money > 0) {
      result.push(n);
      money = money - n;
    }
  }
  console.log(result);
  return result;
}

greedyMoney([11,5,1], 15);