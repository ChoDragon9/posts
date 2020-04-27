소프트웨어 개발에서 발생하는 문제에 대한 해결방법을 정리한다. 프레임워크, 라이브러리, 디자인 패턴에는 문제 해결에 대한 철학이 담겨 있으므로 참고하여 작성한다.

#### 소프트웨어 공학
- [플루언트 인터페이스](https://ko.wikipedia.org/wiki/%ED%94%8C%EB%A3%A8%EC%96%B8%ED%8A%B8_%EC%9D%B8%ED%84%B0%ED%8E%98%EC%9D%B4%EC%8A%A4)
- [스니펫, snippet](https://ko.m.wikipedia.org/wiki/%EC%8A%A4%EB%8B%88%ED%8E%AB)
  - https://www.30secondsofcode.org/js/p/1/
  - https://github.com/leonardomso/33-js-concepts#notification-settings
- [동시성과 병렬성](동시성과-병렬성)
  - https://talks.golang.org/2012/waza.slide#1
- [마샬링](https://ko.wikipedia.org/wiki/%EB%A7%88%EC%83%AC%EB%A7%81_(%EC%BB%B4%ED%93%A8%ED%84%B0_%EA%B3%BC%ED%95%99))

#### 성질
- 다형성
  - 자료형 체계의 성질
  - 2개 이상의 자료형에 속하는 것이 허가되는 성질
  - 반대말로 단형성으로, 한가지 형태만 가지는 성질을 가리킴

#### 용어별 정리
- Modifier : 행위의 범위를 좁혀 기능을 수식하는 것
- 컴포넌트 : 자체 뷰와 데이터 로직의 재사용
  - Props
    - 동일한 자식 컴포넌트가 있을 때 각각 다른 데이터를 전달 후 렌더링 해야 되는 데
    - 각각 데이터를 지정하는 방식보다 선언적으로 정의하는 게 깔끔함
- 믹스인 : 컴포넌트의 기능 재사용
- 가상돔 : DOM 렌더링 최적화
- 단방향 데이터 바인딩 : 추론이 쉽고 유지 관리가 쉬운 의사소통
- 디렉티브 : DOM 조작 캡슐
- 라이브러리 : 기능들의 집합을 제공
- 프레임워크 : 일련의 정형화된 구조를 가진 구현체 제공
- 의존성 관리 : 의존관계 주입
- 라이프사이클 훅
  - 템플릿 컴파일, DOM 마운트, DOM 업데이트 감시 일련의 단계를 거친다.
  - 그 과정을 사용자 정의 로직을 실행할 수 있게 하기 위해 제공한다.
- 템플릿 바인딩 : 선언적인 데이터 바인딩
- 스케쥴 : 비동기 함수를 버퍼에 담아 중복의 제거로 불필요한 계산과 DOM 조작을 피하기 위해
- 불변객체 : 상태가 변경되지 않게 하기 위함
- 메모이제이션 : 의존성있는 프로퍼티들의 변경이 일어날 때만 새로 연산
- 파이프 : 어떤 값의 형태를 바꿀 때 사용하는 템플릿 엘리먼트
- 스토어 : 글로벌 영역에 앱의 상태와 비즈니스 로직을 가지고 있는 주체
- Computed(계산된 속성)
  - 의존성있는 프로퍼티들의 변경이 일어났을 때만 새로 연산한다.
  - 기본적으로 메모리제이션이 구현되있다.
- 컴파일 포맷
  - amd: Asynchronous Module Definition, used with module loaders like RequireJS
  - cjs: CommonJS, suitable for Node and other bundlers
  - esm: Keep the bundle as an ES module file, suitable for other bundlers and inclusion as a <script type=module> tag in modern browsers
  - iife: A self-executing function, suitable for inclusion as a <script> tag. (If you want to create a bundle for your application, you probably want to use this.)
  - umd: Universal Module Definition, works as amd, cjs and iife all in one
  - system: Native format of the SystemJS loader

#### 시나리오별 정리
- 템플릿 변경 방지
  - `<template>`라는 컴포넌트 제공
  - Directive 사용 시 `<template>` 사용
- 조합이 가능한 형태 라이브러리
   - 컴패니언 라이브러리 형태 사용
   - 코어, 라우팅, 상태관리 모두 별도 라이브러리
- 감시자 런타임 퍼포먼스
   - 종속성 추적 관찰 시스템으로 명시적 종속 관계 추적
   - 관계있는 부분만 트리거
- 결합도 낮추기
   - 의존성 주입
   - 감시패턴
- 에러 처리
  - 모나드 중 Maybe, Either를 통해 해결
  - `try-catch`, `null 체크`를 하지 않고, 제어 흐름이 흐르도록한 뒤 마지막에 에러 처리를 한다.
- 상태 관리 도구 사용
  - 다중 계층 컴포넌트에서 데이터와 메소드 접근의 복잡성 해결
  - 컴포넌트에 집중된 비즈니스 로직의 분리

#### 구조
- 코드 정리 방법 : [SLAP 원칙](프로그래밍의-정석#25-slapsingle-level-of-abstraction-principle)
- 네이밍 : [명명이 중요하다](프로그래밍의-정석#27-명명이-중요하다naming-is-important)