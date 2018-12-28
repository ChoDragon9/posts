const { of, from, BehaviorSubject, interval, empty } = require('rxjs');
const { map, catchError, skip, filter } = require('rxjs/operators');

of(1, 2, 3)
  .pipe(
    map((n) => {
      if (n === 2) throw new Error('');
      return n * n;
    }),
    catchError(() => {
      return of('sdf');
    })
  ).subscribe(console.log, () => console.log('Error!'))