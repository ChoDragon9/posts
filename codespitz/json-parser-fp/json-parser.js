const { isReference } = require('./helper')
const {
  createNode,
  getValue,
  setValue
} = require('./pointer')
const {
  reduce,
  trim
} = require('./fp')
const { extractRef } = require('./extract')
const { jsonToken } = require('./json-token')
const parser = input => {
  input = trim(input)
  const pointer = reduce(jsonToken(input), (pointer, token) => {
    if (isReference(token)) {
      pointer = extractRef(pointer, token)
    } else {
      setValue(pointer, token)
    }
    return pointer
  }, createNode({}))
  return getValue(pointer)
}

module.exports = { parser }