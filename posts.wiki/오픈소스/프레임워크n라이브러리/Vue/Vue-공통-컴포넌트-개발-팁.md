## BaseInput 내에 input focus 검토 필요
- 가능함
  - https://vuejs.org/v2/guide/components-edge-cases.html#Accessing-Child-Component-Instances-amp-Child-Elements
- `ref`와 `:ref`를 혼동하지 말아야 함

## Input, Textarea
- v-model 형태로 양방향으로 데이터 통신을 한다.

## select
- Scoped Slot을 통해 옵션 UI를 선택적으로 한다.
- slot 내부에 있는 값은 기본값이고, 사용측에서 slot 사용 시 커스텀하게 UI를 가져갈 수 있다.
- 리스트 표시 할 때 `<slot :value="option">{{option}}</slot>` 형태로 `<template v-slot:default="option"></slot>`을 받을 수 있지만,
  - Placeholder 부분에도 사용 가능하다.
```html
<template v-if="selectedOption === placeholder">
  {{ selectedOption }}
</template>
<slot
  v-else
  :value="selectedOption"
>
  {{ selectedOption }}
</slot>
```

## 위임하기
`v-bind="$attrs"`, `v-on="$listeners"`로 부모로부터 전달받은 것들을 자식 컴포넌트에 위임할 수 있다.

- https://vuejs.org/v2/api/#inheritAttrs
- https://vuejs.org/v2/api/#vm-listeners