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
const _ = require('./fp')

const parser = input => {
  input = input.trim()
  let pointer = createNode({})
  _.step(input, (char, index, input) => {
    let cursor = index
    _.go(input[cursor], _.dispatch(
      _.bmatch(isReference, v => {
        pointer = parseReference(v, pointer)
        return [cursor]
      }),
      v => {
        _.go(
          _.go(v, _.dispatch(
            _.bmatch(isString, () => parseString(input, cursor)),
            _.bmatch(isNumber, () => parseNumber(input, cursor)),
            _.bmatch(isBoolean, () => parseBoolean(input, cursor)),
            _.bmatch(isNull, () => parseNull(cursor)),
            () => [cursor, undefined]
          )),
          _.bmatch(
            ([, val]) => _.go(val, _.isUndefined, _.not),
            ([newCursor, val]) => {
              cursor = newCursor
              setValue(pointer, val)
            }
          )
        )
      }
    ))
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
  while (_.not(end)) {
    cursor = input.indexOf(`"`, cursor + 1)
    end = _.go(input[cursor - 1] === `\\`, _.not)
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
  return _.go(
    [`,`, `]`, `}`],
    _.map(v => input.indexOf(v, cursor + 1)),
    _.filter(v => v > -1),
    _.min
  )
}

const parseBoolean = (input, cursor) => {
  const isTrue = input[cursor] === 't'
  return [
    cursor + (isTrue ? 3 : 4),
    isTrue ? true : false
  ]
}

const parseNull = cursor => [cursor + 3, null]

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