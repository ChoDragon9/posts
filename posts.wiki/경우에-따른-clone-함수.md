### 글의 목적
불변성에 대한 처리를 하면서 상태를 복제하는 기능을 만들어 사용하곤한다. 다양한 방법들이 존재하는 데 경우에 따라 어떤 함수들이 있는 지 정리한 글이다.

### 목차
- [JSON 복제](#json-복제)
- [Array-Object 복제](#array-object-복제)
- [Collection 복제](#collection-복제)

### JSON 복제
[JSON](https://www.json.org/json-ko.html)에서 지원하는 타입을 사용할 경우에 사용되는 함수이다. 문자로 변경 후 다시 JSON으로 파싱하는 동작을 한다.

```js
const clone = json => JSON.parse(JSON.stringify(json))
```

### Array-Object 복제
Array와 Object를 복제할 때 사용하는 함수이다. ES6+에서 제공하는 `Set`, `Map`과 같은 빌트인 객체는 복제가 안된다.

원시 타입은 바로 반환하고, Array와 Object는 복제 후 반환한다. 1000건 이상일 때는 [JSON 복제](#JSON-복제)보다 성능이 우수하다.
```js
const clone = objOrArr => {
  switch (true) {
    case isPrimitive(objOrArr):
      return objOrArr
    case Array.isArray(objOrArr):
      return objOrArr.map(clone)
    default:
      return cloneObject(objOrArr)
  }
}
```
```js
const isPrimitive = value => {
  switch (true) {
    case value === undefined:
    case value === null:
      return true
    case typeof value === 'object':
    case typeof value === 'function':
    case Number.isNaN(value):
      return false
    default:
      return true
  }
}

const cloneObject = obj => {
  const cloned = Object.create(Object.getPrototypeOf(obj))
  for (const key in obj) {
    cloned[key] = clone(obj[key])
  }
  return cloned
}
```

### Collection 복제
ES6+에서 Map과 Set을 포함한 Collection 객체를 복제할 때 사용하는 함수이다. [Array-Object 복제](#array-object-복제)에서 Map과 Set을 처리하는 책임을 추가한 함수이다.

```js
const clone = value => {
  switch (true) {
    case isPrimitive(value):
      return value
    case isArray(value):
      return value.map(clone)
    case isMap(value):
      return new Map(value)
    case isSet(value):
      return new Set(value)
    default:
      return cloneObject(value)
  }
}
```

```js
const isPrimitive = value => {
  switch (true) {
    case value === undefined:
    case value === null:
      return true
    case typeof value === 'object':
    case typeof value === 'function':
    case Number.isNaN(value):
      return false
    default:
      return true
  }
}
const isArray = target => Array.isArray(target)
const isMap = target => target instanceof Map
const isSet = target => target instanceof Set

const cloneObject = obj => {
  const cloned = Object.create(Object.getPrototypeOf(obj))
  for (const key in obj) {
    cloned[key] = clone(obj[key])
  }
  return cloned
}
```

### 끝