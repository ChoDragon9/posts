const isString = v => v === `"`
const isObject = v => v === `{` || v === `}`
const isArray = v => v === `[` || v === `]`
const isReference = v => isObject(v) || isArray(v)
const isNumber = v => v === '-' || parseFloat(v) > -1
const isBoolean = v => v === 't' || v === 'f'
const isNull = v => v === 'n'

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

module.exports = {
  isString,
  isObject,
  isArray,
  isReference,
  isNumber,
  isBoolean,
  isNull,
  ref,
  isEndRef
}