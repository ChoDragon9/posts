const {
  step,
  go,
  not,
  isUndefined,
  isReference
} = require('./fp')
const { extractNonRef } = require('./extract')

const jsonToken = input => {
  const arr = []
  step(input, ({char, index, str}) => {
    if (isReference(char)) {
      arr.push(char)
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

module.exports = {jsonToken}