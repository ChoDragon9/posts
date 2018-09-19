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
  step(input, ({cursor, index, str}) => {
    if (isReference(cursor)) {
      pointer = parseReference(cursor, pointer)
    } else {
      const result = extract({cursor, index, str})
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

const parseReference = (cursorStr, pointer) => {
  let newPointer
  const delimiter = isObject(cursorStr) ? `{` : `[`
  if (cursorStr === delimiter) {
    const val = isObject(cursorStr) ? {} : []
    setValue(pointer, val)
    newPointer = createNode({ val, back: pointer })
  } else {
    newPointer = getBackword(pointer)
  }
  return newPointer
}

module.exports = { parser }