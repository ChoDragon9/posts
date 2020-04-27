## Shorthand
### Assignment
#### Object property
```javascript
const ip = '127.0.0.1'
const port = 1234
const serverInfo = {ip, port}
// { ip: '127.0.0.1', port: 1234 }
```
#### Method Definition
```javascript
const person = {
  name: '',
  getName() {
    return this.name
  },
  setName(name) {
    this.name = name;
  }
}
person.setName('Peter')
console.log(person.getName()) //Peter
```
### Destructuring
#### Object
```javascript
// personal.js
const peter = {weight: 72, height: 173}

// inbody.js
function getBMI(weight, height) {
  height = height / 100
  return weight / (height * height)
}

const {weight, height} = peter
console.log(getBMI(weight, height)) // 24.0569...
```
#### Array
```javascript
const [a, , b] = [0, 1, 2]
console.log(a, b) //0 2
```
### Default value
#### Parameter
```javascript
const serverInfo = {
  ip: null,
  port: null,
  setDevInfo(ip = '127.0.0.1', port = 1234) {
    this.ip = ip
    this.port = port
  }
}
serverInfo.setDevInfo()//ip: 127.0.0.1, port: 1234

```
#### Destructuring
```javascript
const peter = {weight: 72, height: 173}
const {weight, height, age = 25} = peter
console.log(weight, height, age)//72, 173, 25
```
#### 해체할당
나머지 연산자를 통해 객체 프로퍼티와 배열 요소에 할당할 수도 있다.
```js
const obj = {};
[, ...obj.prop] = ['a', 'b', 'c'];
```
해체를 통해 할당하는 경우 할당 대상은 좌변에 올수 있는 모든 것이 될 수 있다.
```js
const obj = {};
const arr = [];

({foo: obj.prop, bar: arr[0]} = {foo: 123, bar: true});

console.log(obj) //{prop: 123}
console.log(arr) // [true]
```
```js
{a, b} = someObject; //SyntaxError
({a, b} = someObject) //Ok
```

### ...
#### Rest Parameter
```javascript
function foo(...args) {} //args : [1,2,3]
foo(1,2,3)
function bar (first, ...args) {} //args : [2,3]
bar(1,2,3)

```
#### Destructuring assignment
```javascript
const odd = [1, 3, 5]
const even = [2, 4, 6]
const num = [...odd, ...even]
// [1, 3, 5, 2, 4, 6]
sum(...odd) //9

const obj1 = {a: 'a'}
const obj2 = {b: 'b'}
const mergedObj = {...obj1, ...obj2}
// {a: 'a', b: 'b'}

```

## String Template
### String concatenation
```javascript
const name = 'Peter'
const txt = `Hello WorldI'm ${name}`
/*
Hello World
I'm Peter
*/

```
### Expression
```javascript
const math = 90
const science = 100
console.log(`Math: ${math}
Sciene: ${science}
Total: ${math + science}
Average: ${(math + science) / 2}`)

```
### Undefined variable
```javascript
const txt = `Hello ${name}`
console.log(txt) //ReferenceError

```
### Special Character
```javascript
const txt = `Hello \$`
console.log(txt) //Hello $

```
## Module
### Export & Import
#### export
```javascript
export function sum(...numbers) {
  return numbers.reduce((prev, cur) => {
    return prev + cur
  })
}

export function avg(...numbers) {
  const sumResult = sum(...numbers)
  return sumResult / numbers.length
}
```
#### import
```javascript
import {sum, avg} from './lib'

sum(1, 2, 3, 4) //10
avg(1,2,3,4) //2.5
```
### default & alias
#### default
```javascript
//myFunc.js
export default function () {}
//main.js
import myFunc from './myFunc'
myFunc()

```
#### alias
```javascript
import {getTime} from './bar'
import {getTime} from './foo'
//Duplicate declaration

import * as bar from './bar'
import * as foo from './foo'

import {getTime as getTimeOfBar} from './bar'
import {getTime as getTimeOfFoo} from './foo'

```
### Import is read-only
```javascript
//main.js
import {counter, incCounter} from './lib'

console.log(counter)
// 3
incCounter()
console.log(counter)
// 4
counter++
//SyntaxError 'counter' is read-only

//lib.js
export let counter = 3

export function incCounter() {
  counter++
}

```
