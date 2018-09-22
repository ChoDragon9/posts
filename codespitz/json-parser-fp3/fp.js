const pipe = (...fns) => val => {
  for (const fn of fns) {
    val = fn(val)
  }
  return val
}
const bmatch = (fn1, fn2) => val => (fn1(val) ? fn2(val) : undefined)
const dispatch = (...fns) => (...args) => {
  for (const fn of fns) {
    const result = fn(...args)
    if (go(result, isUndefined, not)) {
      return result
    }
  }
}
const go = (val, ...fns) => {
  for (const fn of fns) {
    val = fn(val)
  }
  return val
}
const isUndefined = v => typeof v === 'undefined'
const not = v => !v

module.exports = {
  pipe,
  bmatch,
  dispatch,
  go,
  isUndefined,
  not
}