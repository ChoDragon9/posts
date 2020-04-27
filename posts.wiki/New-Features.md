## Data Structure

### Map

* Any value can be a key, even an object
* Getting an unknown key produces undefined
```javascript
const map = new Map()
map.set('foo', true)
map.set('bar', false)
map.get('foo') //true
map.has('foo') //true
map.delete('foo')
map.size //2
map.clear() //map.size === 0

const map = new Map([  ['foo', true],  ['bar', false]])
```
### WeakMap
```javascript
const weakMap = new WeakMap()
let obj = {}
weakMap.set(obj, false)
console.log(weakMap.get(obj)) //false
obj = null
// obj in weakMap is garbage-collected

//only get, set, has, delete methods

```
### Set
```javascript
const set = new Set()
set.add('red')
set.has('red') //true
set.delete('red')
set.has('red') //false
set.add('red')
set.add('green')
set.size //2
set.clear() //set.size === 0
const set = new Set(['red', 'green', 'blue'])

//Chainable
set.add('purple').add('black')

```
### WeakSet
```javascript
const weakSet = new WeakSet()
let obj = {}
weakSet.add(obj)
weakSet.has(obj) //true
obj = null
// obj in weakSet is garbage-collected

//only add, has, delete methods

```
## Promise
Promise는 대기, 이행, 거부 상태가 있습니다.
- 대기 : 초기상태
- 이행 : 성공 상태, resolve(), Promise.resolve()
- 거부 : 실패 상태, reject(), Promise.reject()

### Usage
#### resolve/reject
```javascript
const promise = new Promise((resolve, reject) => {
  getData(
    response => resolve(response.data), 
    error => reject(error.message)
  )
})
```
#### then / catch
```javascript
promise
  .then(data => console.log(data))
  .catch(err => console.error(err))
```
### Multiple
#### all
```javascript
Promise.all([
  getPromise(),
  getPromise(),
  getPromise()
])  //response all data
  .then(data => console.log(data))
  .catch(err => console.error(err))
```
#### race
```javascript
Promise.race([
  getPromise(), //1000ms
  getPromise(), //500ms
  getPromise() //250ms
])  //response of 250ms
  .then(data => console.log(data))
  .catch(err => console.error(err))
```
