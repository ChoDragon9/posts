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
  const j = input.length - 1
  let curr = {val: result, key: null, back: null}
  let i = 1
  while (i < j) {
    const cursor = i
    if (isString(input[cursor])) {
      const {idx} = parseString(input, cursor, curr)
      i = idx + 1
    } else  if (isNumber(input[cursor])){
      const {idx} = parseNumber(input, cursor, curr, j)
      i = idx + 1
    } else if (isBoolean(input[cursor])) {
      const {idx} = parseBoolean(input, cursor, curr)
      i = idx + 1
    } else if (isNull(input[cursor])) {
      const {idx} = parseNull(cursor, curr)
      i = idx + 1
    } else {
      if (isObject(input[cursor])) {
        const {newCurr} = parseObject(input, cursor, curr)
        curr = newCurr
      } else if (isArray(input[cursor])) {
        const {newCurr} = parseArray(input, cursor, curr)
        curr = newCurr
      }
      i++
    }
  }
  return result
}

const addValue = (value, curr) => {
  const {key, val} = curr
  if (Array.isArray(val)) {
    val.push(value)
  } else {
    if (key) {
      val[key] = value
      curr.key = null
    } else {
      curr.key = value
    }
  }
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
  return {newCurr}
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
  return {newCurr}
}

const parseNumber = (input, cursor, curr, j) => {
  const commaIdx = input.indexOf(`,`, cursor + 1)
  let idx = cursor
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