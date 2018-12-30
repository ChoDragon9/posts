const {
  go,
  map,
  range,
  filter,
  take,
  reduce,
  tap,
  L,
  C
} = require('./fxjs');

const log = console.log;

const delay = ms => (a) => new Promise(resolve => {
  setTimeout(() => {
    resolve(a)
  }, ms);
});

// go(
//   range(4),
//   tap(() => console.time('Strict')),
//   map(delay(1000)),
//   filter(v => v < 2),
//   take(3),
//   tap(() => console.timeEnd('Strict')),
//   log
// );
//
// go(
//   L.range(1000),
//   tap(() => console.time('Lazy')),
//   L.map(delay(1000)),
//   L.filter(v => v < 10),
//   take(3),
//   tap(() => console.timeEnd('Lazy')),
//   log
// );
//
// go(
//   L.range(1000),
//   tap(() => console.time('Concurrency')),
//   L.map(delay(1000)),
//   L.filter(v => v < 2),
//   C.take(3),
//   tap(() => console.timeEnd('Concurrency')),
//   log
// );

go(
  L.range(1000),
  tap(() => console.time('Concurrency')),
  L.map(delay(1000)),
  L.filter(v => v < 2),
  C.reduce((a, b) => a + b),
  tap(() => console.timeEnd('Concurrency')),
  log
);