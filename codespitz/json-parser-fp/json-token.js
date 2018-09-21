const { step, go, not, isUndefined } = require('./fp')
const { extractNonRef } = require('./extract')

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

module.exports = {
  jsonToken,
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