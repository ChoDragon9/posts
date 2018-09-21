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
  go,
  alt,
  dispatch,
  step,
  isUndefined,
  not
} = require('./fp')

const parser = input => {
  input = input.trim()
  let pointer = createNode({})
  step(input, (char, index, input) => {
    let cursor = index
    go(
      go(input[cursor], dispatch(
        alt(isReference, v => {
          pointer = parseReference(v, pointer)
          return [cursor]
        }),
        alt(isString, () => parseString(input, cursor)),
        alt(isNumber, () => parseNumber(input, cursor)),
        alt(isBoolean, () => parseBoolean(input, cursor)),
        alt(isNull, () => parseNull(cursor)),
        () => [cursor, undefined]
      )),
      alt(
        ([, val]) => go(val, isUndefined, not),
        ([newCursor, val]) => {
          cursor = newCursor
          setValue(pointer, val)
        }
      )
    )
    return cursor + 1
  })
  return getValue(pointer)
}

const parseString = (input, cursor) => {
  const newCursor = findEndString(input, cursor)
  const str = input.substring(cursor + 1, newCursor)
  return [newCursor, str]
}

const findEndString = (input, cursor) => {
  let end = false
  while (not(end)) {
    cursor = input.indexOf(`"`, cursor + 1)
    end = go(input[cursor - 1] === `\\`, not)
  }
  return cursor
}

const parseNumber = (input, cursor) => {
  const nearCursor = findEndNumber(input, cursor)
  const newCursor = nearCursor - 1
  let num = input.substring(cursor, nearCursor).trim()
  num = parseFloat(num)
  return [newCursor, num]
}

const findEndNumber = (input, cursor) => {
  return go(
    [`,`, `]`, `}`].map(v => input.indexOf(v, cursor + 1)),
    v => v.filter(v => v > -1),
    args =>  Math.min(...args)
  )
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