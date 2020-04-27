---
title: Composition API RFC 요약 및 자료 정리
sidebar: auto
---

::: tip
[Composition API RFC 번역](/blog/composition-api-rfc/)에 작성된 내용 요약과 [Vue Mastery](https://www.vuemastery.com/)에서 확인할 수 있는 Composition API 관련 영상을 정리한 내용입니다.
:::

## Composition API란
Composition API는 Vue 컴포넌트의 로직을 유연하고 구성하기 위한 API입니다. Vue 2.x에 추가 가능하고, Vue 3.0에서는 내장으로 제공할 함수기반 API 세트입니다. 가장 기본이 되는 API는 `ref`와 `reactive`입니다.

먼저 `ref`는 프리미티브 타입을 반응형 상태로 만들 수 있습니다.
```js
const count = ref(0)
console.log(count.value) // 0

count.value++
console.log(count.value) // 1
```

그리고 `reactive`는 객체를 반응형 상태로 만들 수 있습니다. `watchEffect` 함수를 통해 변경 감지를 할 수 있습니다.
```js
const state = reactive({
  count: 0
})

watchEffect(() => {
  console.log(state.count)
}) // -> 0

state.count++ // -> 2
```

Composition API의 내부 동작원리는 [상세 설계](/blog/composition-api-rfc/#상세-설계-detailed-design)에서 확인할 수 있습니다. 라이브 코딩을 확인하고 싶다면 [Connect.Tech 2019: Composing Functionality With The New Vue APIs](https://www.vuemastery.com/conferences/connect-tech-2019/composing-functionality-with-the-new-vue-apis/)에서 확인 할 수 있습니다.

## 동기 부여
Composition API를 만들게 된 동기 부여는 Vue 2의 한계입니다. Vue를 대규모 프로젝트에서 사용되면서 코드 재사용과 TypeScript 지원이 필요했지만 Vue 2는 코드 재사용이 깔끔하게 제공되지 않고 TypeScript를 적용하기에 부적합했습니다. 그러므로 실험과 논의를 통해 현재의 Composition API를 설계하게 되었습니다.

### 로직 재사용 & 코드 구성
- 복잡한 컴포넌트는 기능이 증가함에 따라 추론하기 더 어려워짐
  - 특히 개발자 본인이 작성하지 않은 코드를 읽을 때 발생 
- 여러 컴포넌트간에 논리를 추출하고 재사용하기 위한 깨끗하고 비용이 들지 않는 매커니즘이 없음
- Composition API는 특정 기능을 처리하는 함수로 구성 가능
- 컴포넌트 간에 또는 외부 컴포넌트 사이의 논리를 추출하고 재사용하는 것이 더 간단함

### 더 좋은 타입 추론
- 현재의 Vue는 `this` 컨텍스트를 의존하기 때문에 TypeScript와의 통합이 힘듬
  - 예를 들어 `methods`의 `this`는 `methods` 객체가 아닌 Vue 컴포넌트 인스턴스를 가리키고 있음
- TypeScript 클래스로 제작할 수 있는 라이브러리인 `vue-class-component`를 사용해도 불안정한 제안 단계인 [2단계의 데코레이터](https://github.com/tc39/proposal-decorators)를 의존해야함
- Composition API는 대부분 자연스럽게 **친숙한 일반 변수와 함수**를 사용함
- 메뉴얼 타입 힌트가 거의 필요없는 완전한 타입 추론을 사용 가능

Vue 2의 설계 한계에 대한 내용은 [Vue 3 Essentials: Why the Composition API - Vue Mastery](https://www.vuemastery.com/courses/vue-3-essentials/why-the-composition-api/)에서 확인할 수 있습니다.

## 문제점
### Refs 도입의 오버헤드
- 참조값과 일반값 및 객체를 지속적으로 구분해야 되기 때문에 정신적 부담이 증가시킴
  - `xxxRef` 형태로 명명규칙 또는 TypeScript를 사용하여 정신적인 부담 줄일 수 있음
- `ref`을 읽고 변경하는 것은 `.value`가 필요하기 때문에 일반값을 작업하는 것보다 더 장황함

### `ref`와 `reactive`
- Composition API를 효율적으로 사용하려면 `ref`와 `reactive`를 모두 이해해야 함
- 하나를 독점적으로 사용하면 난해한 해결 방법이 될 가능성이 높음
- `reactive` 사용 시 반응성을 유지하기 위해 [구조 분해](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)나 [전개 구문](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Spread_syntax)을 할 수 없음
  - 이 제약 조건을 처리하기 위해 `toRefs` API가 제공됨
- 프리미티브 타입 변수은 `ref`, 객체 변수는 `reactive`을 사용하는 것 권고함
- `reactive`을 사용하고 `toRefs`을 사용하는 것을 권고함

### 유연성이 높을수록 더 많은 훈련이 필요
- Composition API는 코드 품질의 상한선을 높이는 동시에 하한선을 낮췄음
  - 하한선의 손실보다 상한선의 이득이 크다는 판단을 함
  - 적절한 문서나 커뮤니티 지침을 통해 코드 구성 문제를 효과적으로 해결 할 수 있음
- Composition API는 **컨텍스트에 의존하지 않기 때문에** JavaScript 코드 구성의 핵심 매커니즘인 논리를 **별도의 함수로 훨씬 쉽게 분리**할 수 있음

## 적용 전략
- Composition API는 순전히 부가적이며 기존 2.x API에 영향을 미치거나 어디에도 사용되지 않음
- [@vue/composition-api](https://github.com/vuejs/composition-api) 라이브러리를 통해 2.x 플러그인으로 제공됨
- 라이브러리의 주요 목표는 API를 실험하고 피드백을 수집하는 방법을 제공하는 것임
- 이 제안이 업데이트 될 때 브레이크 체인지가 될 수 있으므로 **이 단계에서는 프로덕션에서 사용하지 않는 것이 좋음**

## 끝
[적용 전략](#적용-전략)에서 **이 단계에서는 프로덕션에서 사용하지 않는 것이 좋음**을 확인할 수 있습니다. RFC가 진행되어 변경 가능성이 높기 때문에 프로덕션으로 사용하지 않기를 권고하는 것으로 추측됩니다. 하지만 이런한 부분은 구조 설계를 통해서 해결할 수 있을 것으로 보입니다.