### 데코레이터 개요
- [tc39/proposal-decorators](https://github.com/tc39/proposal-decorators)에 정의
- [Orthogonal Classes](https://github.com/erights/Orthogonal-Classes)와 [Class Evaluation Order](https://onedrive.live.com/view.aspx?resid=A7BBCE1FC8EE16DB!442046&app=PowerPoint&authkey=!AEeXmhZASk50KjA) 제안을 바탕으로 Decorators와 [Class Field](https://tc39.github.io/proposal-class-fields/) 및 [Private methods](https://github.com/tc39/proposal-private-methods)를 함께 작동시키는 방법에 대한 결합 된 비전을 제안
- 장식자는 추가 기능을 만드는 것에 유용함
- 메모이제이션, 접근 제어, 인증, 계측, 타이밍 처리, 로깅, 속도 제한 등에 사용된다.
- 아래와 같은 기능을 할 수 있다.
  - `@defineElement` 커스텀 엘레멘트를 생성하는 기능
  - `@bound` 디바운드 처리 기능
  - `@observed` 필드를 감시하며 변경시 자동으로 `render()`를 호출하는 기능
```js
@defineElement('num-counter')
class Counter extends HTMLElement {
  @observed #x = 0;

  @bound
  #clicked() {
    this.#x++;
  }

  constructor() {
    super();
    this.onclick = this.#clicked;
  }

  connectedCallback() { this.render(); }

  @bound
  render() {
    this.textContent = this.#x.toString();
  }
}
```

#### Orthogonal = 직교성
- **직교**란 둘 이상의 서로 다른 체계가 서로 영향을 주지 않으면서 함께 동작할 수 있는 상태나 특징을 말한다.
- 어떤 프로그램이 변경이 되도 다른 프로그램에 영향을 주지 않는 다면 서로 직교한다고 한다.
- 일종의 독립성, 결합도를 낮추는 것을 말한다.

#### Field declarations
```js
// ES2015
class Counter {
  constructor () {
    this.x = 0
  }
}

// ESnext field declarations proposal
class Counter {
  x = 0
  constructor () { }
}
```

#### Private methods and fields
```js
class Counter {
  #x = 0
  #clicked () { }
}
```