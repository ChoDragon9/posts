Vuex는 이벤트 기반 API로 정의측과 사용측이 루즈하게 연결되어 있다. 이벤트 기반 API에서 비롯되는 오류가 몇가지 있다.

```
1. 액션과 뮤테이션 사용 시, 사용측에서 정상적으로 정의되었는 지 런타임을 통해서만 알 수 있다.
2. 상수를 통해 정의측과 사용측을 일치시켜도 해당 모듈과 일치하지 않는 액션 사용시, 런타임을 통해서만 알 수 있다.
```

결국 런타임을 통해서만 정상동작을 확인할 수 있다. 그렇기 때문에 여기서는 컴파일타임에서 정상적으로 동작함을 알 수 있게 타입을 추가했다.

### Types
#### vuex custom
```ts
import { Dispatch, Mutation, CommitOptions, DispatchOptions } from 'vuex'

interface CustomCommit<Mutations> {
  (type: Mutations, payload?: any, options?: CommitOptions): void
}

interface CustomDispatch<Actions> extends Dispatch {
  (type: Actions, payload?: any, options?: DispatchOptions): Promise<any>
}

// {ActionContext} from 'vuex
export interface CustomActionContext<State, RootState, Actions, Mutation> {
  dispatch: CustomDispatch<Actions>
  commit: CustomCommit<Mutation>
  state: State
  getters: any
  rootState: RootState
  rootGetters: any
}

export type CustomActionTree<
  State,
  RootState,
  Actions extends string,
  Mutations
> = {
  [key in Actions]: (
    context: CustomActionContext<State, RootState, Actions, Mutations>,
    payload?: any
  ) => any
}

export type CustomMutationTree<State, Mutations extends string> = {
  [key in Mutations]: Mutation<State>
}
```
#### 모듈 타입
```ts
import { CounterActions, CounterMutations } from '~/store/counter.enum'
import { CustomActionTree, CustomMutationTree } from '~/store/vuex-custom'

export type RootState = null

export type CounterModuleState = {
  count: number
}
export type CounterModuleMutations = CustomMutationTree<
  CounterModuleState,
  CounterMutations
>
export type CounterModuleActions = CustomActionTree<
  CounterModuleState,
  RootState,
  CounterActions,
  CounterMutations
>
```

### Store
#### enum
```ts
export enum CounterMutations {
  UpCount = 'upCount',
  DownCount = 'downCount'
}
export enum CounterActions {
  UpCount = 'upCount',
  DownCount = 'downCount'
}
```

#### counter
```ts
import {
  CounterModuleActions,
  CounterModuleMutations,
  CounterModuleState
} from '~/store/counter'
import { CounterMutations } from '~/store/counter.enum'

export const state = (): CounterModuleState => ({
  count: 0
})

export const mutations: CounterModuleMutations = {
  upCount(state) {
    state.count++
  },
  downCount(state) {
    state.count--
  }
}

export const actions: CounterModuleActions = {
  upCount(context) {
    context.commit(CounterMutations.UpCount)
  },
  downCount(context) {
    context.commit(CounterMutations.DownCount)
  }
}
```
