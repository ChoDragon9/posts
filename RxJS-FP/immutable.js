const { of } = require('rxjs');
const { map } = require('rxjs/operators');

const data$ = of({n: 1}, {n: 2}, {n: 3});
const identity$ = data$.pipe(map(({n}) => ({n})));
const div$ = data$.pipe(map(({n}) => ({n: n * n})));

// data$.subscribe(console.log);
// // output { n: 1 }
// // output { n: 2 }
// // output { n: 3 }
//
// identity$.subscribe(console.log);
// // output { n: 1 }
// // output { n: 2 }
// // output { n: 3 }
//
// div$.subscribe(console.log);
// // output { n: 1 }
// // output { n: 4 }
// // output { n: 9 }

div$.subscribe(console.log);
// output { n: 1 }
// output { n: 4 }
// output { n: 9 }

identity$.subscribe(console.log);
// output { n: 1 }
// output { n: 2 }
// output { n: 3 }

data$.subscribe(console.log);
// output { n: 1 }
// output { n: 2 }
// output { n: 3 }