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
  let curr = {val: null, key: null, back: null}
  let i = 0
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

const isString = v => v === `"`
const isObject = v => v === `{` || v === `}`
const isArray = v => v === `[` || v === `]`
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
    idx = cursor + 3
  } else {
    val = false
    idx = cursor + 4
  }
  addValue(val, curr)
  return {idx}
}

const parseNull = (cursor, curr) => {
  const val = null
  const idx = cursor + 3
  addValue(val, curr)
  return {idx}
}

module.exports = {
  parser
}