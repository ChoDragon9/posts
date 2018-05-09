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

const bvalue = key => obj => obj[key]

bvalue('a')({a: 'hi'})

list
  .filter(item => item.age > 10)
  .map(bvalue('age'))  
map(
  filter(list, item => item.age > 10),
  bvalue('age')
)
