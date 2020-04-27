### 글의 목적
먼저 immer의 [produce](https://immerjs.github.io/immer/docs/produce)에 대한 설명을 하면, produce는 영속적 자료 구조(Persistent Data Structure)이다. 변경이 필요한 부분만 새로 상태를 만들고 변경이 필요하지 않는 부분은 기존 상태를 유지한다.

하지만 영속적 자료 구조가 필요하지 않고 불변성만 필요할 때는 간단하게 구현 가능하다. produce를 처음 접했을 때 영속적 자료 구조에 대한 이점은 불필요하여 만들었던 함수에 대한 내용이다.

### 간단한 produce 함수 구현
produce는 이런 형태로 구현가능하다. 상태를 clone하고 명령 함수를 통해 상태를 변경하는 것이다.
```js
const clone = json => JSON.parse(JSON.stringify(json))

const produce = (state, recipe) => {
  const clonedState = clone(state)
  recipe(clonedState)
  return clonedState
}
```

테스트해보면 이런 결과가 나온다. immer를 사용했을 때와 다른 점은 `nextState[0] === baseState[0]`이 부분이다. 변경하지 않는 부분도 새로 만든 점이 다르다.
```js
const baseState = [
  {
    todo: "Learn typescript",
    done: true
  },
  {
    todo: "Try immer",
    done: false
  }
]

const nextState = produce(baseState, (draftState) => {
  draftState.push({todo: "Tweet about it"})
  draftState[1].done = true
})

console.log(baseState.length === 2) // true
console.log(nextState.length === 3) // true

console.log(baseState[1].done === false) // true
console.log(nextState[1].done === true) // true

console.log(nextState[0] === baseState[0]) // false
console.log(nextState[1] !== baseState[1]) // true
```

### 끝
해당 함수를 구현해서 서비스에 사용중이다. 만약에 영속적 자료 구조의 이점이 필요없고, 단순히 immer의 인터페이스때문에 사용중이라면 해당 기능으로 대체 가능하다.

clone 함수는 JSON에서 지원하는 타입만 사용가능하다. 다양한 타입이나 좀더 좋은 성능의 clone함수는 [경우에 따른 clone 함수](https://chodragon9.github.io/blog/clone-function/)에서 다룬다.