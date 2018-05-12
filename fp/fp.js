((w) => {
  w.each = iter => (list) => {
    for (let item of list) {
      iter(item)
    }
    return list
  }
  w.map = iter => list => {
    const newList = []
    w.each(item => {
      newList.push(iter(item))
    })(list)
    return newList
  }
  w.filter = iter => list => {
    const newList = []
    w.each(item => {
      if (iter(item)) {
        newList.push(item)
      }
    })(list)
    return newList
  }
  w.find = iter => list => {
    for (let item of list) {
      if (iter(item)) return item
    }
  }
  w.reduce = (init, iter) => list => {
    w.each((item) => {
      init = iter(init, item)
    })(list)
    return init
  }
  w.pipe = (...fns) => res => {
    return w.reduce(res, (res, fn) => fn(res))(fns)
  }
})(typeof global === 'object' ? global : window)