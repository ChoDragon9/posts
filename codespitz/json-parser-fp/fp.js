const isUndefined = v => typeof v === 'undefined'
const isString = v => typeof v === 'string'
const not = v => !v
const trim = v => v.trim()

const step = (str, pred) => {
  if (not(isString(str))) {
    return
  }
  let index = 0
  const len = str.length
  while (index < len) {
    const char = str[index]
    const nextStep = pred({char, index, str})
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

const dispatch = (...fns) => {
  return (...args) => {
    for (let fn of fns) {
      const ret = fn(...args)
      if (not(isUndefined(ret))) {
        return ret
      }
    }
  }
}

const go = (val, ...fns) => {
  for (let fn of fns) {
    val = fn(val)
  }
  return val
}

module.exports = {
  step,
  not,
  isUndefined,
  trim,
  go,
  dispatch
}