const isUndefined = v => typeof v === 'undefined'
const isString = v => typeof v === 'string'
const not = v => !v
const trim = v => v.trim()
const identity = v => v

const step = (str, pred) => {
  if (not(isString(str))) {
    return
  }
  let index = 0
  const len = str.length
  while (index < len) {
    const char = str[index]
    const nextStep = pred(char, index, str)
    if (not(isUndefined(nextStep))) {
      if (nextStep < index) {
        break
      } else {
        index = nextStep
      }
    } else {
      index++
    }
  }
}

const go = (val, ...fns) => {
  for (const fn of fns) {
    val = fn(val)
  }
  return val
}

const alt = (fn1, fn2) => val => (fn1(val) ? fn2(val) : undefined)

const dispatch = (...fns) => (...args) => {
  for (const fn of fns) {
    const result = fn(...args)
    if (typeof result !== 'undefined') {
      return result
    }
  }
}

module.exports = {
  go,
  alt,
  dispatch,
  isUndefined,
  isString,
  not,
  trim,
  step,
  identity
}