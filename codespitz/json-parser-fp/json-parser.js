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
    _.dispatch(
      _.bmatch(isReference, cursorStr => {
        pointer = parseReference(cursorStr, pointer)
      }),
      cursorStr => {
        let val
        [cursor, val] = _.dispatch(
          _.bmatch(isString, () => parseString(input, cursor)),
          _.bmatch(isNumber, () => parseNumber(input, cursor)),
          _.bmatch(isBoolean, () => parseBoolean(input, cursor)),
          _.bmatch(isNull, () => parseNull(cursor)),
          () => [cursor, undefined]
        )(cursorStr)
        _.bmatch(
          _.pipe(_.isUndefined, _.not),
          val => setValue(pointer, val)
        )(val)
      }
    )(input[cursor])
    return cursor + 1
  })
  return getValue(pointer)
}

const isString = v => v === `"`
const isObject = v => v === `{` || v === `}`
const isArray = v => v === `[` || v === `]`
const isReference = _.alt(isObject, isArray)
const isNumber = v => v === '-' || parseFloat(v) > -1
const isBoolean = v => v === 't' || v === 'f'
const isNull = v => v === 'n'

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

const parseString = (input, cursor) => {
  const newCursor = findEndString(input, cursor)
  const str = input.substring(cursor + 1, newCursor)
  return [newCursor, str]
}

const findEndString = (input, cursor) => {
  let end = false
  while (_.not(end)) {
    cursor = input.indexOf(`"`, cursor + 1)
    end = _.not(input[cursor - 1] === `\\`)
  }
  return cursor
}

const parseNumber = (input, cursor) => {
  const nearCursor = findEndNumber(input, cursor)
  const num = parseFloat(input.substring(cursor, nearCursor))
  return [nearCursor - 1, num]
}

const findEndNumber = (input, cursor) => {
  return _.pipe(
    _.map(v => input.indexOf(v, cursor + 1)),
    _.filter(v => v > -1),
    _.min
  )([`,`, `]`, `}`])
}

const parseBoolean = (input, cursor) => {
  const isTrue = input[cursor] === 't'
  return [
    cursor + (isTrue ? 3 : 4),
    isTrue ? true : false
  ]
}

const parseNull = cursor => [cursor + 3, null]

module.exports = { parser }