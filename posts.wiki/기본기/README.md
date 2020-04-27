#### 소프트웨어 생명주기
소프트웨어를 만들때는 규모를 불문하고 소프트웨어 생명주기 순서로 업무를 진행하는 것이 지향한다.
생명주기 순서로 진행하게 되면 효율적으로 시간을 활용할 수 있다.

- 정의단계
  - 요구명세화
  - 분석
- 개발단계
  - 설계
  - 개발
  - 시험
- 지원단계
  - 유지보수

#### 엔지니어링
- [애자일](애자일.md)
- [개발언어설정](개발언어설정.md)
- [코드품질](코드품질.md)
- [문서화](문서화.md)

#### ECMAScript

- [Concept](Concept.md)
- [Better](Better.md)
- [New Features](New+Features.md)
- [For library](For+library.md)
- [New-built-in-method](New-built-in-method.md)
- [Iterator&Generator](Iterator&Generator.md)
  - [Coroutine](Coroutine.md)
  - [Lazy Execution](Lazy-Execution.md)
  - [Yield 분석](Yield-분석.md)
- [Decorators](Decorators.md)
- [this](this.md)
- [async await 정리](async-await-정리.md)
- [Promise 정리](Promise-정리.md)
- [7 Tricks with Resting and Spreading JavaScript Objects](https://blog.bitsrc.io/6-tricks-with-resting-and-spreading-javascript-objects-68d585bdc83)

#### DOM
- [Event](Event.md)
  - [자식 레이어 팝업](자식-레이어-팝업.md)
  - [리스너와 핸들러](리스너와-핸들러.md)
- getComputedStyle : 계산된 스타일 사용

#### 테스트
- [BDD & TDD](BDD-&-TDD.md)
- [테스트 종류](테스트-종류.md)
- [테스트 작성](테스트-작성.md)

#### 기타
- [정규식](정규식.md)
- [코딩팁](코딩팁.md)
- [컴포넌트](컴포넌트.md)
  - 컴포넌트화는 뷰와 로직의 추상화이다
  - 컴포넌트 설계시 함수화와 동일한 방식으로 설계할 수 있다.
```js
componentName({prop1, prop2 ...})
```
```js
inputText({
  value: 'Hello World',
  disabled: isDisabled,
  onerror: isError,
  onsuccess: isSuccees
})
```
