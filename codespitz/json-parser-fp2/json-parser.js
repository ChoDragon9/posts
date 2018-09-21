const Stack = require('./stack')
const _ = require('./fp')

const parser = input => {
  const stack = new Stack()
  _.step(_.trim(input), (char, index, input) => {
    const cursor = _.switchCase({char, input, index, stack})
    (
      _.match(isObject, parseObject),
      _.match(isArray, parseArray),
      _.match(isString, parseString),
      _.match(isNumber, parseNumber),
      _.match(isBoolean, parseBoolean),
      _.match(isNull, parseNull),
      ({index}) => index
    )
    return cursor + 1
  })
  return stack.getValue()
}

const isObject = ({char}) => _.alt(_.same('{'), _.same('}'))(char)
const isArray = ({char}) => _.alt(_.same('['), _.same(']'))(char)
const isString = ({char}) => _.same(`"`)(char)
const isNumber = ({char}) => _.alt(_.same('-'), v => parseFloat(v) > -1)(char)
const isBoolean = ({char}) => _.alt(_.same('t'), _.same('f'))(char)
const isNull = ({char}) => _.same('n')(char)

const parseObject = ({char, input, index, stack}) => {
  _.switchCase(char)
  (
    _.match(_.same('}'), _ => stack.backword()),
    _.match(_.same('{'), _ => stack.forword({}))
  )
  return index
}

const parseArray = ({char, input, index, stack}) => {
  _.switchCase(char)
  (
    _.match(_.same(']'), _ => stack.backword()),
    _.match(_.same('['), _ => stack.forword([]))
  )
  return index
}

const parseString = ({input, index, stack}) => {
  let end = false
  let cursor = index
  while (_.not(end)) {
    cursor = input.indexOf(`"`, cursor + 1)
    end = _.go(input[cursor - 1], _.same(`\\`), _.not)
  }
  stack.setValue(_.substr(input, index + 1, cursor))
  return cursor
}

const parseNumber = ({input, index, stack}) => {
  const cursor = _.pipe(
    _.map(v => input.indexOf(v, index + 1)),
    _.filter(v => v > -1),
    _.min
  )([`,`, `]`, `}`])
  const num = parseFloat(_.substr(input, index, cursor))
  stack.setValue(num)
  return cursor - 1
}

const parseBoolean = ({char, input, index, stack}) => {
  const isTrue = _.same(char)('t')
  stack.setValue(isTrue ? true : false)
  return index + (isTrue ? 3 : 4)
}

const parseNull = ({input, index, stack}) => {
  stack.setValue(null)
  return index + 3
}

module.exports = { parser }