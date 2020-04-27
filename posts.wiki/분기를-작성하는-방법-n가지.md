### 글의 목적
자바스크립트에서 분기를 작성하는 방법을 다양하다. 큰 카테고리로 보면 문(statement)와 식(expression)이 있다. 내가 사용하는 분기 작성 코드를 봤을 때, 문은 대표적으로 `switch`, `if`가 있고, 식은 삼항연산자, 리터럴이 있다.

문과 식이 대표적으로 다른점은 **값으로 될 수 있나 없나**의 차이다. 식은 값으로 되는 반면에 문은 값이 될 수 없다. 값이 될 수 있느냐의 차이가 문과 식의 분기 작성에 차이를 보인다.

자세하게 어떤 방법들이 있는 지 알아보자.

### 순서
- [문으로 분기 작성](#문으로-분기-작성)
- [식으로 분기 작성](#식으로-분기-작성)
- [요약](#요약)

### 문으로 분기 작성
문으로 분기를 작성하는 방법은 대표적으로 두가지를 사용하고 있다.

#### switch 문
먼저 `switch`이다. `switch`는 **같은 값을 다수 케이스로 분기**하고 싶을 때, 그리고 **판단을 연쇄적으로 하고 싶을 때** 사용한다.

같은 값을 다수 케이스로 분기하는 예이다. `num` 값에 따라 다른 반환값을 가지고 있다.
```js
const foo = num => {
  switch (num) {
    case 0: return 'A'
    case 1: return 'BB'
    case 2: return 'CCC'
  }
}

foo(0) // A
foo(1) // BB
foo(2) // CCC
```

판단을 연쇄적으로 하고 싶을 때 예이다. 판단을 연쇄적으로 하여 [책임 연쇄 패턴](https://chodragon9.github.io/blog/design-pattern-behavioral/#%EC%B1%85%EC%9E%84-%EC%97%B0%EC%87%84chain-of-responsibility)과 일치한다.

조건식이 참이 되지 않을 때 연쇄적으로 다름 조건식으로 넘어간다. 이 형태는 **조건식과 반환문이 동일 선상**으로 코드를 기술 할 수 있는 게 장점이다.

```js
switch (true) {
  case isObject(char):
    return '{}'
  case isArray(char):
    return '[]'
  case isBoolean(char):
    return 'boolean'
  case isNull(char):
    return 'null'
  default:
    return ''
}
```

#### if 문
이번에는 `if`이다. `if`는 **옵셔널하게 처리하는 경우**에 많이 사용된다. 내 주관적인 판단으로는 `if else`는 다른 문법들과 가독성을 비교했을 때, `if else`를 조합해서 사용할 경우 가독성이 저하된다. 그래서 `if`는 옵셔널하게 처리할 때 이외는 사용하지 않는 다.

`if else`를 사용하는 케이스와 `if`만 사용하는 케이스이다.
```js
// if else
const foo = num => {
  if (num === 0) {
    return 'A'
  } else if (num === 1) {
    return 'BB'
  } else if (num === 2) {
    return 'CCC'
  }
}

// if
const foo = num => {
  if (num === 0) {
    return 'A'
  }
  if (num === 1) {
    return 'BB'
  }
  if (num === 2) {
    return 'CCC'
  }
}
```

### 식으로 분기 작성
식으로 분기를 작성하는 방법도 두가지가 있다.

#### 리터럴
**분기를 제거**하기 위해 **분기 만큼 데이터를 확보 가능할 때** 사용한다. 분기가 많을 수록 코드의 난이도를 올라간다. 그래서 분기를 제거하는 방법중에 하나를 사용한다. 리터럴을 사용하면 `switch`를 쉽게 대체할 수 있다.

`switch`로 작성된 코드를 리터럴로 대체한 예제이다.
```js
// switch
const foo = num => {
  switch (num) {
    case 0: return 'A'
    case 1: return 'BB'
    case 2: return 'CCC'
  }
}

// 리터럴
const arr = ['A', 'BB', 'CCC']
const obj = {A: 0, BB: 1, CCC: 2}

const foo = num => arr[num]
const bar = str => obj[str]

foo(0) // A
foo(1) // BB
foo(2) // CCC

bar('A') // 0
bar('BB') // 1
bar('CCC') // 2
```

#### 삼항연산자
**참과 거짓의 평가를 강제할 때** 사용한다. 지금까지 위에서 작성된 코드들을 특정 분기에 대한 처리는 가능하다. 하지만 예상되는 분기 이외 케이스는 강제하지 않고 있다.

예상되는 분기 이외 케이스를 처리는 가능하지만 **강제하지 않는 게 삼항연산자와 큰 차이**이다.
`foo(3)`을 실행했을 때 아래 코드는 의도와 다른 동작을 한다.

```js
// switch
const foo = num => {
  switch (num) {
    case 0: return 'A'
    case 1: return 'BB'
    case 2: return 'CCC'
    // default: return 'Z' (강제하지 않음)
  }
}

// if
const foo = num => {
  if (num === 0) {
    return 'A'
  } else if (num === 1) {
    return 'BB'
  } else if (num === 2) {
    return 'CCC'
  }
  // return 'Z' (강제하지 않음)
}

// 리터럴
const arr = ['A', 'BB', 'CCC']
const foo = num => arr[num]
```

하지만 삼항 연산자를 사용하여 예상치 못한 케이스를 대비할 수 있다. **강제성을 띄기 때문에 실수를 줄일 수 있는 것**이다.
```js
const foo = num => {
  return num === 0 ?
    'A':
    num === 1 ?
      'BB':
      num === 2 ?
        'CCC':
        'Z'
}
```

### 결론
**이해하기 쉬운 코드를 위한 가독성 측면**과 **코드 안정성을 위한 강제성 측면**을 판단했을 때, 문법들중 하나만 사용하는 것은 선택하긴 힘들다. 각 코드별로 적재적소에 사용되는 게 가장 이상적으로 생각한다.

나는 최근에 이런 기준으로 코드를 사용하고 있다.
```
- 참만 필요할 때: if 문
- 참과 거짓이 필요할 때, 분기가 2개 이하일 때: 삼항연산자
- 분기가 3개 이상일 때, 조건식이 3개 이상일 때: switch 문
```

### 요약
#### 문(statement)
```
switch 문
- 같은 값을 다수 케이스로 판단할 때
- 판단을 연쇄적으로 할 때(책임 연쇄 패턴)

if 문
- 옵셔널하게 사용할 때
```

#### 식(expression)
```
리터럴
- 분기를 제거하기 위해 분기 만큼 데이터를 확보 가능할 때
- switch 문을 대체 하기 용이함

삼항연산자
- 참과 거짓의 평가를 강제할 때
- if 문을 대체 하기 용이함
```

### 끝