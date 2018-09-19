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
      let val
      switch (true) {
        case isString(input[cursor]):
          [cursor, val] = parseString(input, cursor)
          break;
        case isNumber(input[cursor]):
          [cursor, val] = parseNumber(input, cursor)
          break;
        case isBoolean(input[cursor]):
          [cursor, val] = parseBoolean(input, cursor)
          break;
        case isNull(input[cursor]):
          [cursor, val] = parseNull(cursor)
          break;
      }
      if (typeof val !== 'undefined') {
        setValue(pointer, val)
      }
    }
    i = cursor + 1
  }
  return getValue(pointer)
}

const parseString = (input, cursor) => {
  const newCursor = findEndString(input, cursor)
  const str = input.substring(cursor + 1, newCursor)
  return [newCursor, str]
}

const findString = index => input.indexOf(`"`, index + 1)
const findEndString = (input, cursor) => {
  let newCursor = findString(cursor)
  while (input[newCursor - 1] === `\\`) {
    newCursor = findString(newCursor)
  }
  return newCursor
}

const parseNumber = (input, cursor) => {
  const nearCursor = findEndNumber(input, cursor)
  const newCursor = nearCursor - 1
  let num = input.substring(cursor, nearCursor).trim()
  num = parseFloat(num)
  return [newCursor, num]
}

const findEndNumber = (input, cursor) => {
  const nextCursor = cursor + 1
  const commaIdx = input.indexOf(`,`, nextCursor)
  const arrIdx = input.indexOf(`]`, nextCursor)
  const objIdx = input.indexOf(`}`, nextCursor)
  const nearCursor = Math.min(...[commaIdx, arrIdx, objIdx].filter(v => v > -1))
  return nearCursor
}

const parseBoolean = (input, cursor) => {
  const isTrue = input[cursor] === 't'
  const val = isTrue ? true : false
  const newCursor = cursor + (isTrue ? 3 : 4)
  return [newCursor, val]
}

const parseNull = (cursor) => {
  const val = null
  const newCursor = cursor + 3
  return [newCursor, val]
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