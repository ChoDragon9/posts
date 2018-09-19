const {
  isString,
  isObject,
  isReference,
  isNumber,
  isBoolean,
  isNull,
} = require('./helper')
const {
  createNode,
  getBackword,
  getValue,
  setValue
} = require('./pointer')

const parser = input => {
  input = input.trim()
  let i = 0
  const j = input.length
  let pointer = createNode({})
  while (i < j) {
    let cursor = i
    if (isReference(input[cursor])) {
      pointer = parseReference(input, cursor, pointer)
    } else {
      switch (true) {
        case isString(input[cursor]):
          cursor = parseString(input, cursor, pointer)
          break;
        case isNumber(input[cursor]):
          cursor = parseNumber(input, cursor, pointer)
          break;
        case isBoolean(input[cursor]):
          cursor = parseBoolean(input, cursor, pointer)
          break;
        case isNull(input[cursor]):
          cursor = parseNull(cursor, pointer)
          break;
      }
    }
    i = cursor + 1
  }
  return getValue(pointer)
}

const parseString = (input, cursor, pointer) => {
  const findString = index => input.indexOf(`"`, index + 1)
  let newCursor = findString(cursor)
  while (input[newCursor - 1] === `\\`) {
    newCursor = findString(newCursor)
  }
  const str = input.substring(cursor + 1, newCursor)
  setValue(pointer, str)
  return newCursor
}

const parseNumber = (input, cursor, pointer) => {
  const nextCursor = cursor + 1
  const commaIdx = input.indexOf(`,`, nextCursor)
  const arrIdx = input.indexOf(`]`, nextCursor)
  const objIdx = input.indexOf(`}`, nextCursor)
  const endCursor = Math.min(...[commaIdx, arrIdx, objIdx].filter(v => v > -1))
  let num = input.substring(cursor, endCursor).trim()
  num = parseFloat(num)
  setValue(pointer, num)
  return endCursor - 1
}

const parseBoolean = (input, cursor, pointer) => {
  const isTrue = input[cursor] === 't'
  const val = isTrue ? true : false
  const newCursor = cursor + (isTrue ? 3 : 4)
  setValue(pointer, val)
  return newCursor
}

const parseNull = (cursor, pointer) => {
  const val = null
  const newCursor = cursor + 3
  setValue(pointer, val)
  return newCursor
}

const parseReference = (input, cursor, pointer) => {
  let newPointer
  const delimiter = isObject(input[cursor]) ? `{` : `[`
  if (input[cursor] === delimiter) {
    const val = isObject(input[cursor]) ? {} : []
    setValue(pointer, val)
    newPointer = createNode({ val, back: pointer })
  } else {
    newPointer = getBackword(pointer)
  }
  return newPointer
}

module.exports = { parser }