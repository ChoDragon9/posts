const reduce = (...args) => arr.reduce(...args)

const arr = []
for (let char of '12345') {
  arr.push(char)
}
console.log(arr) // => ['1','2','3','4','5']

const arr = reduce([...'12345'], (acc, val) => {
  acc.push(val)
  return acc
}, [])