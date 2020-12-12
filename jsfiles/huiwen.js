let isHuiWen = function (str) {
  let newStr = str.toUpperCase().split('').reverse().join('');
  return newStr === str.toUpperCase();
}

console.log(isHuiWen('123210'))