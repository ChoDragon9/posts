> 출처 : [니콜라스 자카스] 프론트엔드 개발자를 위한 자바스크립트 프로그래밍

### 글의 목적
ES5에서 this를 다루기 위해서는 this에 대한 깊은 이해가 필요하다. 그리고 프런트 개발자라면 기술면접시 질문을 받아봤을 만한 단골 문제이기도 하다.
이 글은 자바스크립트를 입문할 때 하나의 산이 었던 this를 정리한 내용이다. 

### this란
`this`란 **호출부의 참조**이다. 호출부의 참조를 결정하는 방법은 네가지가 있다.

#### 첫번째, 단독 함수 실행 할 경우 전역 객체가 **기본 바인딩**이 된다.
전역에서 함수를 호출하고 함수가 this를 참고하면 전역 객체를 사용하게 된다.
```js
function foo() {
  console.log(this.a);
}
var a = 'Hello World';
foo(); // Hello World
```

#### 두번째, 호출부에 콘텍스트 객체가 있을 때, 객체가 **암시적 바인딩**을 한다.
함수(정확히는 메서드이다)를 호출할 때 객체가 있으면 객체를 참조하게 됩니다. 
```js
function foo () {
  console.log(this.a);
}
const obj = {
  a: 2019,
  foo
};
obj.foo(); // 2019
```
객체 메소드를 변수에 할당 후 호출하면 **암시적 소실**이 된다.
```js
const myFoo = obj.foo;
myFoo(); // undefined
```

#### 세번째, call, apply, bind를 사용하면 **명시적 바인딩**이 된다.
함수를 호출할 때 명시적으로 this가 참조하는 것이 무엇인지를 정의하면 해당 객체가 this로 사용된다.
```js
function foo () {
  console.log(this.a);
}
const obj = { a: 2019 };
foo.call(obj); // 2019
foo.apply(obj); // 2019
foo.bind(obj)(); // 2019
```

#### 네번째, new를 붙여 함수를 호출하면 생성된 객체를 this 바인딩한다.
```js
function foo () {
  setTimeout(() => {
    console.log(this.a); // 2019
  });
}
const bar = new foo();
bar.a = 2019;
```

### ES6에서 this
ES6부터는 이 규칙들을 따르지 않는 특별한 함수가 있다. 바로 화살표 함수라고 하며, 4가지 표준 규칙 대신에 두른 스코프(Enclosing Scope)를 보고 this를 바인딩한다.

#### 공통 HTML 코드
```html
<button>0</button>
```

#### ES5
```js
var app = {
  count: 0,
  init: function () {
    document.querySelector('button')
      .addEventListener('click', this.upCount.bind(this))
  },
  upCount: function () {
    this.count++
    this.render()
  },
  render: function () {
    document.querySelector('button')
      .textContent = this.count
  }
}
app.init()
```

#### ES6
```js
const app = {
  count: 0,
  init() {
    document.querySelector('button')
      .addEventListener('click', () => {
        this.upCount()
      })
  },
  upCount() {
    this.count++
    this.render()
  },
  render() {
    document.querySelector('button')
      .textContent = this.count
  }
}
app.init()
```