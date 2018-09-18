/**
 * @see https://www.json.org/
 * @see http://seriot.ch/parsing_json.php#5
 * Value: String, Number, Object, Array,
 *        true, false, null
 * Object: {String: Value}
 * Array: [Value[, ...Value]]
 */
const parser = input => {
  input = input.trim()
  const j = input.length
  let curr = link({})
  let i = 0
  while (i < j) {
    let cursor = i
    switch (true) {
      case isString(input[cursor]):
        cursor = parseString(input, cursor, curr)
        break;
      case isNumber(input[cursor]):
        cursor = parseNumber(input, cursor, curr)
        break;
      case isBoolean(input[cursor]):
        cursor = parseBoolean(input, cursor, curr)
        break;
      case isNull(input[cursor]):
        cursor = parseNull(cursor, curr)
        break;
      case isObject(input[cursor]):
        curr = parseObject(input, cursor, curr)
        break;
      case isArray(input[cursor]):
        curr = parseArray(input, cursor, curr)
        break;
      default:
        i++
        break;
    }
    i = cursor + 1
  }
  return curr.val
}

const addValue = (value, curr) => {
  const {key, val} = curr
  if (Array.isArray(val)) {
    val.push(value)
  } else if(val) {
    if (key) {
      val[key] = value
      curr.key = null
    } else {
      curr.key = value
    }
  } else {
    curr.val = value
  }
}

const link = ({val = null, key = null, back = null}) => ({val, key, back})
const isString = v => v === `"`
const isObject = v => v === `{` || v === `}`
const isArray = v => v === `[` || v === `]`
const isReference = v => isObject(v) || isArray(v)
const isNumber = v => v === '-' || parseInt(v) > -1
const isBoolean = v => v === 't' || v === 'f'
const isNull = v => v === 'n'

const parseString = (input, cursor, curr) => {
  let idx = input.indexOf(`"`, cursor + 1)
  let count = 0, max = 10000
  while (input[idx - 1] === `\\` && count < max) {
    idx = input.indexOf(`"`, idx + 1)
    count++
  }
  if (count === max) {
    throw new Error('overflow count in parseString')
  }
  let str = input.substring(cursor + 1, idx)
  addValue(str, curr)
  return idx
}

const parseObject = (input, cursor, curr) => {
  let newCurr
  if (input[cursor] === `{`) {
    const val = {}
    addValue(val, curr)
    newCurr = link({ val, back: curr })
  } else {
    newCurr = curr.back
  }
  return newCurr
}

const parseArray = (input, cursor, curr) => {
  let newCurr
  if (input[cursor] === `[`) {
    const val = []
    addValue(val, curr)
    newCurr = link({ val, back: curr })
  } else {
    newCurr = curr.back
  }
  return newCurr
}

const parseNumber = (input, cursor, curr) => {
  const commaIdx = input.indexOf(`,`, cursor + 1)
  const arrIdx = input.indexOf(`]`, cursor + 1)
  const objIdx = input.indexOf(`}`, cursor + 1)
  let idx = cursor
  let num
  const endCursor = Math.min(...[commaIdx, arrIdx, objIdx].filter(v => v > -1))
  if (endCursor > -1) {
    num = input.substring(cursor, endCursor)
    idx = endCursor - 1
  } else {
    num = input.substring(cursor, j)
    idx = input.length
  }
  num = num.trim()
  num = parseInt(num)
  addValue(num, curr)
  return idx
}

const parseBoolean = (input, cursor, curr) => {
  let val, idx
  if (input[cursor] === 't') {
    val = true
    idx = cursor + 3
  } else {
    val = false
    idx = cursor + 4
  }
  addValue(val, curr)
  return idx
}

const parseNull = (cursor, curr) => {
  const val = null
  const idx = cursor + 3
  addValue(val, curr)
  return idx
}

module.exports = {
  parser
}