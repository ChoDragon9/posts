```bash
npm install --save-dev jest
```
#### sum.js
```js
export function sum (a, b) {
    return a + b
}
```

#### sum.spec.js
```js
import { sum } from './sum'

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3)
})
```

#### package.json
`testEnvironment`는 기본값으로 `jsdom`인데, `node`로 설정하지 않으면 `SecurityError: localStorage is not available for opaque origins` 에러가 발생한다.
```json
{
  "scripts": {
    "test": "jest"
  },
  "jest": {
    "testEnvironment": "node"
  }
}
```