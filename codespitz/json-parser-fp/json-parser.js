const {
  isObject,
  isReference,
} = require('./helper')
const {
  createNode,
  getBackword,
  getValue,
  setValue
} = require('./pointer')
const {
  step,
  not,
  isUndefined,
  trim,
  go,
} = require('./fp')
const { extract } = require('./extract')

const parser = input => {
  input = trim(input)
  let pointer = createNode({})
  step(input, ({char, index, str}) => {
    if (isReference(char)) {
      pointer = parseReference(char, pointer)
    } else {
      const result = extract({char, index, str})
      if (result) {
        const [index, val] = result
        if (go(val, isUndefined, not)) {
          setValue(pointer, val)
        }
        return index + 1
      }
    }
  })
  return getValue(pointer)
}

const parseReference = (char, pointer) => {
  let newPointer
  const delimiter = isObject(char) ? `{` : `[`
  if (char === delimiter) {
    const val = isObject(char) ? {} : []
    setValue(pointer, val)
    newPointer = createNode({ val, back: pointer })
  } else {
    newPointer = getBackword(pointer)
  }
  return newPointer
}

module.exports = { parser }