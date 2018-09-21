const { createNode, getValue, setValue } = require('./pointer')
const { trim, reduce} = require('./fp')
const { jsonToken, isReference, isEndRef, ref } = require('./json-token')
const { getBackword } = require('./pointer')

const parser = input => {
  input = trim(input)
  const tokens = []
  jsonToken(input, token => tokens.push(token)
  pointer = reduce(tokens, (pointer, token) => {
    if (isReference(token)) {
      if (isEndRef(token)){
        pointer = getBackword(pointer)
      } else {
        const val = ref(token)
        setValue(pointer, val)
        pointer = createNode({val, back: pointer})
      }
    } else {
      setValue(pointer, token)
    }
    return pointer
  }, createNode({}))
  return getValue(pointer)
}

module.exports = { parser }