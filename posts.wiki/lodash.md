#### 프로퍼티 타입 검사
```javascript
// Data
const people = [
  {
    name: 'peter',
    address: 'Seoul',
    phone: '01012341234'
  },
  {
    name: 'hacker',
    address: 44444,
    phone: '01012345678'
  },
  {
    name: 'hacker',
    address: 'hacker',
    phone: 'undefined'
  }
]

// Function
const removeSnake = _.partial(_.replace, _, /\-/g)
const validate = _.conforms({
  name: _.isString,
  address: _.isString,
  phone: _.flow([removeSnake, _.parseInt, _.isInteger])
})

// Result
const result = _.map(people, validate)
// [true, false, false]
```