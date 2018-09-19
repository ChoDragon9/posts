const reduce = (arr, iter, def) => arr.reduce(iter, def)

const arr = []
for (let char of '12345') {
  arr.push(char)
}
console.log(arr) // => ['1','2','3','4','5']

const arr2 = reduce([...'12345'], (acc, val) => {
  acc.push(val)
  return acc
}, [])

console.log(arr2)