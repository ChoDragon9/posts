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
    const cursor = str[index]
    const nextStep = pred({cursor, index, str})
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
  let ret
  for (let fn of fns) {
    ret = fn(val)
  }
  return ret
}

module.exports = {
  step,
  not,
  isUndefined,
  trim,
  dispatch
}