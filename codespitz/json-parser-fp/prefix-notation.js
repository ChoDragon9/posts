const {
  step,
  go,
  not,
  isUndefined
} = require('./fp')
const { extractNonRef } = require('./extract')

const prefixNotation = input => {
  const arr = []
  step(input, ({char, index, str}) => {
    if (char === '{') {
      arr.push({})
    } else if (char === '[') {
      arr.push([])
    } else {
      const [newIndex, val] = extractNonRef({char, index, str})
      if (go(val, isUndefined, not)) {
        arr.push(val)
        return newIndex + 1
      }
    }
  })
  return arr
}

module.exports = {prefixNotation}