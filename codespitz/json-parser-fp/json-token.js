const {
  step,
  go,
  not,
  isUndefined
} = require('./fp')
const {isReference} = require('./helper')
const { extractNonRef } = require('./extract')

const jsonToken = (input, iter) => {
  step(input, ({char, index, str}) => {
    if (isReference(char)) {
      iter(char)
    } else {
      const [newIndex, val] = extractNonRef({char, index, str})
      if (go(val, isUndefined, not)) {
        iter(val)
        return newIndex + 1
      }
    }
  })
}

module.exports = {jsonToken}