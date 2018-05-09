const filter = (list, predicate) => list.filter(predicate)
const map = (list, iteratee) => list.map(iteratee)

list = list.map((item) => item.age))
list = map(list, (item) => item.age))

list = list
  .filter(item => item.age > 10)
  .map(item => user.age)
  
list = map(
  filter(list, item => item.age > 10),
  item => user.age
)

const bvalue = key => obj => obj[key]
bvalue('a')({a: 'hi'})
