---
title: Composition API RFC 번역
sidebar: auto
---

::: warning
Composition API 학습을 위해 [Composition API RFC](https://vue-composition-api-rfc.netlify.com/)을 번역한 포스트입니다. 공식 문서가 아님을 밝힙니다.
:::

::: tip
RFC(Request for Comments) 문서는 비평을 기다리는 문서라는 의미로, 컴퓨터 네트워크 공학 등에서 인터넷 기술에 적용 가능한 새로운 연구, 혁신, 기법 등을 아우르는 메모를 나타낸다.

- 출처: [위키백과:RFC](https://ko.wikipedia.org/wiki/RFC)
:::

- 참고 이슈: [#42](https://github.com/vuejs/rfcs/pull/42)

## 요약
컴포지션 API 소개: 컴포넌트 로직을 유연하게 구성할 수 있는 부가적인 함수기반 API 세트입니다.

## 기초 예제
```html
<template>
  <button @click="increment">
    Count is: {{ state.count }}, double is: {{ state.double }}
  </button>
</template>

<script>
import { reactive, computed } from 'vue'

export default {
  setup() {
    const state = reactive({
      count: 0,
      double: computed(() => state.count * 2)
    })

    function increment() {
      state.count++
    }

    return {
      state,
      increment
    }
  }
}
</script>
```

## 동기 부여
### 로직 재사용 & 코드 구성
우리 모두가 Vue가 매우 쉽게 픽업하고 중소 규모의 응용 프로그램을 쉽게 구축하는 방법을 좋아합니다. 그러나 오늘날 Vue의 채택이 증가함에 따라 많은 사용자가 Vue를 사용하여 여러 개발자 팀이 오랜 기간 동안 반복하고 유지 관리하는 대규모 프로젝트를 구축하고 있습니다. 수년에 걸쳐 우리는 이러한 프로젝트 중 일부가 Vue의 현재 API에 수반되는 프로그래밍 모델의 한계에 부딪히는 것을 목격했습니다. 문제는 두 가지 범주로 요약할 수 있습니다.

1. 복잡한 컴포넌트의 코드는 시간이 지남에 따라 기능이 증가함에 따라 추론하기 더 어려워집니다. 이것은 특히 개발자가 스스로 작성하지 않은 코드를 읽을 때 경우에 발생합니다. 근본 원인은 Vue의 기존 API가 옵션별로 코드 구성을 강요하지만 경우에 따라 논리적 문제로 코드를 구성하는 것이 더 합리적입니다.
2. 여러 컴포넌트간에 논리를 추출하고 재사용하기 위한 깨끗하고 비용이 들지 않는 메커니즘이 없습니다. ([논리 추출 및 재사용](#논리-추출-및-재사용)에 대한 자세한 내용)

이 RFC에서 제안된 API는 컴포넌트 코드를 구성할 때 사용자에게 더 많은 유연성을 제공합니다. 코드는 항상 옵션별로 코드를 구성하는 대신 특정 기능을 처리하는 함수로 구성 할 수 있습니다. 또한 API는 컴포넌트 간에 또는 심지어 외부 컴포넌트 사이의 논리를 추출하고 재사용하는 것이 더 간단합니다. [상세 설계](#상세-설계) 섹션에서 이러한 목표를 달성하는 방법을 보여 드리겠습니다.

### 더 좋은 타입 추론
대규모 프로젝트를 수행하는 개발자의 또 다른 일반적인 기능 요청은 더 나은 TypeScript 지원입니다. Vue의 현재 API는 TypeScript와의 통합과 관련하여 Vue의 속성을 노출하기 위해 단일 `this` 컨텍스트에 의존하고 Vue 컴포넌트에서 `this` 를 사용하는 것이 약간 더 많기 때문에 몇 가지 문제를 제기했습니다. 일반 JavaScript 보다 마술적입니다. (예: `methods` 아래에 중첩된 함수의 `this` 는 `methods` 오브젝트가 아닌 컴포넌트 인스턴스를 가리 킵니다). 즉, Vue의 기존 API는 단순히 타입 추론를 염두에 두고 설계되지 않았으며 TypeScript와 잘 작동하도록 만들 때 많은 복잡성을 만듭니다.

오늘날 Vue를 TypeScript와 함께 사용하는 대부분의 사용자는 데코레이터의 도움을 받아 컴포넌트를 TypeScript 클래스로 제작할 수 있는 라이브러리인 `vue-class-component` 를 사용하고 있습니다. 3.0을 설계하는 동안 [이전 (드롭된) RFC](https://github.com/vuejs/rfcs/pull/17)에서 입력 문제를 보다 효과적으로 해결하기 위해 내장 클래스 API를 제공하려고 시도했습니다. 그러나 설계에 대해 논의하고 반복하면서 클래스 API가 타이핑 문제를 해결하려면 데코레이터에 의존해야 한다는 것을 알았습니다. 이는 구현 세부 사항에 대해 많은 불확실성이 있는 매우 불안정한 2단계 제안입니다. 이것은 기반을 세우는 데 다소 위험한 토대가 됩니다. (클래스 API 타입 문제에 대한 자세한 내용은 [여기](#클래스-api의-타입-이슈))

이에 비해서, 이 RFC에서 제안 된 API는 대부분 자연스럽게 친숙한 일반 변수와 함수를 사용합니다. 제안 된 API로 작성된 코드는 메뉴얼 타입 힌트가 거의 필요없는 완전한 타입 추론을 즐길 수 있습니다. 이는 제안 된 API로 작성된 코드가 TypeScript와 일반 JavaScript에서 거의 동일하게 보일 것이므로 TypeScript가 아닌 사용자도 더 나은 IDE 지원을 위해 타이핑을 활용할 수 있다는 것을 의미합니다.

## 상세 설계

### API 소개
여기에서 제안되는 API는 새로운 개념을 도입하는 대신 반응 상태 생성 및 관찰과 같은 Vue의 핵심 기능을 독립형 함수로 노출하는 것에 관한 것입니다. 여기서는 가장 기본적인 API를 소개하고 컴포넌트 로직을 표현하기 위해 2.x 옵션 대신 사용하는 방법을 소개합니다. 이 섹션은 기본 아이디어를 소개하는 데 중점을 두므로 각 API에 대한 자세한 내용은 다루지 않습니다. 전체 API 사용은 [API Reference](https://vue-composition-api-rfc.netlify.com/api) 섹션에서 확인할 수 있습니다.

#### 반응형 상태와 부수효과
간단한 작업부터 시작하겠습니다: 일부 반응 상태 선언.

```js
import { reactive } from 'vue'

// reactive state
const state = reactive({
  count: 0
})
```

`reactive` 는 2.x의 현재 `Vue.observable()` API와 동일하며 RxJS Observables과 혼동되지 않도록 이름을 변경되었습니다. 여기서 반환된 상태는 모든 Vue 사용자에게 친숙해야 하는 반응형 객체입니다.

Vue에서 반응형 상태의 필수 사용 사례는 렌더링 중에 사용할 수 있다는 것입니다. 종속성 추적 덕분에 반응형 사태가 변경 될 때 뷰가 자동으로 업데이트됩니다. DOM에서 무언가를 렌더링하는 것은 "부수효과"로 간주됩니다: 우리의 프로그램은 프로그램 자체(DOM) 외부의 상태를 수정하고 있습니다. 반응형 상태에 따라 부수효과를 적용하고 자동으로 다시 적용하려면 `watchEffect` API를 사용할 수 있습니다.

```js
import { reactive, watchEffect } from 'vue'

const state = reactive({
  count: 0
})

watchEffect(() => {
  document.body.innerHTML = `count is ${state.count}`
})
```

`watchEffect` 는 원하는 부수효과를 적용하는 함수를 기대합니다 (이 경우 `innerHTML` 설정). 함수를 즉시 실행하고 실행 중에 사용한 모든 반응 상태 속성을 종속성으로 추적합니다. 여기서 `state.count` 는 초기 실행 후이 감시자에 대한 종속성으로 추적됩니다. 앞으로 `state.count` 가 변경되면 내부 함수가 다시 실행됩니다.

이것이 Vue의 반응형 시스템의 핵심입니다. 컴포넌트의 `data()`에서 객체를 반환하면 내부적으로 `reactive()`에 의해 반응이 이루어집니다. 템플릿은 이러한 반응형 속성을 사용하는 렌더링 함수 (보다 효율적인 `innerHTML`로 생각)로 컴파일 됩니다.

> `watchEffect` 는 2.x `watch` 옵션과 유사하지만 감시된 데이터 소스와 부수효과 콜백을 분리할 필요가 없습니다. Composition API는 2.x 옵션과 정확히 동일한 동작을 하는 `watch` 기능을 제공합니다.

위의 예제를 계속하면 사용자 입력을 처리하는 방법입니다.

```js
function increment() {
  state.count++
}

document.body.addEventListener('click', increment)
```

그러나 Vue의 템플릿 시스템을 사용하면 `innerHTML` 이나 수동으로 이벤트 리스너를 연결할 필요가 없습니다. 가상의 `renderTemplate` 메소드를 사용하여 예제를 단순화하여 반응성 측면에 집중할 수 있습니다.

```js
import { reactive, watchEffect } from 'vue'

const state = reactive({
  count: 0
})

function increment() {
  state.count++
}

const renderContext = {
  state,
  increment
}

watchEffect(() => {
  // hypothetical internal code, NOT actual API
  renderTemplate(
    `<button @click="increment">{{ state.count }}</button>`,
    renderContext
  )
})
```

#### 계산된 상태와 Refs
때때로 우리는 다른 상태에 의존하는 상태가 필요합니다. Vue에서는 *계산된 속성* 으로 처리 됩니다. 계산된 값을 직접 생성하기 위해 `computed` API를 사용할 수 있습니다 :

```js
import { reactive, computed } from 'vue'

const state = reactive({
  count: 0
})

const double = computed(() => state.count * 2)
```

`computed` 란 무엇입니까? 내부에서 `computed` 이 어떻게 구현되는 지 추측하면 다음과 같은 결과가 나올 수 있습니다.

```js
// 단순화된 의사 코드
function computed(getter) {
  let value
  watchEffect(() => {
    value = getter()
  })
  return value
}
```
그러나 우리는 이것이 작동하지 않는다는 것을 압니다: 만약 `value` 가 `number` 와 같은 프리미티브 타입이라면, `computed` 내부의 업데이트 로직에 대한 연결은 반환되면 손실 될 것입니다. 이는 JavaScript 프리미티브 타입이 참조가 아닌 값으로 전달되기 때문입니다.

값이 객체에 속성으로 할당 될 때도 같은 문제가 발생합니다. 반응형 값은 속성으로 할당되거나 함수에서 반환 될 때 반응성을 유지할 수 없는 경우가 그다지 유용하지 않습니다. 항상 최신 계산값을 읽을 수 있게 하려면 실제 값을 객체에 래핑하고 대신 해당 객체를 반환해야 합니다.

```js
// 단순화된 의사 코드
function computed(getter) {
  const ref = {
    value: null
  }
  watchEffect(() => {
    ref.value = getter()
  })
  return ref
}
```

또한 의존성 추적 및 변경 알림을 수행하기 위해 객체의 `.value` 속성에 대한 읽기/쓰기 작업을 가로 챌 필요가 있습니다 (간단하게 하기 위해 코드를 생략). 이제 반응성 손실에 대한 걱정없이 계산된 값을 참조로 전달할 수 있습니다. 단점은 최신값을 검색하기 위해  이제 `.value` 를 통해 값을 접근해야 한다는 것입니다.

```js
const double = computed(() => state.count * 2)

watchEffect(() => {
  console.log(double.value)
}) // -> 0

state.count++ // -> 2
```

여기에서 double은 보유하고 있는 내부값에 대한 반응성 참조로 사용되므로 "ref"라고 하는 객체입니다.

> Vue에는 이미 "refs"라는 개념이 있지만 템플릿에서 DOM 요소 또는 컴포넌트 인스턴스를 참조하는 경우에만 해당됩니다 ("template refs"). [여기](https://vue-composition-api-rfc.netlify.com/api.html#template-refs)에서 새로운 refs 시스템이 논리적인 상태 및 템플릿 refs에 어떻게 사용 될 수 있는 지 확인하십시오.

계산된 refs외에, `ref` API를 사용하여 일반 가변 참조를 직접 만들 수도 있습니다.

```js
const count = ref(0)
console.log(count.value) // 0

count.value++
console.log(count.value) // 1
```

#### 참조 언래핑
렌더 컨텍스트에서 ref를 속성으로 노출 할 수 있습니다. 내부적으로  Vue는 렌더 컨텍스트에서 ref가 발생할 때 컨텍스트가 내부값을 직접 노출하도록 ref에 대해 특별한 처리를 수행합니다. 이는 템플릿에서 `count.value` 대신 `count` 를 직접 쓸 수 있음을 의미합니다.

다음은 `reactive` 대신 `ref` 를 사용하는 동일한 카운터 예제의 버전입니다.

```js
import { ref, watch } from 'vue'

const count = ref(0)

function increment() {
  count.value++
}

const renderContext = {
  count,
  increment
}

watchEffect(() => {
  renderTemplate(
    `<button @click="increment">{{ count }}</button>`,
    renderContext
  )
})
```

또한 참조가 반응 객체 아래에 속성으로 중첩되면 접근 시 자동으로 래핑되지 않습니다.

```js
const state = reactive({
  count: 0,
  double: computed(() => state.count * 2)
})

// `state.double.value` 를 사용할 필요가 없습니다.
console.log(state.double)
```

#### 컴포넌트 내에서 사용방법
우리 코드는 이미 사용자 입력에 따라 업데이트 할 수 있는 작동하는 UI를 제공하지만 코드는 한번만 실행되며 재사용 할 수 없습니다. 논리를 재사용하려면 합리적인 다음 단계로 논리를 함수로 리팩토링 하는 것입니다.

```js
import { reactive, computed, watchEffect } from 'vue'

function setup() {
  const state = reactive({
    count: 0,
    double: computed(() => state.count * 2)
  })

  function increment() {
    state.count++
  }

  return {
    state,
    increment
  }
}

const renderContext = setup()

watchEffect(() => {
  renderTemplate(
    `<button @click="increment">
      Count is: {{ state.count }}, double is: {{ state.double }}
    </button>`,
    renderContext
  )
})
```

> 위의 코드가 컴포넌트 인스턴스의 존재에 의존하지 않는 방법에 유의하십시오. 실제로 지금까지 소개된 API는 모두 컴포넌트의 컨텍스트 외부에서 사용할 수 있으므로 보다 다양한 시나리오에서 Vue의 반응성 시스템을 활용할 수 있습니다.

이제 `setup()` 호출, 감시자 생성 및 템플릿을 프레임워크로 렌더링 하는 작업을 마치면 `setup()` 함수와 템플릿만으로 컴포넌트를 정의 할 수 있습니다.

```html
<template>
  <button @click="increment">
    Count is: {{ state.count }}, double is: {{ state.double }}
  </button>
</template>

<script>
import { reactive, computed } from 'vue'

export default {
  setup() {
    const state = reactive({
      count: 0,
      double: computed(() => state.count * 2)
    })

    function increment() {
      state.count++
    }

    return {
      state,
      increment
    }
  }
}
</script>
```

이것은 우리가 잘 알고 있는 단일 파일 컴포넌트 형식이며 논리 형식(`<script>`) 만 다른 형식으로 표현됩니다. 템플릿 구문은 그대로 유지됩니다. `<script>` 은 생략되었지만 정확히 동일하게 작동합니다.

#### 라이프사이클 훅
지금까지 컴포넌트의 순수한 상태 측면인 사용자 상태의 반응 상태, 계산된 상태 및 변경 상태에 대해 살펴 보았습니다. 그러나 컴포넌트는 부수효과를 수행해야 할 수도 있습니다 (예: 콘솔 로깅, ajax 요청 전송 또는 `window` 에서 이벤트 리스너 설정). 이러한 부수효과는 일반적으로 다음 타이밍에 수행됩니다.

- 상태가 변할 때
- 컴포넌트가 마운트, 업데이트 또는 마운트 해제 될 때(라이프사이클 훅)

우리는 `watchEffect` 와 `watch` API를 사용하여 상태 변화에 따라 부수효과를 적용할 수 있다는 것을 알고 있습니다. 서로 다른 라이브사이클 훅에서 부수효과를 수행하기 위해 전용 `onXXX` API(기존 라이프사이클 옵션을 직접 미러링)를 사용할 수 있습니다.

```js
import { onMounted } from 'vue'

export default {
  setup() {
    onMounted(() => {
      console.log('component is mounted!')
    })
  }
}
```

이러한 라이프사이클 등록 방법은 `setup` 훅을 호출하는 동안에만 사용할 수 있습니다. 내부 전역 상태를 사용하여  `setup` 훅을 호출하는 현재 인스턴스를 자동으로 알아냅니다. 이 기능은 의도적으로 논리를 외부 기능으로 추출 할 때 마찰을 줄이도록 설계되었습니다.

> 이러한 API에 대한 자세한 내용은 [API Reference](https://vue-composition-api-rfc.netlify.com/api) 에서 확인할 수 있습니다. 그러나 설계 세부 사항을 파기 전에 다음 섹션을 마무리하는 것이 좋습니다.

### 코드 구성
이 시점에서 가져온 함수로 컴포넌트 API를 복제했습니다. 옵션으로 컴포넌트를 정의하는 것은 큰 기능으로 모든 것을 함께 혼합하는 것보다 훨씬 더 체계적으로 보입니다!

이해할 수 있는 첫인상입니다. 그러나 동기 부여 섹션에서 언급한 것처럼 Composition API는 실제로 복잡한 컴포넌트에서 보다 체계적인 코드를 생성 할 수 있다고 생각합니다. 여기서 우리는 이유를 설명하려고 노력할 것입니다.

#### "조직화된 코드"란 무엇입니까?
한 걸음 물러서서 "조직화된 코드"에 대해 이야기 할 때 실제로 무엇을 의미하는 지 생각해 봅시다. 코드를 체계적으로 유지하는 최종 목표는 코드를 보다 쉽게 읽고 이해하도록 하는 것입니다. 그리고 코드를 "이해"한다는 것은 무엇을 의미합니까? 컴포넌트에 포함된 옵션을 알고 있기 때문에 컴포넌트를 "이해"한다고 실제로 말할 수 있습니까? 다른 개발자가 작성한 큰 컴포넌트를 본 적이 있습니까? (예를 들어 [이것](https://github.com/vuejs/vue-cli/blob/a09407dd5b9f18ace7501ddb603b95e31d6d93c0/packages/@vue/cli-ui/src/components/folder/FolderExplorer.vue#L198-L404)) 그리고 머리를 감싸매고 힘든 시간을 보내고 있습니까?

위의 링크와 같은 큰 컴포넌트를 통해 동료 개발자를 어떻게 도울 수 있을지 생각해보십시오. "이 컴포넌트는 이러한 데이터 속성, 계산된 속성 및 방법을 가지고 있습니다" 대신 "이 컴포넌트는 X, Y 및 Z를 처리합니다"로 시작할 것입니다. 컴포넌트를 이해하는 데 있어 "컴포넌트가 사용하는 옵션"보다는  "컴포넌트가 수행하려는 작업" (즉, 코드의 의도)에 더 관심이 있습니다. 옵션 기반 API로 작성된 코드는 후자에 자연스럽게 응답하지만 전자를 표현하는 데 다소 열악한 작업을 수행합니다.

#### 논리적 문제 vs. 옵션 타입
컴포넌트가 처리하는 "논리적 문제"로 "X, Y 및 Z"를 정의해 봅시다. 전체 컴포넌트가 하나의 논리적 문제를 다루기 때문에 가독성 문제는 일반적으로 작은 단일 목적 컴포넌트에는 존재하지 않습니다. 그러나 고급 사용 사례에서는 이 문제가 훨씬 두드러집니다. 예로서 [Vue CLI UI file explorer](https://github.com/vuejs/vue-cli/blob/a09407dd5b9f18ace7501ddb603b95e31d6d93c0/packages/@vue/cli-ui/src/components/folder/FolderExplorer.vue#L198-L404) 를 사용하십시오. 컴포넌트는 여러 가지 논리적 문제를 처리해야 합니다.

- 현재 폴더 상태 추적 및 내용 표시
- 폴더 탐색 처리 (열기, 닫기, 새로 고침)
- 새 폴더 생성 처리
- 즐겨 찾기 폴더만 표시 전환
- 숨김 폴더 표시 전환
- 현재 작업 디렉토리 변경 처리

옵션 기반 코드를 읽음으로써 이러한 논리적 문제를 즉시 인식하고 구분할 수 있습니까? 확실히 어렵습니다. 특정 논리적 문제와 관련된 코드가 종종 조각 나고 흩어져 있음을 알 수 있습니다. 예를 들어 "새 폴더 만들기" 기능은 [두 데이터 속성](https://github.com/vuejs/vue-cli/blob/a09407dd5b9f18ace7501ddb603b95e31d6d93c0/packages/@vue/cli-ui/src/components/folder/FolderExplorer.vue#L221-L222), [하나의 계산된 속성](https://github.com/vuejs/vue-cli/blob/a09407dd5b9f18ace7501ddb603b95e31d6d93c0/packages/@vue/cli-ui/src/components/folder/FolderExplorer.vue#L240) 및 [메소드](https://github.com/vuejs/vue-cli/blob/a09407dd5b9f18ace7501ddb603b95e31d6d93c0/packages/@vue/cli-ui/src/components/folder/FolderExplorer.vue#L387) - 메소드는 데이터 속성에서 100 줄 이상 떨어진 위치에 정의됩니다.

이러한 논리적 문제를 각각 색상으로 구분하면 컴포넌트 옵션으로 표현할 때 조각화가 어떻게 발생하는지 알 수 있습니다.

이러한 단편화는 복잡한 컴포넌트를 이해하고 유지하기 어렵게 만듭니다. 옵션을 통해 강제 분리는 근본적인 논리적 문제를 모호하게 합니다. 또한 하나의 논리적 문제에 대해 작업 할 때 해당 문제와 관련된 부분을 찾기 위해 옵션 블록 주위를 지속적으로 "점프"해야 합니다.

> 참고: 원래 코드는 몇 군데 개선 될 수 있지만 실제로 작성한 실제 코드의 예를 제공하기 위해 수정없이 최신 커밋을 보여줍니다(이 글을 쓰는 시점에서).

동일한 논리적 문제와 관련된 코드를 함께 배치할 수 있다면 훨씬 더 좋을 것입니다. 이것이 바로 Composition API가 할 수 있는 일입니다. "새 폴더 만들기" 기능은 다음과 같이 작성할 수 있습니다.

```js
function useCreateFolder (openFolder) {
  // 원래 데이터 속성
  const showNewFolder = ref(false)
  const newFolderName = ref('')

  // 원래 계산된 속성
  const newFolderValid = computed(() => isValidMultiName(newFolderName.value))

  // 원래 메소드
  async function createFolder () {
    if (!newFolderValid.value) return
    const result = await mutate({
      mutation: FOLDER_CREATE,
      variables: {
        name: newFolderName.value
      }
    })
    openFolder(result.data.folderCreate.path)
    newFolderName.value = ''
    showNewFolder.value = false
  }

  return {
    showNewFolder,
    newFolderName,
    newFolderValid,
    createFolder
  }
}
```

새 폴더 만들기 기능과 관련된 모든 논리가 이제 단일 기능으로 배치되고 캡슐화되는 방법에 주목하십시오. 이 기능은 설명적인 이름으로 인해 자체 문서화되어 있습니다. 이것을 **컴포지션 함수** 라고합니다. `use` 로 함수 이름을 시작하여 컴포지션 함수임을 나타내는 것이 권장되는 규칙입니다. 이 패턴은 컴포넌트의 다른 모든 논리적 문제에 적용될 수 있으며 여러 가지 기능이 분리되어 있습니다.

>이 비교에는 import 문과 `setup()` 함수는 제외됩니다. Composition API를 사용하여 다시 구현 된 전체 컴포넌트는 [여기](https://gist.github.com/yyx990803/8854f8f6a97631576c14b63c8acd8f2e)에서 찾을 수 있습니다.

각 논리적 문제에 대한 코드는 이제 컴포지션 함수로 함께 배치됩니다. 따라서 큰 컴포넌트를 다룰 때 일정한 "점프"가 필요하지 않습니다. 컴포지션 함수를 편집기에서 접어 컴포넌트를 훨씬 쉽게 스캔할 수 있습니다.

```js
export default {
  setup() { // ...
  }
}

function useCurrentFolderData(networkState) { // ...
}

function useFolderNavigation({ networkState, currentFolderData }) { // ...
}

function useFavoriteFolder(currentFolderData) { // ...
}

function useHiddenFolders() { // ...
}

function useCreateFolder(openFolder) { // ...
}
```

`setup()` 함수는 이제 모든 컴포지션 함수가 호출되는 진입점 역할을 합니다.

```js
export default {
  setup () {
    // Network
    const { networkState } = useNetworkState()

    // Folder
    const { folders, currentFolderData } = useCurrentFolderData(networkState)
    const folderNavigation = useFolderNavigation({ networkState, currentFolderData })
    const { favoriteFolders, toggleFavorite } = useFavoriteFolders(currentFolderData)
    const { showHiddenFolders } = useHiddenFolders()
    const createFolder = useCreateFolder(folderNavigation.openFolder)

    // Current working directory
    resetCwdOnLeave()
    const { updateOnCwdChanged } = useCwdUtils()

    // Utils
    const { slicePath } = usePathUtils()

    return {
      networkState,
      folders,
      currentFolderData,
      folderNavigation,
      favoriteFolders,
      toggleFavorite,
      showHiddenFolders,
      createFolder,
      updateOnCwdChanged,
      slicePath
    }
  }
}
```

물론, 이것은 옵션 API를 사용할 때 작성할 필요가 없는 코드입니다. 그러나 `setup()` 함수가 컴포넌트가 무엇을 하려고 하는지에 대한 구두 설명과 거의 같은 방식으로 읽습니다. 이것은 옵션 기반 버전에서 완전히 누락된 정보입니다. 또한 전달되는 인수를 기반으로 컴포지션 함수간의 종속성 흐름을 명확하게 볼 수 있습니다. 마지막으로 반환문은 템플릿에 노출된 내용을 확인하는 단일 장소 역할을 합니다.

동일한 기능이 주어지면 옵션을 통해 정의된 컴포넌트와 컴포지션 함수를 통해 정의된 컴포넌트는 동일한 기본 논리를 표현하는 두 가지 다른 방법을 나타냅니다. 옵션 기반 API를 사용하면 *옵션 타입* 을 기반으로 코드를 구성해야하지만 Composition API를 사용하면 *논리적 문제* 를 기반으로 코드를 구성할 수 있습니다.

### 논리 추출 및 재사용
Composition API는 컴포넌트에서 로직을 추출하고 재사용할 때 매우 유연합니다. 컴포지션 함수는 마법의 `this` 컨텍스트에 의존하는 대신 인수와 전 세계적으로 가져온 Vue API에만 의존합니다. 단순히 컴포넌트 로직을 함수로 내보내서 컴포넌트 로직의 일부를 재사용할 수 있습니다. 컴포넌트의 전체 `setup` 함수를 내보내서  `extends` 와 동일한 기능을 수행할 수도 있습니다.

예를 살펴 보겠습니다: 마우스 위치 추적.

```js
import { ref, onMounted, onUnmounted } from 'vue'

export function useMousePosition() {
  const x = ref(0)
  const y = ref(0)

  function update(e) {
    x.value = e.pageX
    y.value = e.pageY
  }

  onMounted(() => {
    window.addEventListener('mousemove', update)
  })

  onUnmounted(() => {
    window.removeEventListener('mousemove', update)
  })

  return { x, y }
}
```

다음은 컴포넌트가 함수를 사용하는 방법입니다.

```js
import { useMousePosition } from './mouse'

export default {
  setup() {
    const { x, y } = useMousePosition()
    // other logic...
    return { x, y }
  }
}
```

파일 탐색기 예제의 Composition API 버전에서는 일부 유틸리티 코드(예:  `usePathUtils` 및 `useCwdUtils`)를 다른 컴포넌트에 유용하기 때문에 외부 파일로 추출했습니다.

믹스인, 고차 컴포넌트 또는 렌더리스 컴포넌트(스코프 슬롯을 통한)와 같은 기본 패턴을 사용하여 유사한 로직 재사용을 달성 할 수도 있습니다. 인터넷에는 이러한 패턴을 설명하는 많은 정보가 있으므로 여기에서 자세한 설명하지는 않겠습니다. 높은 수준의 아이디어는 이러한 각 패턴이 컴포지션 함수와 비교할 때 각각의 단점이 있다는 것입니다.

- 렌더링 컨텍스트에 노출된 속성의 소스가 명확하지 않습니다. 예를 들어 여러 믹스인을 사용하여 컴포넌트의 템플릿을 읽을 때 특정 속성을 주입한 믹스인을 구분하기가 어려울 수 있습니다.
- 네임 스페이스 충돌. 믹스인은 속성 및 메서드 이름과 충돌할 가능성이 있는 반면 HOC는 prop 이름과 충돌 할 수 있습니다.
- 성능. HOC 및 렌더리스 컴포넌트에는 성능 비용이 드는 추가 상태 저장 컴포넌트 인스턴스가 필요합니다.

Composition API와 비교하면 다음과 같습니다.

- 템플릿에 노출된 속성은 컴포지션 함수에서 반환된 값이므로 명확한 소스를 갖습니다.
- 컴포지션 함수에서 반환된 값의 이름을 임의로 지정할 수 있으므로 네임 스페이스 충돌이 없습니다.
- 로직 재사용을 위해 생성된 불필요한 컴포넌트 인스턴스가 없습니다.

### 기존 API와 함께 사용
Composition API는 기존 옵션 기반 API와 함께 사용할 수 있습니다.

- Composition API는 2.x 옵션 (`data`, `computed` & `methods`) 이전에 해결되었으며 해당 옵션으로 정의된 속성에 접근할 수 없습니다.
- `setup()` 에서 반환된 속성은 `this`에 노출되며 2.x 옵션 내에서 접근할 수 있습니다.

### 플러그인 개발
오늘날 많은 Vue 플러그인은 `this` 에 속성을 주입합니다. 예를 들어 Vue Router는 `this.$route`와 `this.$router` 를 주입하고 Vuex는 `this.$store`를 주입합니다. 각 플러그인은 사용자가 주입된 속성에 대한 Vue 타이핑을 강화해야 하기 때문에 타입 추론이 까다로워졌습니다.

Composition API를 사용할 때는 `this` 가 없습니다. 대신 플러그인 내부적으로 [`provide`와 `inject`](https://vue-composition-api-rfc.netlify.com/api.html#provide-inject) 를 활용하고 컴포지션 함수를 노출합니다. 다음은 플러그인에 대한 가상 코드입니다.

```js
const StoreSymbol = Symbol()

export function provideStore(store) {
  provide(StoreSymbol, store)
}

export function useStore() {
  const store = inject(StoreSymbol)
  if (!store) {
    // throw error, no store provided
  }
  return store
}
```

그리고 코드를 소비 할 때:

```js
// provide store at component root
//
const App = {
  setup() {
    provideStore(store)
  }
}

const Child = {
  setup() {
    const store = useStore()
    // use the store
  }
}
```

[Global API change RFC](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0009-global-api-change.md#provide--inject)에 제안된 앱 레벨 제공을 통해 스토어를 제공할 수도 있습니다. 그러나 사용측 컴포넌트의 `useStore` 스타일 API는 동일합니다.

## 문제점

### Refs 도입의 오버헤드
Ref는 기술적으로 이 제안에서 소개된 유일한 새로운 개념입니다. `this`에 대한 엑세스에 의존하지 않고 반응값을 변수로 전달하기 위해 도입되었습니다. 단점은:

1. 컴포지션 API를 사용할 때, API와 작업 할 때 정신적 부담을 증가 시켜서 참조값과 일반값 및 객체를 지속적으로 구분해야 합니다.
   <br><br>
   명명 규칙(예: 모든 참조 변수의 접미사를 `xxxRef`로 사용)을 사용하거나 타입 시스템을 사용하면 정신적 부담을 크게 줄일 수 있습니다. 반면에, 코드 구성의 유연성이 향상되기 때문에 컴포넌트 로직이 로컬 컨텍스트가 단순하고 `refs`의 오버헤드를 쉽게 관리 할 수 있는 작은 기능으로 분리하는 경우가 더 많습니다.
2. `refs`를 읽고 변경하는 것은 `.value`가 필요하기 때문에 일반값으로 작업하는 것보다 더 장황합니다. <br><br>
   일부는 이것을 해결하기 위해 컴파일 타임 신텍스 슈거(Svelte 3와 유사)을 제안했습니다. 기술적으로 실현 가능하지만 Vue의 기본값으로 의미가 있다고 생각하지 않습니다([Svelte와 비교](#svelte와-비교)에서 논의 됨). 즉, 이것은 Userland에서 Babel 플러그인으로 기술적으로 가능합니다.

우리는 Ref 개념을 완전히 피하고 반응성 객체만 사용할 수 있는지 여부에 대해 논의했습니다. 그러나:

- 계산된 게터는 프리미티브 타입을 반환 할 수 있으므로 Ref와 유사한 컨테이너는 피할수 없습니다.
- 프리미티브 타입만 예상하거나 반환하는 컴포지션 함수는 반응성을 위해 객체의 값을 랩핑해야 합니다. 프레임워크에서 제공하는 표준 구현이 없는 경우 사용자는 자신만의 Ref와 유사한 패턴(그리고 에코시스템 파편화)을 개발하게 될 가능성이 큽니다.

### Ref vs. Reactive
당연히, 사용자는 `refs`과 `reactive` 사이에서 어느 것을 사용해야 할지 혼동 될 수 있습니다. 알아야 할 첫 번째 사항은 Composition API를 효율적으로 사용하려면 두 가지를 모두 이해해야한다는 것입니다. 하나를 독점적으로 사용하면 난해한 해결 방법이나 [바퀴의 재발명](https://ko.wikipedia.org/wiki/%EB%B0%94%ED%80%B4%EC%9D%98_%EC%9E%AC%EB%B0%9C%EB%AA%85) 될 가능성이 높습니다.

`refs`와 `reactive`의 차이점은 표준 JavaScript 로직을 작성하는 방법과 다소 비교 될 수 있습니다.

```js
// 첫번째 스타일: 별도의 변수
let x = 0
let y = 0

function updatePosition(e) {
  x = e.pageX
  y = e.pageY
}

// --- 비교해서 ---

// 두번째 스타일: 단일 객체
const pos = {
  x: 0,
  y: 0
}

function updatePosition(e) {
  pos.x = e.pageX
  pos.y = e.pageY
}
```

- `ref`를 사용한다면, 우리는 첫번째 스타일을 `refs`를 사용하여 보다 기본적으로 동등한 표현으로 변환하고 있습니다(원시값을 반응적으로 만들기 위해).
- 반응성을 사용하는 것은 두번째 스타일과 거의 동일합니다. 우리는 `reactive`로만 객체를 생성하면 됩니다.

하지만 `reactive`만 사용하는 문제는 컴포지션 함수의 사용측에서 반응성을 유지하기 위해 항상 반환된 객체에 대한 참조를 유지해야 한다는 것입니다. 객체를 해체하거나 펼칠 수 없습니다.

```js
// 컴포지션 함수
function useMousePosition() {
  const pos = reactive({
    x: 0,
    y: 0
  })

  // ...
  return pos
}

// 사용측 컴포넌트
export default {
  setup() {
    // 반응성 손실됨!
    const { x, y } = useMousePosition()
    return {
      x,
      y
    }

    // 반응성 손실됨!
    return {
      ...useMousePosition()
    }

    // 이것이 반응성을 유지하는 유일한 방법입니다.
    // pos를 있는 그대로 반환하고 x와 y를 pos.x와 pos.y로 탬플릿에서 참조해야 합니다.
    return {
      pos: useMousePosition()
    }
  }
}
```

이 제약 조건을 처리하기 위해 `toRefs` API가 제공됩니다. 반응형 객체의 각 속성을 해당 참조로 반환합니다.

```js
function useMousePosition() {
  const pos = reactive({
    x: 0,
    y: 0
  })

  // ...
  return toRefs(pos)
}

// x & y are now refs!
const { x, y } = useMousePosition()
```

요약하면 두 가지 실행 가능한 스타일이 있습니다.

1. 일반적인 JavaScript에서 프리미티브 타입 변수와 객체 변수를 선언하는 방식과 마찬가지로 `ref`와 `reactive`를 사용하십시오. 이 스타일을 사용할 때는 IDE를 지원하는 타입 시스템을 사용하는 것이 좋습니다.
2. 가능하면 `reactive`를 사용하고 컴포지션 함수에서 반응형 객체를 반환할 때 `toRefs`를 사용해야합니다. 이렇게 하면 `refs`의 정신적인 오버헤드가 줄어들지만 개념에 익숙해질 필요는 없습니다.

이 단계에서는 `refs`와 `reactive` 에 대한 모범 사례를 요구하기에는 너무 이르다고 생각합니다. 위의 두 가지 옵션 중에서 멘탈 모델에 더 잘 맞는 스타일을 사용하는 것이 좋습니다. 우리는 실제 사용자 피드백을 수집하고 결국이 주제에 대한 보다 명확한 지침을 제공 할 것입니다.

### 반환문의 정확성
일부 사용자들은 `setup()` 의 반환문이 장황하고 보일럿 플레이트와 같은 느낌을 주는 것 아니냐는 우려를 제기하고 있습니다.

우리는 명시적인 반환문이 유지보수에 도움이 된다고 생각합니다. 이를 통해 템플릿에 노출되는 대상을 명시적으로 제어할 수 있으며 컴포넌트에서 템플릿 속성이 정의된 위치를 추적할 때 시작 시점으로 사용됩니다.

`setup()` 에 선언된 변수를 자동으로 노출하여 반환문을 선택적으로 만들자는 제안이 있었습니다. 다시 말하지만, 이것이 표준 JavaScript의 직관에 어긋날 것이기 때문에 이것이 기본값이라고 생각하지 않습니다. 그러나 사용자 영역에서 덜 번거롭게 만드는 방법이 있습니다.

- `setup()` 에 선언된 변수를 기반으로 반환문을 자동으로 생성하는 IDE 익스텐션
- 암시적으로 반환문을 생성하고 삽입하는 Babel 플러그인

### 유연성이 높을수록 더 많은 훈련이 필요합니다
많은 사용자들은 Composition API가 코드 구성에 더 많은 유연성을 제공하지만 개발자가 "올바로" 수행하는 데 더 많은 훈련이 필요하다고 지적했습니다. 일부는 API가 미숙한 손에 스파게티 코드로 이어질까 걱정합니다. 즉, Composition API는 코드 품질의 상한선을 높이는 동시에 하한선을 낮추기도 합니다.

우리는 어느 정도 동의합니다. 그러나 우리는 다음을 믿습니다:

1. 상한선의 이득이 하한선의 손실보다 큽니다.
2. 적절한 문서 및 커뮤니티 지침을 통해 코드 구성 문제를 효과적으로 해결할 수 있습니다.

일부 사용자는 [Angular 1 컨트롤러](https://docs.angularjs.org/guide/controller)를 사용하여 설계에서 코드 작성이 잘못되는 방법을 예로 들었습니다. Composition API와 Angular 1 컨트롤러의 가장 큰 차이점은 공유 범위 컨텍스트에 의존하지 않는다는 것입니다. 따라서 JavaScript 코드 구성의 핵심 매커니즘인 논리를 별도의 함수로 훨씬 쉽게 분리 할 수 있습니다.

모든 JavaScript 프로그램은 엔트리 파일로 시작합니다(프로그램의 경우 `setup()` 이라고 생각하십시오). 논리적인 관심사에 따라 프로그램을 기능과 모듈로 분할하여 프로그램을 구성합니다. **Composition API를 사용하면 Vue 컴포넌트 코드에 대해서도 동일한 작업을 수행 할 수 있습니다.** 다시 말해, 잘 구성된 JavaScript 코드 작성 기술은 Composition API를 사용할 때 잘 구성된 Vue 코드 작성 기술로 직접 변환됩니다.

## 적용 전략
Composition API는 순전히 부가적이며 기존 2.x API에 영향을 미치거나 어디에도 사용되지 않습니다. `@vue/composition` 라이브러리를 통해 2.x 플러그인으로 제공되었습니다. 라이브러리의 주요 목표는 API를 실험하고 피드백을 수집하는 방법을 제공하는 것입니다. 현재 구현은 이 제안으로 최신 상태이지만 플러그인이라는 기술적 제약으로 인해 약간의 불일치가 있을 수 있습니다. 이 제안이 업데이트 될 때 브레이크 체인지가 될 수 있으므로 이 단계에서는 프로덕션에서 사용하지 않는 것이 좋습니다.

우리는 API를 3.0에 내장하여 제공하려고 합니다. 기존 2.x 옵션과 함께 사용할 수 있습니다.

앱에서 Composition API를 독점적으로 사용하는 사용하는 경우 2.x 옵션에만 사용되는 코드를 삭제하고 라이브러리 크기를 줄이기 위해 컴파일 타임 플래그를 제공 할 수 있습니다. 그러나 이것은 완전히 선택사항입니다.

API는 해결해야 할 문제가 주로 대규모 응용 프로그램에 나타나기 때문에 고급 기능으로 자리를 잡을 것입니다. 설명서를 기본값으로 사용하기 위해 설명서를 정밀 검사하지는 않습니다. 대신 문서에 전용 섹션이 있습니다.

## 부록

### 클래스 API의 타입 이슈
클래스 API를 도입하는 주요 목표는 보다 나은 TypeScript 추론 지원과 함께 제공되는 대체 API를 제공하는 것이 었습니다. 그러나 Vue 구성 요소가 여러 소스에서 선언된 속성을 단일 `this` 컨텍스트로 병합해야한다는 사실은 클래스 기반 API에서도 약간의 문제를 일으킵니다.

props 입력이 그 예입니다. props을 `this` 에 병합하려면 컴포넌트 클래스에 제네릭 인자를 사용하거나 데코레이터를 사용해야합니다.

다음은 제네릭 인자를 사용하는 예입니다.

```ts
interface Props {
  message: string
}

class App extends Component<Props> {
  static props = {
    message: String
  }
}
```

제네릭 인자에 전달된 인터페이스는 type-land에만 있기 때문에 사용자는 여전히 `this` 에 대한 props 프록싱 동작에 대한 런타임 props 선언을 제공해야합니다. 이 이중 선언은 중복되고 어색합니다.

우리는 데코레이터를 대안으로 사용하는 것을 고려했습니다.

```ts
class App extends Component<Props> {
  @prop message: string
}
```
데코레이터를 사용하면 특히 TypeScript의 현재 구현이 TC39 제안과 완전히 일치하지 않을 때 많은 불확실성과 함께 2단계 사양에 의존합니다. 또한 `this.$props` 에서 데코레이터로 선언된 props 타입을 노출 할 수 있는 방법이 없으므로 TSX 지원이 중답됩니다. 사용자는 기술적으로 예상대로 작동하지 않을 때 `@prop message: string = 'foo'` 로 prop의 기본값을 선언할 수 있다고 가정할 수 있습니다.

또한 현재 클래스 메소드의 인자에 컨텍스트 타이핑을 활용할 수 있는 방법이 없습니다. 즉, 클래스 `render` 함수에 전달된 인자는 클래스의 다른 특성을 기반으로 추론된 타입을 가질 수 없습니다.

### React Hooks과 비교
함수 기반 API는 React Hooks와 동일한 수준의 논리 구성 기능을 제공하지만 몇 가지 중요한 차이점이 있습니다. React Hooks와 달리 `setup()` 함수는 한번만 호출됩니다. 이는 Vue의 Composition API를 사용하는 코드는 다음과 같습니다.

- 일반적으로 관용적 JavaScript 코드의 직관과 더 잘 맞습니다.
- 호출 순서에 민감하지 않으며 조건부 일 수 있습니다.
- 각 렌더에서 반복적으로 호출되지 않으며 GC 압력이 적습니다.
- 인라인 핸들러가 자식 컴포넌트를 과도하게 다시 렌더링하는 것을 막기 위해 `useCallback` 이 거의 항상 필요한 문제는 아닙니다.
- 사용자가 올바른 의존성 배열을 전달하는 것을 잊어 버린 경우 `useEffect` 및 `useMemo` 가 오래된 변수를 캡처 할 수 있는 문제는 아닙니다. Vue의 자동 종속성 추적 기능은 감시자와 계산된 값이 항상 올바르게 무효화되도록 합니다.

우리는 React Hooks의 창의성을 인정하며, 이 제안의 주요 영감원입니다. 그러나 위에서 언급한 문제는 설계에 존재하며 Vue의 반응성 모델이 그 주위에 방법을 제공한다는 것을 알았습니다.

### Svelte와 비교
비록 매우 다른 노선을 선택했지만, Composition API와 Svelte 3의 컴파일러 기반 접근 방식은 실제로 개념적으로 상당히 공통적입니다. 단계별 예는 다음과 같습니다.

#### Vue

```html
<script>
import { ref, watchEffect, onMounted } from 'vue'

export default {
  setup() {
    const count = ref(0)

    function increment() {
      count.value++
    }

    watchEffect(() => console.log(count.value))

    onMounted(() => console.log('mounted!'))

    return {
      count,
      increment
    }
  }
}
</script>
```

#### Svelte

```html
<script>
import { onMount } from 'svelte'

let count = 0

function increment() {
  count++
}

$: console.log(count)

onMount(() => console.log('mounted!'))
</script>
```

Svelte 코드는 컴파일 타임에 다음을 수행하기 때문에 더 간결해 보입니다.

- 전체 `<script>` 블록 (import 문 제외)을 한번만 실행하는 대신 각 컴포넌트 인스턴스에 대해 호출되는 함수로 암시적으로 래핑합니다.
- 가변 뮤테이션에 대한 반응성을 암시적으로 등록
- 모든 범위 내 변수를 렌더 컨텍스트에 암시적으로 노출
- `$` 문을 재실행된 코드로 컴파일

기술적으로 Vue에서 동일한 작업을 수행할 수 있습니다 (userland Babel 플러그인을 통해 가능). 우리가 하지 않는 주된 이유는 **표준 JavaScript에 대한 지지** 입니다. Vue 파일의 `<script>` 블록에서 코드를 추출하면 표준 ES 모듈과 동일하게 작동하기를 원합니다. 반면 Svelte `<script>` 블록 안의 코드는 기술적으로 더 이상 표준 JavaScript가 아닙니다. 이 컴파일러 기반 접근 방식에는 여러 가지 문제점이 있습니다.

1. 코드는 컴파일과 함께 / 컴파일 없이 다르게 작동합니다. 프로그레시브 프레임워크로서, 많은 Vue 사용자는 빌드 설정없이 사용하기를 원하거나 필요로 할 수 있으므로 컴파일된 버전이 기본값이 될 수 없습니다. 반면 Svelte는 자신을 컴파일러로 지정하고 빌드 단계와 함께만 사용할 수 있습니다. 이것이 두 프레임워크가 의식적으로 만들도 있는 트레이드 오프입니다.
2. 코드는 컴포넌트 내부 / 외부에서 다르게 작동합니다. Svelte 컴포넌트에서 표준 JavaScript 파일로 조식을 추출하려고 할 때, 우리는 마법의 간결한 구문을 읽고 [더 자세한 저수준 API](https://svelte.dev/docs#svelte_store) 로 돌아 가야합니다.
3. Svelte의 반응형 컴파일은 최상위 변수에 대해서만 작동합니다. 함수 내에 선언된 변수를 건드리지 않으므로 [컴포넌트 내에 선언된 함수에서 반응 상태를 캡슐화 할 수 없습니다](https://svelte.dev/repl/4b000d682c0548e79697ddffaeb757a3?version=3.6.2). 이 기능은 코드 구성에 사소한 제약 조건을 부여합니다. 이 RFC에서 설명했듯이 큰 컴포넌트를 유지 관리하는 데 중요합니다.
4. [비표준 문법은 TypeScript와의 통합에 문제가 있습니다](https://github.com/sveltejs/svelte/issues/1639).

이것은 Svelte 3가 나쁜 생각이라고 결코 말하지 않습니다. 사실 이것은 매우 혁신적인 접근 방식이며 Rich의 작업을 매우 존중합니다. 그러나 Vue의 설계 제약과 목표에 따라 다른 트레이드 오프를 만들어야 합니다.
