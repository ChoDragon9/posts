https://www.typescriptlang.org/docs/handbook/basic-types.html

#### 타입 지정
```ts
let name1 = 'John Smith';
let name2 : string = 'John Smith';
let salary : number;
let name : string = 'Alex';
let isValid : boolean;
let customerName : string = null;
```
변수나 함수의 인자에 타입을 명시하지 않으면 TypeScript 컴파일러는 이 변수가 any 타입을 지정한 것으로 간주한다.

#### 함수
> Javascript
```js
function calcTax (state, income, dependents) {
  if (state === 'NY') {
  ...
  } else {
  ...
  }
}
```
> TypeScript
```ts
function calcTax (state : string, income : number, dependents : number) : number {
  if (state === 'NY') {
  ...
  } else {
  ...
  }
}
```

#### 인자 기본값
기본값이 있는 인자는 인자들 중에 마지막에 있어야함.
```ts
function calcTax (dependents : number, state : string = 'NY') : number {
  if (state === 'NY') {
  ...
  } else {
  ...
  }
}
```

#### 옵션 인자
```ts
function calcTax (dependents : number, state? : string = 'NY') : number {
  if (state === 'NY') {
  ...
  } else {
  ...
  }
}
```
