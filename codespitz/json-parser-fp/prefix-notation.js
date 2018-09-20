const {
  isObject,
  isArray
} = require('./helper')
const { extractNonRef } = require('./extract')

const prefixNotation = input => {
  const arr = []
  step(input, ({char, index, str}) => {
    if (isObject(char)) {
      arr.push({})
    } else if (isArray(char)) {
      arr.push([])
    } else {
      const [newIndex, val] = extractNonRef({char, index, str})
      arr.push(val)
      return newIndex + 1
    }
  }
  return arr
}

module.exports = {prefixNotation}