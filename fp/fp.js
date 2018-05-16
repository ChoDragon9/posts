const each = iter => (list) => {
  for (let i = 0, len = list.length; i < len; i++) {
    iter(list[i], i, list, len)
  }
  return list
}
const loop = iter => len => {
  for (let i = 0; i < len; i++) {
    iter(i, len)
  }
  return len
}
const map = iter => list => {
  const newList = []
  each(item => {
    newList.push(iter(item))
  })(list)
  return newList
}
const filter = iter => list => {
  const newList = []
  each(item => {
    if (iter(item)) {
      newList.push(item)
    }
  })(list)
  return newList
}
const find = iter => list => {
  for (let i = 0, len = list.length; i < len; i++) {
    if (iter(list[i], i, list)) return list[i]
  }
  return null
}
const findIndex = iter => list => {
  for (let i = 0, len = list.length; i < len; i++) {
    if (iter(list[i], i, list)) return i
  }
  return -1
}
const reduce = (init, iter) => list => {
  each((item) => {
    init = iter(init, item)
  })(list)
  return init
}
const pipe = (...fns) => res => {
  return reduce(res, (res, fn) => fn(res))(fns)
}
const divEq = (...fns) => val => { // Divided Equal
  each((fn) => fn(val))(fns)
  return val
}
const isUndefined = (obj) => typeof obj === 'undefined'
const negate = v => !v
const clone = (obj) => {
  if (typeof (obj) !== 'object') {
    return obj
  }

  var copiedObj = obj.constructor()

  for (var attr in obj) {
    if (obj.hasOwnProperty(attr)) {
      copiedObj[attr] = clone(obj[attr])
    }
  }

  return copiedObj
}
const merge = (defaultOptions, _options) => {
  var newOptions = clone(_options)

  for (var keyName in defaultOptions) {
    if (isUndefined(newOptions[keyName])) {
      newOptions[keyName] = defaultOptions[keyName]
    }
  }

  return newOptions
}

module.exports = {
  each,
  loop,
  map,
  filter,
  find,
  findIndex,
  reduce,
  pipe,
  divEq,
  isUndefined,
  negate,
  clone,
  merge
}
