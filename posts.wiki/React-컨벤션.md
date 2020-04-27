### 글의 목적
React로 개발된 서비스의 코드리뷰를 받았는 데, React에 대한 경험이 없었다. Vue, Angular만 실무에 사용해봐서 React의 컨벤션과 개념이 생소했다.

코드리뷰 할 때 React에서 통용되는 컨벤션인지 개발자가 작성한 코드인지 구분하기 위해 생소한 내용을 정리했다. 구조 파악 및 생소했던 부분을 단순히 카테고리 형태로 정리하여 개념을 이해하는 데 초점을 뒀다.

### 네이밍 컨벤션
Vue, Angular, React는 라이프 사이클 훅명이 모두 다르다. 그래서 어떤 명을 사용하는 지 알아둘 필요가 있다.
그리고 Prefix와 Suffix 규칙이 눈에 띄어 정리해봤다.

#### 라이프 사이클
> https://ko.reactjs.org/docs/state-and-lifecycle.html

- getDerivedStateFromProps
- shouldComponentUpdate
- render
- getSnapshotBeforeUpdate
- componentDidMount
- componentDidUpdate
- componentDidUnmount

#### Prefix
- with~ : 고차 컴포넌트
- set~ : 값 설정
- use~ : Hook API

#### Suffix
- ~Context : Context API
- ~Reducer : 리듀서

### API 컨벤션
Context, Hook, Immer API에 대한 눈에 띄었던 부분을 작성했다.

#### Context API
> https://ko.reactjs.org/docs/context.html

상위 컴포넌트에서 하위 컴포넌트에 상태를 전달하고자 할 때 사용한다. 컴포넌트를 통해 상태를 공유한다.

- Context.Provider : 상위 컴포넌트에서 하위 컴포넌트에 상태를 전달하고자 할 때 사용하는 컴포넌트
- Context.Consumer : 하위 컴포넌트에서 상태를 사용하고자 할 때 사용하는 컴포넌트

#### Hook API
> https://ko.reactjs.org/docs/hooks-intro.html

React에 제공하는 기능을 함수 형태로 사용하는 API이다.

- useState : 상태 관리
- useEffect : 라이프 사이클
- useContext : 컨텍스트 사용
- useRef : 돔 접근
- useMemo, useCallback : 메모이제이션
- useReducer : 리듀서

#### Immer
> https://immerjs.github.io/immer/docs/introduction#immer

- produce : 비순수 함수를 콜백으로 사용하여 불변성을 구현해줌

### 끄읕