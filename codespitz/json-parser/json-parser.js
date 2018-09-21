const Stack = require('./stack')

const parser = input => {
  input = input.trim()
  let i = 0
  const j = input.length
  const stack = new Stack()
  while (i < j) {
    let cursor = i
    const cursorStr = input[cursor]
    if (isReference(cursorStr)) {
      parseReference(input, cursor, stack)
    } else {
      switch (true) {
        case isString(cursorStr):
          cursor = parseString(input, cursor, stack)
          break;
        case isNumber(cursorStr):
          cursor = parseNumber(input, cursor, stack)
          break;
        case isBoolean(cursorStr):
          cursor = parseBoolean(input, cursor, stack)
          break;
        case isNull(cursorStr):
          cursor = parseNull(cursor, stack)
          break;
      }
    }
    i = cursor + 1
  }
  return stack.getValue()
}

const isString = v => v === `"`
const isObject = v => v === `{` || v === `}`
const isArray = v => v === `[` || v === `]`
const isReference = v => isObject(v) || isArray(v)
const isNumber = v => v === '-' || parseFloat(v) > -1
const isBoolean = v => v === 't' || v === 'f'
const isNull = v => v === 'n'

const parseString = (input, cursor, stack) => {
  const newCursor = findEndString(input, cursor)
  const str = input.substring(cursor + 1, newCursor)
  stack.setValue(str)
  return newCursor
}

const findEndString = (input, cursor) => {
  let newCursor = findString(input, cursor)
  while (input[newCursor - 1] === `\\`) {
    newCursor = findString(input, newCursor)
  }
  return newCursor
}

const findString = (input, cursor) => input.indexOf(`"`, cursor + 1)

const parseNumber = (input, cursor, stack) => {
  const nearCursor = findEndNumber(input, cursor)
  const newCursor = nearCursor - 1
  let num = input.substring(cursor, nearCursor).trim()
  num = parseFloat(num)
  stack.setValue(num)
  return newCursor
}

const findEndNumber = (input, cursor) => {
  const nextCursor = cursor + 1
  const commaIdx = input.indexOf(`,`, nextCursor)
  const arrIdx = input.indexOf(`]`, nextCursor)
  const objIdx = input.indexOf(`}`, nextCursor)
  const nearCursor = Math.min(...[commaIdx, arrIdx, objIdx].filter(v => v > -1))
  return nearCursor
}

const parseBoolean = (input, cursor, stack) => {
  const isTrue = input[cursor] === 't'
  const val = isTrue ? true : false
  const newCursor = cursor + (isTrue ? 3 : 4)
  stack.setValue(val)
  return newCursor
}

const parseNull = (cursor, stack) => {
  const val = null
  const newCursor = cursor + 3
  stack.setValue(val)
  return newCursor
}

const parseReference = (cursorStr, stack) => {
  const delimiter = isObject(cursorStr) ? `{` : `[`
  if (cursorStr === delimiter) {
    stack.forword(isObject(cursorStr) ? {} : [])
  } else {
    stack.backword()
  }
}

module.exports = { parser }