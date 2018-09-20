const {
  isString,
  isNumber,
  isBoolean,
  isNull
} = require('./helper')
const {
  trim,
  dispatch
} = require('./fp')

const extractNonRef = dispatch(
  ({char, index, str}) => isString(char) ? extractString(str, index) : undefined,
  ({char, index, str}) => isNumber(char) ? extractNumber(str, index) : undefined,
  ({char, index, str}) => isBoolean(char) ? extractBoolean(str, index) : undefined,
  ({char, index}) => isNull(char) ? extractNull(index) : undefined,
  ({index}) => [index]
)

const extractString = (inputStr, index) => {
  const newCursor = findEndString(inputStr, index)
  const str = inputStr.substring(index + 1, newCursor)
  return [newCursor, str]
}

const findEndString = (inputStr, index) => {
  let newCursor = findString(inputStr, index)
  while (inputStr[newCursor - 1] === `\\`) {
    newCursor = findString(inputStr, newCursor)
  }
  return newCursor
}

const findString = (str, index) => str.indexOf(`"`, index + 1)

const extractNumber = (str, index) => {
  const nearCursor = findEndNumber(str, index)
  const newCursor = nearCursor - 1
  let num = trim(str.substring(index, nearCursor))
  num = parseFloat(num)
  return [newCursor, num]
}

const findEndNumber = (str, index) => {
  const nextCursor = index + 1
  const commaIdx = str.indexOf(`,`, nextCursor)
  const arrIdx = str.indexOf(`]`, nextCursor)
  const objIdx = str.indexOf(`}`, nextCursor)
  const nearCursor = Math.min(...[commaIdx, arrIdx, objIdx].filter(v => v > -1))
  return nearCursor
}

const extractBoolean = (str, index) => {
  const isTrue = str[index] === 't'
  const val = isTrue ? true : false
  const newCursor = index + (isTrue ? 3 : 4)
  return [newCursor, val]
}

const extractNull = (index) => {
  const val = null
  const newCursor = index + 3
  return [newCursor, val]
}

module.exports = {
  extractNonRef
}