#### 동기 상황에서 에러 핸들링은 어떻게 해야 하는지?
```js
const f = list => list
  .map(a => a + 10)
  .filter(a => a % 2)
  .slice(0, 2)
```
함수에서 에러가 발생하는 경우는 두가지를 볼수 있다.
`list` 인자가 배열이 아닐 때, map, filter에 사용된 함수들이 에러를 발생할 때이다.

전략에 따라 다르게 기술할 수 있지만 안전하게 **값을 흘리게 하는 방법**이 있다. 
항상 같은 타입을 리턴하게 되게 하는 것이다.
```js
const f = list => {
  try {
    return list
      .map(a => a + 10)
      .filter(a => a % 2)
      .slice(0, 2)
  } catch (e) {
    return []
  }
}
```