/**
 * JSON {KEY: VALUE}
 * KEY: String, Number
 * VALUE: String, Number, Object, Array
 * Object: {KEY: VALUE}
 * Array: [VALUE[, ...VALUE]]
 */
const json = {
  "key": "value",
  "num": 0,
  "arr": [],
  "obj": {}
}
const parser = input => {
  input = input.trim()
  const result = {}
  let curr = result
  let i = 1, j = input.length - 1
  let key
  while (i < j) {
    const cursor = i
    if (input[cursor] === `"`) {
      const idx = input.indexOf(`"`, cursor + 1)
      const str = input.substring(cursor + 1, idx)
      if (key) {
        curr[key] = str
        key = null
      } else {
        key = str
      }
      i = idx + 1
    }
    i++
  }
  return result
}

module.exports = {
  parser
}