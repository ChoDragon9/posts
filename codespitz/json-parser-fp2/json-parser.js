const { node, getBackword, getValue, setValue } = require('./pointer')
const _ = require('./fp')

const parser = input => {
  let current = node()
  _.step(_.trim(input), (char, index, input) => {
    const {newPointer, cursor} = _.switchcase({char, input, index, current})
    (
      _.match(isObject, parseObject),
      _.match(isArray, parseArray),
      _.match(isString, parseString),
      _.match(isNumber, parseNumber),
      _.match(isBoolean, parseBoolean),
      _.match(isNull, parseNull),
      ({index, current}) => ({newPointer: current, cursor: index})
    )
    current = newPointer
    return cursor + 1
  })
  return getValue(current)
}

const isObject = ({char}) => _.alt(_.same('{'), _.same('}'))(char)
const isArray = ({char}) => _.alt(_.same('['), _.same(']'))(char)
const isString = ({char}) => _.same(`"`)(char)
const isNumber = ({char}) => _.alt(_.same('-'), v => parseFloat(v) > -1)(char)
const isBoolean = ({char}) => _.alt(_.same('t'), _.same('f'))(char)
const isNull = ({char}) => _.same('n')(char)

const parseObject = ({char, input, index, current}) => {
  return {
    newPointer: _.switchcase(char)
      (
        _.match(_.same('}'), _.always(getBackword(current))),
        _ => {
          const val = {}
          setValue(current, val)
          return node(val, current)
        }
      ),
    cursor: index
  }
}

const parseArray = ({char, input, index, current}) => {
  return {
    newPointer: _.switchcase(char)
      (
        _.match(_.same(']'), _.always(getBackword(current))),
        _ => {
          const val = []
          setValue(current, val)
          return node(val, current)
        }
      ),
    cursor: index
  }
}

const parseString = ({input, index, current}) => {
  let end = false
  let cursor = index
  while (_.not(end)) {
    cursor = input.indexOf(`"`, cursor + 1)
    end = _.go(input[cursor - 1], _.same(`\\`), _.not)
  }
  setValue(current, _.substr(input, index + 1, cursor))
  return {newPointer: current, cursor}
}

const parseNumber = ({input, index, current}) => {
  const cursor = _.pipe(
    _.map(v => input.indexOf(v, index + 1)),
    _.filter(v => v > -1),
    _.min
  )([`,`, `]`, `}`])
  const num = parseFloat(_.substr(input, index, cursor))
  setValue(current, num)
  return {newPointer: current, cursor: cursor - 1}
}

const parseBoolean = ({char, input, index, current}) => {
  const isTrue = _.same(char)('t')
  setValue(current, isTrue ? true : false)
  return {
    newPointer: current,
    cursor: index + (isTrue ? 3 : 4)
  }
}

const parseNull = ({input, index, current}) => {
  setValue(current, null)
  return {
    newPointer: current,
    cursor: index + 3
  }
}

module.exports = { parser }