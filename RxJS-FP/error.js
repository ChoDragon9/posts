const { of } = require('rxjs');
const { map } = require('rxjs/operators');

const data$ = of({v: null}).pipe(
  map(v => v)
).pipe(
  map(v => v)
).pipe(
  map(v => v.test.test)
);
const observer = {
  next: console.log,
  error: () => (console.log('Error!'))
};
data$.subscribe(observer);