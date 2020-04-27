---
title: Composition API 경험 정리
sidebar: auto
---

## 세팅
### 설치
```bash
npm install @vue/composition-api
```

### 플러그인
```js
import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api'

Vue.use(VueCompositionApi)
```

### 어댑터

`@vue/composition-api`는 아직 프로덕션에 적용하지 않을 것을 권고하고 있으며, 릴리즈 노트를 통해서 변경 가능성을 확인했다.

> 문서를 수정 중인 2020.04.20을 기준으로 Composition API RFC는 완료된 상태이며, Vue 3는 Beta 단계라 API 자체의 변경 가능성이 확연히 줄어든 상태이다.

::: tip 외부 의존성
`@vue/composition-api`가 업데이트(릴리즈) 되었을 때 이를 사용하는 개발자는 API 변경/삭제에 대한 권한이 없다.
그래서 업데이트가 되는 순간 프로젝트에 직접적인 영향을 전파하게 된다. 이런 부분을 필자는 `외부 의존성`이라고 부른다.

외부 의존성은 직접적으로 조작할 수 있는 권한이 없음으로 의존성이 강하다.
이를 약하게 만드는 가장 쉬운 방법은 중간에 무언가(예를 들자면 어댑터)를 껴넣는 것이다.
:::

그럼에도 불구하고 Composition API는 충분히 적용할 만한 가치가 있다.
그래서 앞서 언급한 위험 부담(외부 의존성에 의한 부담)을 최소화 하면서 Composition API를 안전하게 적용하기 위한 대안으로 어댑터 패턴을 사용할 수 있다.

일반적으로 `[Custom Component] => [Vue]` 이런 형태로 라이브러리를 직접 사용하게 된다.
만약에 100개 이상의 `[Custom Component]`가 있다면 `[Vue]` 업그레이드 시 모든 `[Custom Component]`에 대한 **수동 변경**이 필요하다.

어댑터 패턴을 적용하면 앞서 언급한 형태는 `[Custom Component] => [Vue Adaptor] => [Vue]` 이렇게 변경된다.
그래서 `[Vue]`에 업데이트(변경)이 발생했을 때 `[Custom Component]`가 아닌 `[Vue Adaptor]`만 수정하면 된다.

특히 `[Vue Adaptor]`를 적용했을 때, `[Vue]`에서 API의 이름이 변경 되었을 때 IDE의 Refactor 기능을 통해 Function 이름을 **자동으로 변경** 할 수 있기 때문에 매우 편리하다.

실재로 코드로 보면 다음과 같다.

##### Custom Component
```html
<template>
</template>

<script lang="ts">
import { defineComponent, ref } from '~/vue-adaptor'

export default defineComponent({
  props: {
    id: String,
    label: String,
    disabled: Boolean,
    checked: Boolean
  },
  setup(props, context) {
    const isChecked = ref(props.checked)
    const toggleCheckBox = (): void => {
      isChecked.value = !isChecked.value
      context.emit('on-change', isChecked.value)
    }

    return { isChecked, toggleCheckBox }
  }
})
</script>

```

##### Vue Adaptor
다음과 같이 `@vue/composition-api`에서 사용할 기능만 추출하고 `export`한다.
```js
export {
  defineComponent,
  onMounted,
  onBeforeMount,
  ref,
  reactive,
  toRefs,
  computed,
  watch
} from '@vue/composition-api'
```

이렇게 했을 때, `@vue/composition-api` 에서 사용하고 싶은 것들만 어댑터에 담을 수 있으며,
그뿐만 아니라 API에서 사용하는 Function의 이름이 변경되어도 IDE의 Refactor 기능을 이용하여 한 번에 변경할 수 있다.

## API Reference

Composition API는 다음과 같이 사용할 수 있다.

```html
<template>
  <div>
    <div>{{ count }} {{ plusOne }}</div>
    <div>{{ obj.foo }}</div>
    <div>{{ firstName }} {{ lastName }}</div>
    <div ref="templateRef"></div>
    <a @click.prevent="increment">INCREMENT</a>
    
    <my-button></my-button>
  </div>
</template>

<script>
import {
  defineComponent,
  ref,
  reactive,
  computed,
  toRefs,
  watch,
  onMounted,
  onBeforeMount,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted
} from '@vue/composition-api'
import MyButton from './my-button.vue'

export default defineComponent({
  components: {
    MyButton
  },
  props: {
    name: String
  },
  setup(props, context) {
    console.log('[LIFECYCLE] beforeCreate, created')
    console.log(`name is: ${props.name}`)

    const count = ref(0)
    const plusOne = computed(() => count.value + 1)
    const obj = reactive({ foo: 'bar ' })
    const state = reactive({
      firstName: 'Peter',
      lastName: 'Cho'
    })
    const templateRef = ref(null)

    const increment = () => {
      count.value++
      context.emit('on-change', count.value)
    }

    watch(() => {
      console.log(`count is ${count.value}`)
    })

    onBeforeMount(() => {
      console.log('[LIFECYCLE] beforeMount')
    })
    onMounted(() => {
      console.log('[LIFECYCLE] mounted')
    })
    onBeforeUpdate(() => {
      console.log('[LIFECYCLE] beforeUpdate')
    })
    onUpdated(() => {
      console.log('[LIFECYCLE] updated')
    })
    onBeforeUnmount(() => {
      console.log('[LIFECYCLE] beforeDestroy')
    })
    onUnmounted(() => {
      console.log('[LIFECYCLE] destroyed')
    })

    return {
      count,
      plusOne,
      obj,
      ...toRefs(state),
      templateRef,
      increment
    }
  }
})
</script>
```

## 마이그레이션
### Props
#### 런타임과 컴파일타임의 타입 일치
props를 required로 지정하지 않으면 [Optional](https://www.typescriptlang.org/docs/handbook/functions.html#optional-and-default-parameters)로 처리된다.
```ts
export default defineComponent({
  props: {
    id: String, // string | undefined
  }
})
```

required를 사용하면 필수 타입으로 처리된다.

```ts
export default defineComponent({
  props: {
    id: {
      type: String,
      required: true
    }, // string
  }
})
```

#### Props의 any 타입 정의
- **(컴파일 타임)** TypeScript로 props 타입 정의 시, `any` 또는 `unknown`이 필요할 때가 있다. 
- **(런타임)** 이때 props의 타입은 `null`로 작성해야 한다. 

::: tip 
Composition API 공식 문서에는 `undefined`와 `null`로 처리 가능하다고 가이드하는데,
TypeScript로 정의된 Declaration 파일에서는 `null`만 허용한다.
:::

```ts
interface CommonSelectOption {
  value: unknown;
}

export default defineComponent({
  props: {
    value: null,
  },
  // ... 생략
})
```

### State
#### `ref`와 `reactive`
`ref`를 사용할 경우 값에 접근할 때 `.value`를 사용해야 한다.
그런데 필자는 ref를 사용했을 때 불편함을 느꼈다.

그래서 특별한 경우가 아닌 이상 `ref` 대신에 `reactive`로 상태를 정의하고, `reactive`로 정의한 변수를 return할 때는`toRefs`를 사용하는 것이 경험적으로 좋았다.

##### AS IS (ref)
```ts
setup(props, context) {
  const inputText = ref('')
  const isFocused = ref(false)

  const onChange = (): void => {
    context.emit('on-change', inputText.value)
  }
  const onFocus = (): void => {
    isFocused.value = true // value에 할당
  }

  const onBlur = (): void => {
    isFocused.value = false // value에 할당
  }

  onBeforeMount(() => {
    inputText.value = props.value // value에 할당
  })

  return {
    inputText,
    isFocused,
    onChange,
    onFocus,
    onBlur
  }
}
```

##### TO BE (reactive)
```ts
setup(props, context) {
  const state = reactive({
    inputText: '',
    isFocused: false
  })

  const onChange = (): void => {
    context.emit('on-change', state.inputText)
  }
  const onFocus = (): void => {
    state.isFocused = true // state의 property를 통해 값을 할당한다.
  }

  const onBlur = (): void => {
    state.isFocused = false // state의 property에 값을 할당한다.
  }

  onBeforeMount(() => {
    state.inputText = props.value // state의 property에 값을 할당한다.
  })

  return {
    ...toRefs(state), // toRefs를 사용하여 ref로 변환한다.
    onChange,
    onFocus,
    onBlur
  }
}
```

#### 타입 정의
필자는 `reactive`에 [Generic](https://www.typescriptlang.org/docs/handbook/generics.html)을 사용하는 것이 깔끔하다고 느꼈다.
 
```ts
interface Pagination {
  currentPage: number
  totalPage: number
}
const state = reactive<Pagination>({
  currentPage: 1,
  totalPage: 0
})
```

### TemplateRef
`<template>`내에서 `<div ref="box">`와 같이 `TemplateRef`를 사용할 때는 항상 `ref`로 정의한 `state`를 사용해야 한다.
`reactive`로 정의한 `state`는 정상적으로 참조되지 않는다.

### Vuex
#### useStore
Options API와 Class-based API에서는 `this` 컨텍스트가 존재 하므로 `this.$store`를 사용한다.
그러나 Composition API는 `this` 컨텍스트가 없기 때문에 `setup()` Method의 두 번째 인자로 전달되는 `context.root.$store`를 통하여 Vuex를 사용한다.

`useXXX` 형태로 사용하면 다른 코드들과 잘 어울리리라 생각한다.
```js
import { SetupContext } from '@vue/composition-api'

export const useStore = (context: SetupContext) => ({ ...context.root.$store })
export const useStore = ({ root }: SetupContext) => ({ ...root.$store })
export const useStore = ({ root: { $store: { state, getters, commit, dispatch } } }: SetupContext) => ({ state, getters, commit, dispatch })
```

`state`는 `reactive`와 `ref`를 통해 반응형 상태를 만들어도 `mutation`을 감지하지 못하기 때문에 `state`를 직접 사용해야 한다.

코드로 확인해보자.
```js
export default defineComponent({
  setup(props, context) {
    const { dispatch, state } = useStore(context)

    const fetchCheckLogin = (): Promise<void> => {
      return dispatch('auth/fetchCheckLogin')
    }
    const fetchLogout = (): Promise<void> => {
      return dispatch('auth/fetchLogout')
    }
    const isLogin = (): boolean => {
      return state?.auth?.auth?.success
    }
    const toAuthTitle = (): string => {
      return isLogin() ? '로그아웃' : '로그인'
    }
    const logout = (): void => {
      fetchLogout()
    }

    onMounted(() => {
      fetchCheckLogin()
    })

    return {
      toAuthTitle,
      logout
    }
  }
})
```

#### state 이름 충돌
`reactive`로 정의한 반응형 상태와 `useStore`를 통해 사용하는 스토어 상태의 변수명을 `state`로 사용하고 있다.
`setup()` 내부에 사용할 경우 충돌이 되기 때문에 변수명의 변경이 필요하다.

`store`를 네임스페이스로 가지는 것도 하나의 대안이다.
```ts
setup(props, context) {
  const store = useStore(context) // store.state로 접근
}
```

#### state 접근
모듈 형태인 state는 사용 시 깊은 접근이 필요하다. `computed`를 사용하면 기존 옵션 API 처럼 사용가능하다.

```ts
setup(props, context) {
  const store = useStore(context)
  const state = reactive({
    auth: computed(() => store.state.authModule.auth)
  })
}
```

#### useAction
사용측에서 모듈명과 액션명은 이벤트 기반이기 때문에 런타임에서만 정상 작동을 확인할 수 있다.
`useAction`는 컴파일타임에 모듈명과 액션명이 정상적으로 사용되었음을 확인하기 위해 만들어졌다. 

`ModuleActions`에서 key는 모듈명, value는 액션명으로 타입을 정의했다.
- 모듈명과 파일명이 동일하도록 하드코딩해야 한다.
- 액션명은 `keyof typeof T` 형태로 타입이 정의되기 때문에 액션이 추가되면 자동으로 반영된다.

먼저 모듈명에 대해 타입 체크한 뒤, 해당 모듈의 액션명을 타입 체크한다.
하나라도 정의된 명을 사용하지 않으면 컴파일 타입 에러가 발생한다.

##### /use/useStoreAction.ts
```ts
import { Dispatch } from 'vuex'
import { actions } from '~/store/auth'
import notice from '~/store/notice'

interface ModuleActions {
  auth: keyof typeof actions
  notice: keyof typeof notice.actions
}

type ActionHandle<Keys extends string> = {
  [key in Keys]: (payload?: any) => Promise<any>
}

export const useStoreAction = (dispatch: Dispatch) => {
  function useAction<T extends keyof ModuleActions>(
    moduleName: T,
    actions: ModuleActions[T][]
  ): ActionHandle<ModuleActions[T]> {
    return Object.assign(
      {},
      ...actions.map((action) => {
        return {
          [action]: (payload) => dispatch(`${moduleName}/${action}`, payload)
        }
      })
    )
  }

  return { useAction }
}
```

사용 측은 [mapActions](https://vuex.vuejs.org/guide/actions.html#dispatching-actions-in-components)와 유사한 형태로 사용한다.
첫 번째 인자는 모듈명, 두 번째 인자는 액션명을 배열로 사용하며 return type은 객체이기 때문에 Destructuring 하여 사용할 수 있다.
```ts
const { dispatch } = useStore(context)
const { useAction } = useStoreAction(dispatch)
const { fetchCheckLogin, fetchLogout } = useAction('auth', [
  'fetchCheckLogin',
  'fetchLogout'
])
```

#### useGetter
[useAction](#useAction)과 같은 이유로 만들어진 Getter를 사용하기 위한 함수이다.

##### /use/useStoreGetter.ts
```ts
import { getters } from '~/store/auth'

interface ModuleGetters {
  auth: keyof typeof getters
}

type Getters<Keys extends string> = {
  [key in Keys]: () => any
}

export const useStoreGetter = (getters: object) => {
  function useGetter<T extends keyof ModuleGetters>(
    moduleName: T,
    moduleGetters: ModuleGetters[T][]
  ): Getters<ModuleGetters[T]> {
    return Object.assign(
      {},
      ...moduleGetters.map((name) => {
        return {
          [name]: (): any => getters[`${moduleName}/${name}`]
        }
      })
    )
  }

  return { useGetter }
}
```

getter는 인자를 받지 않는 함수로 만들어진다.
```ts
const { getters } = useStore(context)
const { useGetter } = useStoreGetter(getters)
const { isLogin } = useGetter('auth', ['isLogin'])
const toAuthTitle = (): string => {
  return isLogin() ? '로그아웃' : '로그인'
}
```

#### useAction, useGetter 이점
##### 타입 추론
Store 모듈에 정의된 `Action`과 `Getter`의 타입을 추론할 수 있다.

##### IDE 지원
정의부를 찾아주는 기능(Navigate to declaration)과 이름변경 기능(Rename 또는 Refactor)을 사용할 수 있다.
기존의 Vuex는 이러한 기능을 사용할 때 제한이 있었다.

##### 재사용성 향상
두 함수는 `setup()`의 Context에 의존하지 않는다.
`useStoreAction`는 `Dispatch`에 의존하고, `useStoreGetter`는 `object` 타입에 의존한다.
즉, Middleware에서 재사용을 가능하게 해준다.

```ts
import { useStoreGetter } from '~/use/useStoreGetter'
import { useStoreAction } from '~/use/useStoreAction'

export default ({ store: { dispatch, getters } }) => {
  const { useAction } = useStoreAction(dispatch)
  const { useGetter } = useStoreGetter(getters)
  const { fetchCheckLogin, fetchLogout } = useAction('auth', [
    'fetchCheckLogin',
    'fetchLogout'
  ])
  const { isLogin } = useGetter('auth', ['isLogin'])

  return Promise.all([fetchCheckLogin(), fetchLogout()]).then(() =>
    console.log(isLogin())
  )
}
```

#### useStorePlugin
> ActionTree를 사용하지 않고 Plugin을 사용한 케이스

Store에 ActionTree 타입을 사용하면 `Action명([key: string])`을 오직 `string` 으로 추론한다.
이에 대한 영향으로 useAction은 의도와 다르게 동작한다.

###### /vuex/types/index.d.ts
```ts
export interface ActionTree<S, R> {
  [key: string]: Action<S, R>;
}
```

만약에 ActionTree를 사용하지 않을 경우 Store내에서 `this`를 통해 플러그인에 접근할 수 없다.
그래서 고안해낸 방법이 useStorePlugin이며 이를 통해 플러그인에 접근할 수 있다.

##### /use/useStorePlugin.ts
```ts
import { Store } from 'vuex'

export const useStorePlugin = (store: any) => {
  const { $axios } = store as Store<any>
  return { $axios }
}
```

##### /store/auth.ts
```ts
export const actions = {
  fetchCheckLogin(context): Promise<void> {
    const { $axios } = useStorePlugin(this)
    return $axios.$get('/check_login')
  },
}
```

#### useStoreAction, useStoreGetter 간소화
앞서 소개한 코드를 통하여 개발을 진행 했을 때 코드베이스가 ~~대폭까진 아니고~~소폭 증가했다.
그래서 기존에 사용 중이던 코드에 대해 동작은 동일하되 코드베이스를 간소화시키는 방안이 필요했다.

우선 useStoreAction 사용부를 개선할 필요가 있다고 느꼈다.
useStoreAction 사용부를 보면 무언가 많이 작성해줘야 하는 게 너무 많다.
현재 useStoreAction 사용부에는 `1) 사용할 모듈`, `2) 사용할 함수`, `3) 사용할 함수 해체의 코드` 등이 기술 되고 있다.

useStoreAction의 목적은 `타입 추론을 통한 선언부 추적`에 대한 비중이 크기 때문에 타입 추론 부분 이외에 대한 개선이 필요하다.

개선한 방향은 단순히 `1) 사용할 모듈`만 기술하는 것이다.

```diff
- const { fetchCheckLogin, fetchLogout } = useAction('auth', [
-   'fetchCheckLogin',
-   'fetchLogout'
- ])
+ const authActions = useAction('auth')
```

##### /use/useStoreAction.ts
useStoreAction는 모듈명을 인자로 받고 액션을 모두 반환한다. 변경된 부분은 다음과 같다.

```ts {1-4,9,11,14}
const actionMap = new Map([
  ['auth', Object.keys(actions)],
  ['notice', Object.keys(notice.actions)]
]);

export const useStoreAction = (dispatch: Dispatch) => {
  function useAction<T extends keyof ModuleActions>(
    moduleName: T,
    actions?: ModuleActions[T][]
  ): ActionHandle<ModuleActions[T]> {
    const keys = actions || actionMap.get(moduleName) || [];
    return Object.assign(
      {},
      ...keys.map((action) => {
        return {
          [action]: (payload) => dispatch(`${moduleName}/${action}`, payload)
        }
      })
    )
  }

  return { useAction }
};
```

### Nuxt
> [v2.12.0](https://github.com/nuxt/nuxt.js/pull/6999)부터 새로운 `fetch` 인터페이스가 적용된다.
> `fetch(context){}` 형태였다면 `fetch(){}` 형태로 바뀐다. `middleware`를 사용할 것을 권장하며, `this`를 사용하도록 바뀐다.

#### composition api에서 `fetch` 관련 라이프 사이클이 없음
- `middleware`로 사용할 것을 [권장](https://github.com/nuxt/nuxt.js/issues/6517#issuecomment-564035362)함

#### `fetch`, `layout`, `middleware` 타입 미지원
- `defineComponent` 함수에 `fetch`, `layout`, `middleware` 미지원
- 타입 확장으로 해결할 것을 [권장](https://github.com/vuejs/composition-api/issues/63#issuecomment-523429896)함

##### pages/index.ts
- `fetch`는 항상 `Promise<void>` 타입으로 반환해야 함
```ts
export default defineComponent({
  fetch(context): Promise<void> {
  }
})
```

##### types/vue-shim.d.ts
```ts
import Vue from 'vue'
import { Context, Middleware } from '@nuxt/types'

declare module '*.vue' {
  export default Vue
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    fetch?(ctx: Context): Promise<void> | void
    layout?: string | ((ctx: Context) => string)
    middleware?: Middleware | Middleware[]
  }
}
```

### Type
#### `reactive` 필드의 필드 타입 문제
> [#261](https://github.com/vuejs/composition-api/pull/261),
> [#614](https://github.com/vuejs/vue-next/pull/614) 버전 업그레이드 후 반영될 것으로 보임

reactive의 필드로 지정된 타입이 객체일 때, 필드의 내부에 필드가 존재하게 된다.
작성 의도는 해당 필드의 타입이지만 현재 타입 추론으론 `UnwrapRef`이 된다.

```ts
enum Axis {
  One = 1,
  Two = 2
}
interface MyInterfaceInInterface {
  x: Axis // number or 1 | 2는 동작함
  y: Axis
}

interface MyInterface {
  field: MyInterfaceInInterface
}

export default defineComponent({
  setup() {
    const myState = reactive<MyInterface>({
      field: {
        x: 1,
        y: 2
      }
    })
    const add = (x: number, y: number) => x + y
    add(myState.field.x, myState.field.y)
    // Type Error 
  }
})
```
```
Argument type UnwrapRef3 is not assignable to parameter type number
Type UnwrapRef3 is not assignable to type number
```

#### reactive 타입
`reactive`에 선언하는 타입은 의도한 대로 동작하지 않는 케이스가 존재한다.
예를 들면 셀렉트 박스에서 아이템을 선택하고, BackEnd API로 요청하는 사례이다.

##### /types/my-component.ts
```ts
interface Options {
  id: number
  value: string
}
interface State {
  options: Options[]
  selected: Options | null
}
interface RequestBody {
  selectedId: number
}
```

##### /components/my-component.ts
```ts
const state = reactive<State>({
  options: [],
  selected: null
})

const changeSelectedOption = (option) => {
  state.selected = option
}

const onSave = () => {
  if (state.selected === null) {
    return
  }
  const body: RequestBody = {
    selectedId: state.selected.id
  }
}
```
보기에는 정상적인 코드로 보이지만 `state.selected.id`에서 `TS2339: Property 'id' does not exist on type 'string'.` 에러가 발생한다.

의도한 대로 실행되게 하기 위해선 `Typecasting(as Type)`을 해야 한다.

```ts
// Not Cool
const state = reactive<State>({
  options: [],
  selected: null
})

// Cool
const state = reactive({
  options: [],
  selected: null
}) as State
```

## 컨벤션
### 컴포넌트 Input/Output 정의
#### 용어정의
- Input: 컴포넌트 사용측에서 대상 컴포넌트에 주입할 값
- Output: 대상 컴포넌트에서 컴포넌트 사용측에 전달할 값

Vue 컴포넌트는 Input 역할을 하는 Props는 설정 레벨로 정의한다.
하지만 Emit는 설정 레벨로 정의되지 않고, 필요할 때 함수를 호출하는 형태로 구성된다.
컴포넌트의 스팩을 쉽게 파악하기 위해서는 해당 기능이 필요하다고 생각한다.

Composition API의 경우 최상단에 추가되면 쉽게 파악 가능할거라 생각한다.
```ts
setup (props: Props, context) {
  const emit = {
    change: state => context.emit('change', {...state.surveyForm}),
    changeImage: file => context.emit('change-image', file),
  };
```

### 컴포넌트 함수별 역할 분리
컴포넌트에 정의되는 함수의 역할은 상태변경, 이벤트 리스너, 헬퍼 함수가 있다.
각 함수는 같은 레벨로 정의하기 때문에 시각적 구분이 잘안된다고 생각한다.

또한 `setup` 함수 내부에 함수 추가 후 `<template>`에 사용하려면 할당 반환값에 추가가 필요하다.
객체에 담아 전달하면 번거로움과 반환값을 간소화 가능하다고 생각한다.

결론적으로 Vuex의 네이밍을 따라서 상태변경은 `mutation`,
이벤트 리스너는 `action`으로 정의되면 어떨가 생각해봤다.

```ts
// AS IS
setup() {
  const state = {}
  const onChange = () => {}
  const onClick = () => {}
  return {state, onChange, onClick}
}

// TO BE
setup() {
  const state = {}
  const actions = {
    onChange: () => {},
    onClick: () => {}
  }
  return {state, actions}
}
```