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
      parseReference(cursorStr, stack)
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
  let end = false
  while (!end) {
    cursor = input.indexOf(`"`, cursor + 1)
    end = input[cursor - 1] !== `\\`
  }
  return cursor
}

const parseNumber = (input, cursor, stack) => {
  const nearCursor = findEndNumber(input, cursor)
  let num = input.substring(cursor, nearCursor).trim()
  num = parseFloat(num)
  stack.setValue(num)
  return nearCursor - 1
}

const findEndNumber = (input, cursor) => {
  return Math.min(
    ...[`,`, `]`, `}`]
      .map(v => input.indexOf(v, cursor + 1))
      .filter(v => v > -1)
  )
}

const parseBoolean = (input, cursor, stack) => {
  const isTrue = input[cursor] === 't'
  stack.setValue(isTrue ? true : false)
  return cursor + (isTrue ? 3 : 4)
}

const parseNull = (cursor, stack) => {
  stack.setValue(null)
  return cursor + 3
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