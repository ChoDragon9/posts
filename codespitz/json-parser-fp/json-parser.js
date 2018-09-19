const {
  isObject,
  isArray,
  isReference,
} = require('./helper')
const {
  createNode,
  getBackword,
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
const { extract } = require('./extract')

const parser = input => {
  input = trim(input)
  const pointer = reduce(input, ({char, index, str, acc}) => {
    if (isReference(char)) {
      if (isEndRef(char)) {
        acc = getBackword(acc)
      } else {
        const val = ref(char)
        setValue(acc, val)
        acc = createNode({val, back: acc})
      }
    } else {
      const result = extract({char, index, str})
      if (result) {
        const [index, val] = result
        if (go(val, isUndefined, not)) {
          setValue(acc, val)
        }
        return [acc, index + 1]
      }
    }
    return [acc]
  }, createNode({}))
  return getValue(pointer)
}

const ref = char => {
  if (isObject(char)) {
    return {}
  } else {
    if (isArray(char)) {
      return []
    }
  }
}

const isEndRef = char => {
  if (isObject(char)) {
    return char === '}'
  } else {
    if (isArray(char)) {
      return char === ']'
    }
  }
}

// isObject or isArray => createRef => setValue
// isObject or isArray => move back

module.exports = { parser }