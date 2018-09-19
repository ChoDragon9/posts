const { isReference } = require('./helper')
const {
  createNode,
  getValue,
  setValue
} = require('./pointer')
const {
  reduce,
  not,
  isUndefined,
  trim,
  go,
} = require('./fp')
const { extract, extractRef } = require('./extract')

const parser = input => {
  input = trim(input)
  const pointer = reduce(input, ({char, index, str, acc}) => {
    if (isReference(char)) {
      acc = extractRef([acc, char])
    } else {
      const [newIndex, val] = extract({char, index, str}) || [index]
      if (go(val, isUndefined, not)) {
        setValue(acc, val)
      }
      return [acc, newIndex + 1]
    }
    return [acc]
  }, createNode({}))
  return getValue(pointer)
}

module.exports = { parser }