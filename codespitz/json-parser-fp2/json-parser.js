const { node, getBackword, getValue, setValue } = require('./pointer')
const _ = require('./fp')

const parser = input => {
  let pointer = node()
  _.step(_.trim(input), (char, index, input) => {
    const {newPointer, cursor} = _.dispatch(
      _.match(isReference, parseReference),
      _.match(isString, parseString),
      _.match(isNumber, parseNumber),
      _.match(isBoolean, parseBoolean),
      _.match(isNull, parseNull),
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
    _.match(
      _.alt(_.same('}'), _.same(']')),
      _ => getBackword(pointer)
    ),
    v => {
      const val = _.dispatch(
        _.match(_.same('{'), _.always({})),
        _.match(_.same('['), _.always([])),
      )(v)
      setValue(pointer, val)
      return node(val, pointer)
    }
  )(input[index])
  return {newPointer, cursor: index}
}

const parseString = ({input, index, pointer}) => {
  let end = false
  let cursor = index
  while (_.not(end)) {
    cursor = input.indexOf(`"`, cursor + 1)
    end = _.go(input[cursor - 1], _.same(`\\`), _.not)
  }
  setValue(pointer, _.substr(input, index + 1, cursor))
  return {newPointer: pointer, cursor}
}

const parseNumber = ({input, index, pointer}) => {
  const cursor = findEndNumber(input, index)
  const num = parseFloat(_.substr(input, index, cursor))
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