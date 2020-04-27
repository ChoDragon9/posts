#### 배경
- 팝업 Wrapper 컴포넌트를 사용
- Wrapper 컴포넌트에서 팝업 높이에 따라 CSS Class를 추가해야함

#### 이슈
- slot 으로 전달되는 DOM의 높이가 비동기적으로 처리됨
- Wrapper 컴포넌트의 mounted 내부에서 nextTick에도 감지가 안됨

#### 해결방안
- updated 로 자식의 리렌더링을 감지함
- updated만으로는 리렌더링이 되었음을 보장할 수 없기 때문에 nextTick 사용
  - https://kr.vuejs.org/v2/api/#updated