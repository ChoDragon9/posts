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

/**
 * Attribute: Name="Value"
 * Attribute: Name='Value'
 * <TAG Attribute Attribute></TAG>
 * <TAG Attribute Attribute/>
 */
const elementNode = (input, cursor, idx, curr) => {
  const isClose = input[idx - 1] === '/'
  let name, attr = []
  if (isClose) {
    name = input.substring(cursor + 1, idx - 1)
  } else {
    name = input.substring(cursor + 1, idx).trim()
    const whitespaceIdx = name.trim().indexOf(' ')
    if (whitespaceIdx > -1) {
      attr = parseAttr(name.substring(whitespaceIdx + 1))
      name = name.substring(0, whitespaceIdx)
    }
  }
  const tag = {
    type: 'node',
    name,
    children: [],
    attr
  }
  curr.tag.children.push(tag)
  return {isClose, tag}
}

const parseAttr = input => {
  return input
    .split(' ')
    .map(attr => {
      let [name, value = ''] = attr.split('=')
      if (value) {
        value = value.substring(1, value.length - 1)
      }
      return {name, value}
    })
}

const textNode = (input, cursor, curr) => {
  const idx = input.indexOf('<', cursor)
  const tag = {
    type: 'text',
    text: input.substring(cursor, idx)
  }
  curr.tag.children.push(tag)
  return idx
}

module.exports = {
  parser
}