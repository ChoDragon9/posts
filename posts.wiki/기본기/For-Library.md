## Symbol

### Symbol type
#### Unique
```javascript
const RED1 = Symbol('red')
const RED2 = Symbol('red')
console.log(RED1 === RED2) //false
```
#### Property Keys
```javascript
const height = Symbol('height')
const obj = {age: 25}
obj[height] = 173

Object.getOwnPropertyNames(obj)//[ 'age’ ]
Object.getOwnPropertySymbols(obj)// [ Symbol(height) ]
```
### Clear intention
#### Bad
```javascript
const SWITCH_OFF = 0
const EQUAL = 0

const getBtnStatus = () => SWITCH_OFF
const compareVersion = () => EQUAL

const btnStatus = getBtnStatus()
const result = compareVersion('0.0.1', '0.0.1')

btnStatus === comparedResult //true
```
#### Good

```javascript
const SWITCH_OFF = Symbol(0)
const EQUAL = Symbol(0)

const getBtnStatus = () => SWITCH_OFF
const compareVersion = () => EQUAL

const btnStatus = getBtnStatus()
const result = compareVersion('0.0.1', '0.0.1')

btnStatus === comparedResult //false
```

## Proxy
### Intercept and customize operations
```javascript
const target = {}
const proxy = new Proxy(target, {
  get(target, propKey) {
    console.log('GET', propKey)
    return target[propKey]
  }, set(target, propKey, value) {
    console.log('SET', propKey)
    target[propKey] = value
  }
})
proxy.foo //GET foo
proxy.bar = 'abc' //SET bar

const target = {}
const proxy = new Proxy(target, {
  has(target, propKey) {
    console.log('HAS', propKey)
    return propKey in target
  }, deleteProperty(target, propKey) {
    console.log('DELETE', propKey)
    delete target[propKey]
  }
})
'hello' in proxy //HAS hello
delete proxy.bara //DELETE bar

```
### Function
```javascript
const sum = (a, b) => a + b
const handler = {
  apply(target, thisArg, argumentsList) {
    return target(...argumentsList)
  }
}

const proxySum = new Proxy(sum, handler)
proxySum(1, 2) //3

```
### Class
```javascript
class Person {
  constructor(name) {
    this.name = name
  }

  getName() {
    return this.name
  }
}

const handler = {
  construct(target, args) {
    return new target(...args)
  }
}
const ProxyPerson = new Proxy(Person, handler)
const peter = new ProxyPerson('peter.cho')
peter.getName() //peter.cho

```
