const { node, getBackword, getValue, setValue } = require('./pointer')
const _ = require('./fp')

const parser = input => {
  let pointer = node({})
  input = _.trim(input)
  _.step(input, (char, index, input) => {
    const {newPointer, cursor} = _.dispatch(
      _.bmatch(isReference, parseReference),
      _.bmatch(isString, parseString),
      _.bmatch(isNumber, parseNumber),
      _.bmatch(isBoolean, parseBoolean),
      _.bmatch(isNull, parseNull),
      ({index, pointer}) => ({newPointer: pointer, cursor: index})
    )({input, index, pointer})
    pointer = newPointer
    return cursor + 1
  })
  return getValue(pointer)
}

const isString = ({input, index}) => _.same(`"`)(input[index])
const isObject = ({input, index}) => _.alt(_.same('{'), _.same('}'))(input[index])
const isArray = ({input, index}) => _.alt(_.same('['), _.same(']'))(input[index])
const isReference = ({input, index}) => _.alt(isObject, isArray)({input, index})
const isNumber = ({input, index}) => _.alt(_.same('-'), v => parseFloat(v) > -1)(input[index])
const isBoolean = ({input, index}) => _.alt(_.same('t'), _.same('f'))(input[index])
const isNull = ({input, index}) => _.same('n')(input[index])

const parseReference = ({input, index, pointer}) => {
  const newPointer = _.dispatch(
    _.bmatch(
      _.alt(_.same('}'), _.same(']')),
      _ => getBackword(pointer)
    ),
    v => {
      const val = _.dispatch(
        _.bmatch(_.same('{'), _.always({})),
        _.bmatch(_.same('['), _.always([])),
      )(v)
      setValue(pointer, val)
      return node({val}, pointer)
    }
  )(input[index])
  return {newPointer, cursor: index}
}

const parseString = ({input, index, pointer}) => {
  const cursor = findEndString(input, index)
  const str = input.substring(index + 1, cursor)
  setValue(pointer, str)
  return {newPointer: pointer, cursor}
}

const findEndString = (input, cursor) => {
  let end = false
  while (_.not(end)) {
    cursor = input.indexOf(`"`, cursor + 1)
    end = _.go(input[cursor - 1], _.same(`\\`), _.not)
  }
  return cursor
}

const parseNumber = ({input, index, pointer}) => {
  const cursor = findEndNumber(input, index)
  const num = parseFloat(input.substring(index, cursor))
  setValue(pointer, num)
  return {newPointer: pointer, cursor: cursor - 1}
}

const findEndNumber = (input, cursor) => {
  return _.pipe(
    _.map(v => input.indexOf(v, cursor + 1)),
    _.filter(v => v > -1),
    _.min
  )([`,`, `]`, `}`])
}

const parseBoolean = ({input, index, pointer}) => {
  const isTrue = _.same(input[index])('t')
  setValue(pointer, isTrue ? true : false)
  return {
    newPointer: pointer,
    cursor: index + (isTrue ? 3 : 4)
  }
}

const parseNull = ({input, index, pointer}) => {
  setValue(pointer, null)
  return {
    newPointer: pointer,
    cursor: index + 3
  }
}

module.exports = { parser }