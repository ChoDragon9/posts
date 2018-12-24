const { of } = require('rxjs');
const { catchError, map } = require('rxjs/operators');

const arr$ = of(1, 2, 3).pipe(
  map(() => null),
  map(v => {
    throw new Error('죽어랏!');
    return v / 2;
  }),
  catchError(() => {
    return of('마! 내가 니 서장이랑 사우나도 갔어 에!')
  })
);

arr$.subscribe({
  next: (v) => {
    console.log(v);
  },
  error: () => {
    console.log('error');
  }
});