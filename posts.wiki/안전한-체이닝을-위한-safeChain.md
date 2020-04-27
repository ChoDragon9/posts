#### 글의 목적
객체와 배열을 안전하게 사용하기 위해서 다양한 기법이 사용된다. 방법으로는 [undefined일 때 기본값을 할당](https://chodragon9.github.io/blog/es6/#default-value)하거나 분기문을 사용하기도 한다. 그리고 최근에는 [옵셔널 체이닝](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining) 문법을 사용하여 안전하게 체이닝을 하기도 한다.

이번에 시도 해본 것은 안전하게 체이닝을 하기 위한 함수를 만들어봤다. 옵셔널 체이닝같은 문법을 미지원 하는 환경이나, 기본값 할당이나 분기문으로 가독성과 복잡성이 증가되는 것을 방지하기 위해 만들었다.

#### 순서
먼저 해당 함수를 어떤 형태로 사용하는 지와 구현 코드 순서로 정리했다. 그리고 실무에서 적용할 수 있는 케이스를 작성했다.

- [사용 방법](#사용-방법)
- [코드](#코드)
- [활용 케이스](#활용-케이스)

#### 사용 방법
일반적인 상황에서는 정상적인 값을 추출한다.
```js
const obj = {a: {b: {c: 'c'}}}
const dot = safeChain(obj, (obj) => obj.a.b.c)
const destruct = safeChain(obj, ({a: {b: {c}}}) => c)

console.log(dot) // c
console.log(destruct) // c
```

비정상적인 상황에서는 `undefined`를 반환한다.
```js
const obj = {a: {b: {c: 'c'}}}
const dot = safeChain(obj, (obj) => obj.c.b.a)
const destruct = safeChain(obj, ({c: {b: {a}}}) => a)

console.log(dot) // undefined
console.log(destruct) // undefined
```

만약에 기본 문법으로 사용하면 이러한 에러가 발생할 것이다.
```js
const obj = {a: {b: {c: 'c'}}}
const {c: {b: {a}}} = obj
// Uncaught TypeError: Cannot read property 'b' of undefined
```

#### 코드
##### safeChain 메인 함수
- 인자로 받은 상태를 프록시로 감싼다.
- 인자로 받은 mapper 함수를 실행한다.
- mapper 함수의 결과가 감싸있으면(isPack) 풀어서(unpack)준다.
  - 그렇지 않으면 바로 반환한다.
- 마지막으로 프록시를 모두 취소하고, 결과를 반환한다.

```js
const safeChain = (state, mapper) => {
  const revokes = []
  const proxy = toProxy(state, revokes)
  const mappedResult = mapper(proxy)
  const result = isPack(mappedResult) ? unpack(mappedResult) : mappedResult

  revokes.forEach(fn => fn())
  return result
}
```

##### 헬퍼 코드
```js
const symbol = Symbol('safe')

const isNullish = value => value === undefined || value === null
const isPack = pack => typeof pack === 'object' && symbol in pack

const pack = value => ({ [symbol]: value })
const unpack = pack => pack[symbol]
```

##### 코어 함수
- toProxy에서는 상태를 감싸고(pack) 프록시를 만들어준다.
- trap에서는 상태를 조회할 때 처리를 한다.
  - 내부적으로 정의한 키(symbol)이면 값을 반환한다.
  - 그렇지 않으면
    - undefined나 null 일 때, undefined를 프록시로 감싼다.
    - 정상적인 값이면 정상적인 값을 프록시로 감싼다.

```js
const toProxy = (state, revokes) => {
  const wrap = pack(state)
  const handler = trap(revokes)
  const {proxy, revoke} = Proxy.revocable(wrap, handler)
  revokes.push(revoke)
  return proxy
}

const trap = (revokes) => {
  return {
    get (target, key) {
      const unpacked = unpack(target)
      return key === symbol ?
        unpacked :
        toProxy(isNullish(unpacked) ? undefined : unpacked[key], revokes)
    }
  }
}
```

#### 활용 케이스
백엔드 API 응답값을 API의 응답이 발생한 뒤 사용할 수 있다. 하지만 getter에 값을 조회하고 vue, angular 컴포넌트에서 사용하면 참조 오류가 발생한다. 이런 경우에 safeChain을 사용하면 오류를 방지할 수 있다.

백엔드 API를 사용을 가정한 코드이다.

```js
const backendApi = {
  fetchResponse() {
    this.response = {
      result: { message: 'Success' },
      status: 200,
      statusCode: 'Ok'
    }
  },
  response: null,
  get result () {
    if (this.response && this.response.result) {
      return this.response.result
    }
    return undefined
  }
}

console.log(backendApi.result) // undefined
backendApi.fetchResponse()
console.log(backendApi.result) // { message: 'Success' }
```

safeChain 함수를 사용하면 분기문을 제거할 수 있다.
```js
const backendApi = {
  fetchResponse() {
    this.response = {
      result: { message: 'Success' },
      status: 200,
      statusCode: 'Ok'
    }
  },
  response: null,
  get result () {
    return safeChain(this.response, ({result}) => result)
  }
}

console.log(backendApi.result) // undefined
backendApi.fetchResponse()
console.log(backendApi.result) // { message: 'Success' }
```

#### 끝