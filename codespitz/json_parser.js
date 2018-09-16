/**
 * @see https://www.json.org/
 * Value: String, Number, Object, Array,
 *        true, false, null
 * Object: {String: Value}
 * Array: [Value[, ...Value]]
 */
const parser = input => {
  input = input.trim()
  const result = {}
  let curr = {val: result, key: null, back: null}
  let i = 1, j = input.length - 1
  while (i < j) {
    const cursor = i
    if (isObject(input[cursor])) {
      const {idx, newCurr} = parseObject(input, cursor, curr)
      curr = newCurr
      i = idx + 1
    } else if (isArray(input[cursor])) {
      const {idx, newCurr} = parseArray(input, cursor, curr)
      curr = newCurr
      i = idx + 1
    } else if (isNumber(input[cursor])){
      const {idx} = parseNumber(input, cursor, curr, j)
      i = idx + 1
    } else if (isBoolean(input[cursor])) {
      const {idx} = parseBoolean(input, cursor, curr)
      i = idx + 1
    } else if (isNull(input[cursor])) {
      const {idx} = parseNull(cursor, curr)
      i = idx + 1
    } else if (isString(input[cursor])) {
      const {idx} = parseString(input, cursor, curr)
      i = idx + 1
    } else {
      i++
    }
  }
  return result
}

const addValue = ( value, curr) => {
  let key = curr.key
  let newKey = key
  if (Array.isArray(curr.val)) {
    curr.val.push(value)
  } else {
    if (key) {
      curr.val[key] = value
      newKey = null
    } else {
      newKey = value
    }
  }
  curr.key = newKey
}

const isString = v => v === `"`
const isObject = v => v === `{` || v === `}`
const isArray = v => v === `[` || v === `]`
const isNumber = v => v === '-' || parseInt(v) > -1
const isBoolean = v => v === 't' || v === 'f'
const isNull = v => v === 'n'

const parseString = (input, cursor, curr) => {
  const idx = input.indexOf(`"`, cursor + 1)
  const str = input.substring(cursor + 1, idx)
  addValue(str, curr)
  return {idx}
}

const parseObject = (input, cursor, curr) => {
  let newCurr
  if (input[cursor] === `{`) {
    const newVal = {}
    addValue(newVal, curr)
    newCurr = {
      val: newVal,
      back: curr
    }
  } else {
    newCurr = curr.back
  }
  return {idx: cursor, newCurr}
}

const parseArray = (input, cursor, curr) => {
  let newCurr
  if (input[cursor] === `[`) {
    const newVal = []
    addValue(newVal, curr)
    newCurr = {
      val: newVal,
      back: curr
    }
  } else {
    newCurr = curr.back
  }
  return {idx: cursor, newCurr}
}

const parseNumber = (input, cursor, curr, j) => {
  let idx = cursor
  const commaIdx = input.indexOf(`,`, cursor + 1)
  let num
  if (commaIdx > -1) {
    num = input.substring(cursor, commaIdx)
    idx = commaIdx + 1
  } else {
    num = input.substring(cursor, j)
    idx = j
  }
  num = num.trim()
  num = parseInt(num)
  addValue(num, curr)
  return {idx}
}

const parseBoolean = (input, cursor, curr) => {
  let val, idx
  if (input[cursor] === 't') {
    val = true
    idx = cursor + 4
  } else {
    val = false
    idx = cursor + 5
  }
  addValue(val, curr)
  return {idx}
}

const parseNull = (cursor, curr) => {
  const val = null
  const idx = cursor + 4
  addValue(val, curr)
  return {idx}
}

module.exports = {
  parser
}