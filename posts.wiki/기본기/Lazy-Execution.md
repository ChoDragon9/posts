`Generator`를 사용하여 `Coroutine`을 사용한 것과 기존에 사용한 `Call Stack`의 차이를 설명한다.

### Call Stack
```js
function odd(arr) {
  const newArr = []
  for (const v of arr) {
    console.log(`odd ${v}`)
    if (v % 2) {
      newArr.push(v)
    }
  }

  return newArr
}

function take(arr, n) {
  const newArr = []
  let count = 0
  for (const v of arr) {
    console.log(`take ${v}`)
    count++
    newArr.push(v)
    if (count === n) {
      break;
    }
  }

  return newArr
}
```
중첩함수 중 내부에 사용된 `odd`가 실행된 뒤, `take`가 실행된다. 배열의 크기만큼 루프가 반복되는 것을 알 수 있다.
```js
const arr = [0,1,2,3,4,5]

console.log(...take(odd(arr), 2))
// odd 0
// odd 1
// odd 2
// odd 3
// odd 4
// odd 5
// take 1
// take 3
// 1 3
```

### Coroutine
```js
function* odd(arr) {
  for (const v of arr) {
    console.log(`odd ${v}`)
    if (v % 2) {
      yield v
    }
  }
}

function* take(arr, n) {
  let count = 0
  for (const v of arr) {
    console.log(`take ${v}`)
    count++
    yield v
    if (count === n) {
      break;
    }
  }
}
```
`Generator`를 사용하면 `odd`에서 `yield`를 만나면 `take`로 커서가 이동되고 `take`에서 `yield`를 사용하면 `odd`로 커서가 이동된다.
이러한 작업이 반복 된 뒤 `break`를 만나게 되면 `done`을 반환하여 루프가 종료하게 된다.
```js
const arr = [0,1,2,3,4,5]

console.log(...take(odd(arr), 2))
// odd 0
// odd 1
// take 1
// odd 2
// odd 3
// take 3
// 1 3
```