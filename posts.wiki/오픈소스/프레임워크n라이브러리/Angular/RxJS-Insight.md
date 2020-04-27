### operator를 사용하면 항상 데이터는 불변 객체가 만들어 지나??

여기 of operator를 통해 Observable를 생성했습니다.
```js
const data$ = of({n: 1}, {n: 2}, {n: 3});
```
그리고 자신을 반환하는 함수와 제곱를 하는 함수를 pipe를 통해 받았습니다.
```js
const identity$ = data$.pipe(map(v => v));
const div$ = data$.pipe(
  map((v) => {
    v.n = v.n * v.n;
    return v;
  })
);
```
여기서 순서대로 실행하면 이와 같은 결과를 얻을 수 있습니다.
예상했듯이 원하는 데이터를 얻을 수 있었습니다.

```js
data$.subscribe(console.log);
// output { n: 1 }
// output { n: 2 }
// output { n: 3 }

identity$.subscribe(console.log);
// output { n: 1 }
// output { n: 2 }
// output { n: 3 }

div$.subscribe(console.log);
// output { n: 1 }
// output { n: 4 }
// output { n: 9 }
```

만약에 순서를 뒤집어서 실행하면 어떻게 될까요?? 불변객체가 유지 될까요??
순서를 변경해 보니 부수효과가 발생하는 것을 확인할 수 있었습니다.

```js
div$.subscribe(console.log);
// output { n: 1 }
// output { n: 4 }
// output { n: 9 }

identity$.subscribe(console.log);
// output { n: 1 }
// output { n: 4 }
// output { n: 9 }

data$.subscribe(console.log);
// output { n: 1 }
// output { n: 4 }
// output { n: 9 }
```

누구도 `data$`를 구독했을 때 변경된 값이 나오는 것을 원하지 않을 것입니다. 여기서 알 수 있는 것은
`operator`를 사용하더라도 내부값은 공유를 하고 있다는 것입니다. 즉, `operator`에 등록하는 함수도 모두 순수함수로 작성을 해야 합니다.

`identity$`와 `div$`에 모두 순수함수를 사용한 뒤 결과입니다.
```js
const identity$ = data$.pipe(map(({n}) => ({n})));
const div$ = data$.pipe(map(({n}) => ({n: n * n})));
```
```js
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
```

### pipe 중간에 에러가 발생하면 어떻게 되지??
안전한 함수합성을 위해 모나드를 사용하는 데, Observable은 에러가 발생되면 어떻게 처리되는 지 알아보기 위해 테스트를 해봤다. 아래 코드를 보면 정의되지 않는 객체를 접근하게 되어 `TypeError`가 발생하게 되었다.
```js
const data$ = of({v: null}).pipe(
  map(({v: {v}}) => v)
);
data$.subscribe(console.log);
// output: TypeError: Cannot destructure property `v` of 'undefined' or 'null'.
```

만약에 옵져버에 error 함수를 받으면 어떻게 될까? 놀랍게도 Throw로 던져지는 것은 모두 error 함수에 들어온다.
Throw를 발생시키지 않고 error 함수를 통해 처리를 가능하도록 할 수 있다.
```js
const data$ = of({v: null}).pipe(
  map(({v: {v}}) => v)
);
const observer = {
  next: console.log,
  error: () => (console.log('Error!'))
};
data$.subscribe(observer);
// output: Error!
```
