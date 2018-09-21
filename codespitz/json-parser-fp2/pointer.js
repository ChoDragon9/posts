const node = (val = null, back = null) => ({val, back, key: null})

const setValue = (pointer, value) => {
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

const getValue = pointer => pointer.val
const getBackword = pointer => pointer.back

module.exports = {
  node,
  setValue,
  getValue,
  getBackword
}