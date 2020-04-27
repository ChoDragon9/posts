### String
```javascript
"Hello".startsWith("Hell")
"Goodbye".endsWith("bye")
"Jar".repeat(2)
"abcedf".includes("bcd")
```
### Number
```javascript
Number.EPSILON
Number.isNaN()
Number.isFinite()
Number.isInteger()
Number.isSafeInteger()
Number.parseFloat()
Number.parseInt()
```
### Array
```javascript
//Array.from()
//from array-like objects
let arrayLike = {
  0: 'zero',
  1: 'one',
  2: 'two',
  3: 'three',
  'length': 4
}
Array.from(arrayLike) //['zero', 'one', 'two', 'three']
Array.from({length: 5}, (v, i) => i) // [0, 1, 2, 3, 4]
Array.from('zero') ['z', 'e', 'r', 'o']

Array.of()
//A better way to create arrays
Array.of(1, 2, 3, 4, 5) //[1, 2, 3, 4, 5]

//Array.prototype.*

//Array.prototype.find()
[4, 100, 7].find(x => x > 5) //100

//Array.prototype.findIndex()
[4, 100, 7].findIndex(x => x > 5) //1

//Array.prototype.fill()
(new Array(7)).fill(2).fill(3, 2, 5) //[2, 2, 3, 3, 3, 2, 2]
```
### Object
```javascript
//Object.assign()
let x = {a: 1}
Object.assign(x, {b: 2}) //{ a: 1, b: 2}

Object.assign(dom.style, {
  color: '#fff',
  fontSize: '12px'
})

//Object.is() checks if two values are the same
Object.is('y', 'y') //true
Object.is({x: 1}, {x: 1}) //false
Object.is(NaN, NaN) //true
```