const createNode = ({val = null, key = null, back = null}) => ({val, key, back})

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
  createNode,
  setValue,
  getValue,
  getBackword
}