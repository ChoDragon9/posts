const isString = v => v === `"`
const isObject = v => v === `{` || v === `}`
const isArray = v => v === `[` || v === `]`
const isReference = v => isObject(v) || isArray(v)
const isNumber = v => v === '-' || parseFloat(v) > -1
const isBoolean = v => v === 't' || v === 'f'
const isNull = v => v === 'n'

const alt = (fn1, fn2) => val => (fn1(val) ? fn2(val) : val)
const pipe = (...fns) => val => {
  for (const fn of fns) {
    val = fn(val)
  }
  return val
}

module.exports = {
  isString,
  isObject,
  isReference,
  isNumber,
  isBoolean,
  isNull
}