const parser = input => {
  input = input.trim()
  const result = { name: 'ROOT', type: 'node', children: [] }
  let curr = {tag: result}
  let i = 0, j = input.length
  while (i < j) {
    const cursor = i
    if (input[cursor] === '<') {
      const idx = input.indexOf('>', cursor)
      i = idx + 1
      if (input[cursor + 1] === '/') {
        curr = curr.back
      } else {
        const {isClose, tag} = elementNode(input, cursor, idx, curr)
        if (!isClose) {
          curr = {tag, back: curr}
        }
      }
    } else {
      i = textNode(input, cursor, curr)
    }
  }
  return result
}

const elementNode = (input, cursor, idx, curr) => {
  const isClose = input[idx - 1] === '/'
  const tag = {
    type: 'node',
    name: input.substring(cursor + 1, idx - (isClose ? 1 : 0)),
    children: []
  }
  curr.tag.children.push(tag)
  return {isClose, tag}
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