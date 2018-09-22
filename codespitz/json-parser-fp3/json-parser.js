const Stack = require('./stack')
const {
  pipe,
  bmatch,
  dispatch,
  go,
  isUndefined,
  not
} = require('./fp')

const parser = input => {
  let index = 0
  const length = input.length
  const stack = new Stack()
  while (index < length) {
    const char = input[index]
    let cursor = index
    pipe(
      dispatch(
        bmatch(isObject, parseObject),
        bmatch(isArray, parseArray),
        bmatch(isString, parseString),
        bmatch(isNumber, parseNumber),
        bmatch(isBoolean, parseBoolean),
        bmatch(isNull, parseNull)
      ),
      bmatch(
        pipe(isUndefined, not),
        newCursor => (cursor = newCursor)
      )
    )({input, cursor, stack, char})
    index = cursor + 1
  }
  return stack.getValue()
}

const isObject = ({char: v}) => v === `{` || v === `}`
const isArray = ({char: v}) => v === `[` || v === `]`
const isString = ({char: v}) => v === `"`
const isNumber = ({char: v}) => v === '-' || parseFloat(v) > -1
const isBoolean = ({char: v}) => v === 't' || v === 'f'
const isNull = ({char: v}) => v === 'n'

const parseObject = ({char, stack}) => {
  char === `{` ? stack.forword({}) : stack.backword()
}

const parseArray = ({char, stack}) => {
  char === `[` ? stack.forword([]) : stack.backword()
}

const parseString = ({input, cursor, stack}) => {
  const newCursor = findEndString({input, cursor})
  const str = input.substring(cursor + 1, newCursor)
  stack.setValue(str)
  return newCursor
}

const findEndString = ({input, cursor}) => {
  let end = false
  while (!end) {
    cursor = input.indexOf(`"`, cursor + 1)
    end = input[cursor - 1] !== `\\`
  }
  return cursor
}

const parseNumber = ({input, cursor, stack}) => {
  const nearCursor = findEndNumber({input, cursor})
  let num = input.substring(cursor, nearCursor).trim()
  num = parseFloat(num)
  stack.setValue(num)
  return nearCursor - 1
}

const findEndNumber = ({input, cursor}) => {
  return Math.min(
    ...[`,`, `]`, `}`]
      .map(str => input.indexOf(str, cursor + 1))
      .filter(v => v > -1)
  )
}

const parseBoolean = ({input, cursor, stack}) => {
  const isTrue = input[cursor] === 't'
  stack.setValue(isTrue ? true : false)
  return cursor + (isTrue ? 3 : 4)
}

const parseNull = ({cursor, stack}) => {
  stack.setValue(null)
  return cursor + 3
}

module.exports = { parser }