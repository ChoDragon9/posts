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
  let pointer = createNode({})
  let i = 0
  while (i < j) {
    let cursor = i
    switch (true) {
      case isString(input[cursor]):
        cursor = parseString(input, cursor, pointer)
        break;
      case isNumber(input[cursor]):
        cursor = parseNumber(input, cursor, pointer)
        break;
      case isBoolean(input[cursor]):
        cursor = parseBoolean(input, cursor, pointer)
        break;
      case isNull(input[cursor]):
        cursor = parseNull(cursor, pointer)
        break;
      case isReference(input[cursor]):
        pointer = parseReference(input, cursor, pointer)
        break;
    }
    i = cursor + 1
  }
  return pointer.val
}

const addValue = (value, pointer) => {
  const {key, val} = pointer
  if (Array.isArray(val)) {
    val.push(value)
  } else {
    if(val) {
      if (key) {
        val[key] = value
        pointer.key = null
      } else {
        pointer.key = value
      }
    } else {
      pointer.val = value
    }
  }
}

const createNode = ({val = null, key = null, back = null}) => ({val, key, back})
const isString = v => v === `"`
const isObject = v => v === `{` || v === `}`
const isArray = v => v === `[` || v === `]`
const isReference = v => isObject(v) || isArray(v)
const isNumber = v => v === '-' || parseFloat(v) > -1
const isBoolean = v => v === 't' || v === 'f'
const isNull = v => v === 'n'

const parseReference = (input, cursor, pointer) => {
  let newPointer
  const delimiter = isObject(input[cursor]) ? `{` : `[`
  if (input[cursor] === delimiter) {
    const val = isObject(input[cursor]) ? {} : []
    addValue(val, pointer)
    newPointer = createNode({ val, back: pointer })
  } else {
    newPointer = pointer.back
  }
  return newPointer
}

const parseString = (input, cursor, pointer) => {
  const findString = index => input.indexOf(`"`, index + 1)
  let idx = findString(cursor)
  while (input[idx - 1] === `\\`) {
    idx = findString(idx)
  }
  const str = input.substring(cursor + 1, idx)
  addValue(str, pointer)
  return idx
}

const parseNumber = (input, cursor, pointer) => {
  const commaIdx = input.indexOf(`,`, cursor + 1)
  const arrIdx = input.indexOf(`]`, cursor + 1)
  const objIdx = input.indexOf(`}`, cursor + 1)
  const endCursor = Math.min(...[commaIdx, arrIdx, objIdx].filter(v => v > -1))
  let num = input.substring(cursor, endCursor).trim()
  num = parseFloat(num)
  addValue(num, pointer)
  return endCursor - 1
}

const parseBoolean = (input, cursor, pointer) => {
  const isTrue = input[cursor] === 't'
  const val = isTrue ? true : false
  const idx = cursor + (isTrue ? 3 : 4)
  addValue(val, pointer)
  return idx
}

const parseNull = (cursor, pointer) => {
  const val = null
  const idx = cursor + 3
  addValue(val, pointer)
  return idx
}

module.exports = {
  parser
}