const isIterable = a => a && a[Symbol.iterator];

const curry = f => (a, ..._) => {
  return _.length ? f(a, ..._) : (..._) => f(a, ..._);
};
const go = (...args) => reduce((a, f) => f(a), args);
const pipe = (f, ...fs) => (...args) => go(f(...args), ...fs);
const take = curry((limit, iterable) => {
  let res = [];
  for (const a of iterable) {
    res.push(a);
    if (res.length === limit) return res;
  }
  return res;
});
const takeAll = pipe(take(Infinity));

const L = {};
L.range = function *(l) {
  let i = -1;
  while (++i < l) {
    yield i;
  }
};

L.map = curry(function *(mapper, iterable) {
  for (const a of iterable) {
    yield mapper(a);
  }
});
L.filter = curry(function *(predicate, iterable) {
  for (const a of iterable) {
    if (predicate(a)) yield a;
  }
});
L.entries = function *(obj) {
  for (const k in obj) yield [k, obj[k]];
};
L.flatten = function *(iterable) {
  for (const a of iterable) {
    if (isIterable(a)) {
      yield *a;
    } else {
      yield a;
    }
  }
};
L.deepFlat = function *f(iterable) {
  for (const a of iterable) {
    if (isIterable(a)) {
      yield *f(a);
    } else {
      yield a;
    }
  }
};
L.flatMap = curry((mapper, iterable) => go(
  iterable,
  L.flatten,
  L.map(mapper)
));

const flatMap = curry(pipe(L.flatMap, takeAll))

const map = curry(pipe(L.map, takeAll));
const filter = curry(pipe(L.filter, takeAll));
const reduce = curry((reducer, accumulator, iterable) => {
  if (!iterable) {
    iterable = accumulator[Symbol.iterator]();
    accumulator = iterable.next().value;
  }
  for (const a of iterable) {
    accumulator = reducer(accumulator, a);
  }
  return accumulator;
});

const range = l => {
  let i = -1;
  let res = [];
  while (++i < l) {
    res.push(i);
  }
  return res;
};

const join = curry((seq = '', iterable) =>
  reduce((a, b) => `${a}${seq}${b}`, iterable));

const find = curry((predicate, iterable) => go(
  iterable,
  L.filter(predicate),
  take(1),
  ([a]) => a
));

const queryStr = pipe(
  L.entries,
  L.map(([k, v]) => `${k}=${v}`),
  join('&')
)

const evaluate = (name, time, f) => {
  console.time(name);
  while(time--) f();
  console.timeEnd(name);
}
const add = (a, b) => a + b;
const log = console.log;

go(
  flatMap(v => v * 10, [[1, 2], 3, 4, [5], [[6]]]),
  log
)