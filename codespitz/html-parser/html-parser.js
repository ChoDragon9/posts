const parser = input => {
  input = input.trim()
  const result = { name: 'ROOT', type: 'node', children: [] }
  const stack = [{tag: result}]
  let curr, i = 0, j = input.length
  while (curr = stack.pop()) {
    while (i < j) {
      const cursor = i
      if (input[cursor] === '<') { // A, B의 경우
        // idx는 <div>, </a>, <img/>경우가 나온다.
        const idx = input.indexOf('>', cursor)
        // idx는 3가지 경우의 공통임으로 i를 얻을 수 있다.
        i = idx + 1
        if (input[cursor + 1] === '/') { // </a>
          curr = curr.back
        } else { // <div>, <img/>
          if(elementNode(input, cursor, idx, curr, stack)) {
            break
          }
        }
      } else { // C의 경우
        // 다음 태그의 위치전까지 택스트로 본다.
        i = textNode(input, cursor, curr)
      }
    }
  }
  return result
}

const elementNode = (input, cursor, idx, curr, stack) => {
  const isClose = input[idx - 1] === '/'
  const tag = {
    type: 'node',
    name: input.substring(cursor + 1, idx - (isClose ? 1 : 0)),
    children: []
  }
  curr.tag.children.push(tag)
  if (!isClose) {
    stack.push({tag, back: curr})
    return true
  }
  return false
}

const textNode = (input, cursor, curr) => {
  const idx = input.indexOf('<', cursor)
  curr.tag.children.push({
    type: 'text',
    text: input.substring(cursor, idx)
  })
  return idx
}

module.exports = {
  parser
}