#### yield 동작
- 라인별로 `Record` 저장한다.
- `yield`를 만나면 바깥에 `Iterator Result Object`를 반환하게 되고, 멈추게 된다.(서스펜션 효과)
- `next()`를 호출하게 되면 `Iterator Result Object`를 받을 수 있고, 다음 `Record`를 실행하게 된다.(코루틴)
- [코드 스피츠](https://youtu.be/xTaCosid1-k?t=1h)
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
      break
    }
  }
}

const arr = [0, 1, 2, 3, 4, 5]
```
```js
const gene = take(odd(arr), 2)
gene.next()
gene.next()
gene.next()
// [0] odd
// [1] odd[yield] take(2)[yield]
// [2] odd
// [3] odd[yield] take(2)[yield] break
```
```js
console.log(...take(odd(arr)), 2))

// [0] odd
// [1] odd[yield] take(2)[yield]
// [2] odd
// [3] odd[yield] take(2)[yield] break

console.log(...take(odd(take(arr, 5)), 2))

// [0] take(5)[yield] odd
// [1] take(5)[yield] odd[yield] take(2)[yield]
// [2] take(5)[yield] odd
// [3] take(5)[yield] odd[yield] take(2)[yield] break

console.log(...odd(take(odd(take(arr, 5)), 2)))

// [0] take(5)[yield] odd
// [1] take(5)[yield] odd[yield] take(2)[yield] odd[yield]
// [2] take(5)[yield] odd
// [3] take(5)[yield] odd[yield] take(2)[yield] break odd[yield]
```
> `const result = [...take(odd(arr), 2)]`를 풀어서 쓰면 아래와 같다.
```js
const oddGenObj = odd(arr)
const takeGenObj = take(oddGenObj, 2)
const result = []
result.push(takeGenObj.next().value)
result.push(takeGenObj.next().value)
```