function abc (aaa, bbb) {
  console.log(arguments.callee.caller === abc)
}

console.log(abc(1, 2, 3))
console.log(abc.length)