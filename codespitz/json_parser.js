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
  let back
  while (i < j) {
    const cursor = i
    if (input[cursor] === `"`) {
      const idx = input.indexOf(`"`, cursor + 1)
      const str = input.substring(cursor + 1, idx)
      if (Array.isArray(curr)) {
        curr.push(str)
      } else {
        if (key) {
          curr[key] = str
          key = null
        } else {
          key = str
        }
      }
      i = idx + 1
    } else {
      let idx = cursor
      if (input[cursor] === `}`) {
        curr = back
        key = null
      } else if (input[cursor] === `{`) {
        const newVal = {}
        curr[key] = newVal
        key = null
        back = curr
        curr = newVal
      } else if (input[cursor] === `]`) {
        curr = back
        key = null
      } else if (input[cursor] === `[`) {
        const newVal = []
        curr[key] = newVal
        key = null
        back = curr
        curr = newVal
      } else {
        if (input[cursor] === '-' || parseInt(input[cursor]) > -1) {
          const commaIdx = input.indexOf(`,`, cursor + 1)
          let num
          if (commaIdx > -1) {
            num = parseInt(input.substring(cursor, commaIdx).trim())
            idx = commaIdx + 1
          } else {
            num = parseInt(input.substring(cursor, j).trim())
            idx = j
          }
          curr[key] = num
          key = null
        }
      }
      i = idx + 1
    }
  }
  return result
}

module.exports = {
  parser
}