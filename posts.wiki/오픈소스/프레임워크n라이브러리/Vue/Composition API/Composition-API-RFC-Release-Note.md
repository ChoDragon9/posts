---
title: Composition API RFC 릴리즈 노트 정리
sidebar: auto
---

::: tip
`@vue/composition-api`의 릴리즈 노트를 통해 어떤 변경 사항이 생길지 예상하기 위해 정리한 포스트입니다.
:::

## v0.4.0
- [리팩토링] 이름변경 `createComponent` => `defineComponent`
- [라이프사이클] `onUnmounted`의 호출 시점이 `destroyed`와 `deactivated` => `destroyed`로 변경 [#217](https://github.com/vuejs/composition-api/pull/217/files#diff-3749ddba11f730d062a1c8aec308f09cL37)

## v0.3.3
- [라이프사이클] `onServerPrefetch` 추가
- [컨텍스트] `ssrContext` 추가
- [TypeScript] computed type 이슈 해결

## v0.3.2
- [TypeScript] `props` 옵션 타입 추론 개선

## v0.3.1
- [Fix] watcher 콜백이 정상적인 시점에 해제 안되는 현상 해결

## v0.3.0
- [TypeScript] TypeScript 타입 정의 개선
- [컨텍스트] `context.slots`가 render전에 사용할 수 없는 현상 해결

## v0.2.1
- [TypeScript] prop 타입을 직접 선언 가능함
```ts
import { createComponent, createElement as h } from '@vue/composition-api'

interface Props {
  msg: string
}

const MyComponent = createComponent<Props>({
  props: { 
     msg: {}  // required by vue 2 runtime
  },
  setup(props) {
    return () => h('div', props.msg)
  }
})
```
- [TypeScript] ref 타입 선언
```ts
const dateRef = ref<Date>(new Date);
```

## v0.2.0
- [리팩토링] 이름 변경 `onBeforeDestroy()` => `onBeforeUnmount()`
- [라이프사이클] `onCreated()`, `onDestroyed` 제거

## v0.1.0
- RFC로 되면서 패키지 이름 변경됨