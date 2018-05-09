// filter, map
const filter = (list, predicate) => list.filter(predicate)
const map = (list, iteratee) => list.map(iteratee)

list.map((item) => item.age)
map(list, (item) => item.age)

list
  .filter(item => item.age > 10)
  .map(item => user.age)  
map(
  filter(list, item => item.age > 10),
  item => user.age
)

// bvalue
const bvalue = key => obj => obj[key]

bvalue('a')({a: 'hi'})

list
  .filter(item => item.age > 10)
  .map(bvalue('age'))  
map(
  filter(list, item => item.age > 10),
  bvalue('age')
)

// bvalues
const bvalues = key => list => map(list, v => v[key])

const ages = bvalues('age')
const under30 = u => u.age < 30

ages(filter(users, under30))

// find, bmatch
const find = (list, predicate) => {
  for (let item of list) {
    if (predicate(item)) return item
  }
}

const bmatch = (key, val) => obj => obj[key] === val

find(users, bmatch('id', 3))

// findIndex
const findIndex = (list, predicate) => {
  for (let i = 0, len = list.length; i < len; i++) {
    if (predicate(list[i])) return i
  }
  return -1
}

// identity, falsy, truthly
const identity = v => v // identity(10)
const falsy = v => !v
const truthly = v => !!v

// some, every
const some = list => truthly(find(list, identity))
const every = list => filter(list, identity).length === list.length

// not, beq : 연산자 대신 함수로
const not = v => !v
const beq = a => b => a === b

const every = list => beq(-1)(findIndex(list, not))

// compose
const compose = (...fns) => {
  const start = fns.length - 1
  return (...args) => {
    const i = start
    let result = fns[start].apply(null, args)
    while (i--) result = fns[i].call(null, result)
    return result
  }
}

const positive = list => find(list, identity)
// const some = list => truthly(find(list, identity))
const some = compose(truthly, positive)
