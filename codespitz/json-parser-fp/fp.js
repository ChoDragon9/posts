const isUndefined = v => typeof v === 'undefined'
const not = v => !v
const step = (str, pred) => {
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

module.exports = {
  step
}