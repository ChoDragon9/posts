const { node, getBackword, getValue, setValue } = require('./pointer')
const _ = require('./fp')

const parser = input => {
  input = trim(iput)
  let pointer = node({})
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

const isString = _.same(`"`)
const isObject = _.alt(_.same('{'), _.same('}'))
const isArray = _.alt(_.same('['), _.same(']'))
const isReference = _.alt(isObject, isArray)
const isNumber = _.alt(_.same('-'), v => parseFloat(v) > -1)
const isBoolean = _.alt(_.same('t'), _.same('f'))
const isNull = _.same('n')

const parseReference = (cursorStr, pointer) => {
  return _.dispatch(
    _.bmatch(_.alt(_.same('}'), _.same(']')), _.always(getBackword(pointer))),
    v => {
      const val = _.dispatch(
        _.bmatch(_.same('{'), _.always({})),
        _.bmatch(_.same('['), _.always([])),
      )(v)
      setValue(pointer, val)
      return node({val}, pointer)
    }
  )(cursorStr)
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
    end = _.go(input[cursor - 1], _.same(`\\`), _.not)
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
  const isTrue = _.same(input[cursor])('t')
  return [
    cursor + (isTrue ? 3 : 4),
    isTrue ? true : false
  ]
}

const parseNull = cursor => [cursor + 3, null]

module.exports = { parser }