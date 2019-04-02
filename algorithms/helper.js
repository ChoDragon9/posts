let count = 1

const test = ({find, map, startPoint, endPoint, result}) => {
  const path = toStr(find(map, startPoint, endPoint))
  const resultPath = toStr(result)
  if (path === resultPath) {
    console.log(`[${count++}][Success]`, startPoint, endPoint)
  } else {
    console.log(`[${count++}][Fail]`, startPoint, endPoint)
    console.log('path  ', path)
    console.log('result', resultPath)
    console.log('-----------------------')
  }
}

const toStr = arr => {
  return arr.map(item => item.join(',')).join(',')
}

module.exports = {test}