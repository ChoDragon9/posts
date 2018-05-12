require('./fp')

const log = str => console.log(str)
const label = str => log(`-----${str}------`)

const users = [
  { id: 1, name: 'A' },
  { id: 2, name: 'B' },
  { id: 3, name: 'C' },
  { id: 4, name: 'D' }
]

label('each')
each(item => log(item.id))(users)

label('map')
log(map(item => item.id)(users))

label('filter')
log(filter(item => item.id > 2)(users))

label('find')
log(find(item => item.id === 4)(users))

label('reduce')
log(
  reduce(
    '',
    (result, item) => result + item.name
  )(users)
)

label('pipe - each/map/filter/find')
pipe(
  each(item => log(item.id)),
  map(item => item.id),
  filter(id => id > 2),
  find(id => id === 4),
  log
)(users)

label('pipe - map/filter/reduce')
pipe(
  map(item => item.id),
  filter(id => id > 2),
  reduce(0, (result, id) => result + id),
  log
)(users)