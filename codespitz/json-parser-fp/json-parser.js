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
const {
  step,
  not,
  isUndefined,
  trim
} = require('./fp')

const parser = input => {
  input = trim(input)
  let pointer = createNode({})
  step(input, ({cursor, index, str}) => {
    if (isReference(cursor)) {
      pointer = parseReference(cursor, pointer)
    } else {
      let val
      switch (true) {
        case isString(cursor):
          [index, val] = parseString(str, index)
          break;
        case isNumber(cursor):
          [index, val] = parseNumber(str, index)
          break;
        case isBoolean(cursor):
          [index, val] = parseBoolean(str, index)
          break;
        case isNull(cursor):
          [index, val] = parseNull(index)
          break;
      }
      if (not(isUndefined(val))) {
        setValue(pointer, val)
      }
      return index + 1
    }
  })
  return getValue(pointer)
}

const parseString = (input, cursor) => {
  const newCursor = findEndString(input, cursor)
  const str = input.substring(cursor + 1, newCursor)
  return [newCursor, str]
}

const findEndString = (input, cursor) => {
  let newCursor = findString(input, cursor)
  while (input[newCursor - 1] === `\\`) {
    newCursor = findString(input, newCursor)
  }
  return newCursor
}

const findString = (input, cursor) => input.indexOf(`"`, cursor + 1)

const parseNumber = (input, cursor) => {
  const nearCursor = findEndNumber(input, cursor)
  const newCursor = nearCursor - 1
  let num = trim(input.substring(cursor, nearCursor))
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