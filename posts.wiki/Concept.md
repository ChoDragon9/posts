## Block scope
### var is function scope
```javascript
if (true) {
  var x = 3
}
console.log(x) //3
```
### let is block scope
```javascript
if (true) {
  let x = 3
}
console.log(x) //ReferenceError
```
### let is not immutable
```javascript
let num = 0
num = 1 // Fine
```
### const is immutable
```javascript
const num = 0
num = 1 // TypeError

const obj = { a: 'a' }
obj.b = 'B' //Working
obj.a = 'A' //Working
delete obj.a //Working
```
### freeze
```js
const obj = {a: 'a'}
Object.freeze(obj)
obj.b = 'B' //Not Working
obj.a = 'A' //Not Working
delete obj.a //Not Working
```
```js
const obj = {x:{}}
Object.freeze(obj)
obj.x.a = 'A' //Working
```
### var vs let - loop scoping
```js
for(var i = 0; i < 3; i++) {}
console.log(i); //3

for(let i = 0; i < 3; i++) {}
console.log(i); //ReferenceError
```

## Arrow function
### function declaration
```javascript
function sum (a, b) {
  return a + b
}

function getBMI (weight, height) {
  height /= 100
  return weight / Math.pow(height, 2)
}
```
### Arrow function
```javascript
const sum = (a, b) => a + b

const getBMI = (weight, height) => {
  height /= 100
  return weight / Math.pow(height, 2)
}
```
### Always anonymous
```javascript
const sum = (a, b) => a + b

const sum = sum(a, b) => a + b
//SyntaxError
```
### Lexical this
```javascript
const obj = {
  data: '',
  updateData () {
    $http.get('/path')
      .then(data => this.data = data)
  }
}
```
### It can’t be used constructor
```javascript
const Person = () => {}
new Person() //TypeError

Person.prototype //Undefined
```

## Class
### Class declaration
```javascript
class MyClass {}
const instance = new MyClass()
```
### Class expression
```javascript
const MyClass = class {}
const instance = new MyClass()
```
### Sub classing
```javascript
class Point {
  constructor (x, y) {
    this.x = x    
    this.y = y  
  }  
  toString () {    
    return `${this.x} ${this.y}`  
  }
}
class ColorPoint extends Point {
  constructor (x, y, color) {    
    super(x, y) //Must call super    
    this.color = color  
  }  
  toString () {    
    return `${super.toString()} in ${this.color}`  
  }
}
```
### Static
```javascript
class Point {
  static pointMethod() {
  }
}

class ColorPoint extends Point {
  static pointmethod() {
    super.pointMethod()
  }
}

Point.pointmethod()

ColorPoint.pointmethod()
```
### Getter & Setter
```javascript
class Point {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  get axis() {
    return [this.x, this.y]
  }

  set axis([x, y]) {
    this.x = x
    this.y = y
  }
}

const point = new Point(0, 0)
console.log(point.axis) //[0, 0]
point.axis = [10, 10]
console.log(point.x, point.y) //10, 10
```
