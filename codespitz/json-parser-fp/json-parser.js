const { trim, reduce} = require('./fp')
const { jsonToken, isReference, isEndRef, ref } = require('./json-token')

const parser = input => {
  input = trim(input)
  const tokens = []
  jsonToken(input, token => tokens.push(token))
  const pointer = reduce(tokens, (pointer, token) => {
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

const createNode = ({val = null, key = null, back = null}) => ({val, key, back})

const setValue = (pointer, value) => {
  const {key, val} = pointer
  if (Array.isArray(val)) {
    val.push(value)
  } else {
    if(val) {
      if (key) {
        val[key] = value
        pointer.key = null
      } else {
        pointer.key = value
      }
    } else {
      pointer.val = value
    }
  }
}

const getValue = pointer => pointer.val
const getBackword = pointer => pointer.back

module.exports = { parser }