const { isReference, isEndRef, ref } = require('./helper')
const {
  createNode,
  getValue,
  setValue
} = require('./pointer')
const { trim } = require('./fp')
const { jsonToken } = require('./json-token')
const { getBackword } = require('./pointer')
const parser = input => {
  input = trim(input)
  let pointer = createNode({})
  jsonToken(input, token => {
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
  })
  return getValue(pointer)
}

module.exports = { parser }