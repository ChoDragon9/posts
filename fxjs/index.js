const {
  go,
  map,
  range,
  filter,
  take,
  reduce,
  L,
  C
} = require('./fxjs');

const log = console.log;

const delay = ms => (a) => new Promise(resolve => {
  setTimeout(() => {
    resolve(a)
  }, ms);
});

console.time('Concurrency');
go(
  L.range(1000),
  L.map(delay(1000)),
  L.filter(v => v < 2),
  C.take(3),
  (v) => (console.timeEnd('Concurrency'), log(v))
);