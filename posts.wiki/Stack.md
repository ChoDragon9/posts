### HTML Parser
```
A : <TAG>BODY</TAB>
B: <TAG/>
C: TEXT
BODY = (A | B | C)n
<div>
  a
  <a>b</a>
  c
  <img/>
  d
</div>
```
```js
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
```
```js
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
```
```js
const textNode = (input, cursor, curr) => {
  const idx = input.indexOf('<', cursor)
  curr.tag.children.push({
    type: 'text',
    text: input.substring(cursor, idx)
  })
  return idx
}
```
결과
```js
const result = parser(`<div>
  a
  <a>b</a>
  c
  <img/>
  d
</div>`)
{
  name: 'ROOT',
  type: 'node',
  children: [
    {
      name: 'div',
      type: 'node',
      children: [
        {type: 'text', text: 'a'},
        {
          type: 'node',
          name: 'a',
          children: [
            {type: 'text', text: 'b'}
          ]
        },
        {type: 'text', text: 'c'},
        {type: 'node', name: 'img', children: []},
        {type: 'text', text: 'd'}
      ]
    }
  ]
}
```
- [html_parser.js](https://github.com/ChoDragon9/posts/blob/master/codespitz/html_parser.js)

3회차 숙제
- stack 제거 후 curr만 남겨 외곽 루프 제거
  - stack은 curr 가져오는 역할을 함으로 stack에 넣지 않고 curr에 넣어서 해결
  - [remove_stack_html_parser.js](https://github.com/ChoDragon9/posts/blob/master/codespitz/html-parser/remove-stack-html-parser.js)
- 속성 포함된 html 파싱 `<div style="background:red" class="test">...</div>`
  - elementNode에서 `<`와 `>` 사이의 값을 처리함으로, elementNode에서 attribute를 가져옴
  - [add_attr_html_parser.js](https://github.com/ChoDragon9/posts/blob/master/codespitz/html-parser/add-attr-html-parser.js)
- json 문자열 파싱
  - [json_parser.js](https://github.com/ChoDragon9/posts/blob/master/codespitz/json-parser/json-parser.js)