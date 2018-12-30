const isIterable = a => a && a[Symbol.iterator];
const isPromise = a => a instanceof Promise;
const nop = Symbol('nop');

const curry = f => (x, y) => {
  return y ? f(x, y) : y => f(x, y);
};
const go1 = (a, f) => isPromise(a) ? a.then(f) : f(a);

const reduceF = (acc, a, f) =>
  a instanceof Promise ?
    a.then(
      a => f(acc, a),
      e => e === nop ? acc : Promise.reject(e)
    ) : f(acc, a);
const reduce = curry((reducer, acc, iterable) => {
  if (!iterable) {
    iterable = acc[Symbol.iterator]();
    acc = iterable.next().value;
  }
  return go1(acc, function recur(acc) {
    let cur;
    while (!(cur = iterable.next()).done) {
      acc = reduceF(acc, cur.value, reducer);
      if (isPromise(acc)) {
        return acc.then(recur);
      }
    }
    return acc;
  });
});
const go = (...args) => reduce((a, f) => f(a), args);
const pipe = (f, ...fs) => (...args) => go(f(...args), ...fs);
const take = curry((limit, iterable) => {
  let res = [];
  iterable = iterable[Symbol.iterator]();
  return function recur() {
    let cur;
    while (!(cur = iterable.next()).done) {
      const a = cur.value;
      if (a instanceof Promise) {
        return a
          .then(a => {
            res.push(a);
            if (res.length === limit) return res;
            return recur();
          })
          .catch(e => e === nop ? recur() : Promise.reject(e))
      }
      res.push(a);
      if (res.length === limit) return res;
    }
    return res;
  }();
});
const takeAll = pipe(take(Infinity));

const C = {};
C.take = curry((limit, iterable) => take(limit, [...iterable]));
C.reduce = curry((reducer, acc, iterable) => {
  return iterable ?
    reduce(reducer, acc, [...iterable]) :
    reduce(reducer, [...acc]);
});

const L = {};
L.range = function *(l) {
  let i = -1;
  while (++i < l) {
    yield i;
  }
};

L.map = curry(function *(mapper, iterable) {
  for (const a of iterable) {
    yield go1(a, mapper);
  }
});
L.filter = curry(function *(predicate, iterable) {
  for (const a of iterable) {
    const b = go1(a, predicate);
    if (b instanceof Promise) {
      yield b.then(b => b ? a : Promise.reject(nop))
    } else {
      if (predicate(a)) {
        yield a;
      }
    }
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
);

const tap = curry((f, a) => (f(a), a));

module.exports = {
  isIterable,
  curry,
  go,
  pipe,
  take,
  takeAll,
  flatMap,
  map,
  filter,
  reduce,
  range,
  join,
  find,
  queryStr,
  go1,
  tap,
  L,
  C
}