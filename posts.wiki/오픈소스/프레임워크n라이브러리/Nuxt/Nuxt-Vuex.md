### Classic
#### `/store/index.ts`
```ts
export const state = () => ({
  count: 0
})

export const mutations = {
  upCount(state) {
    state.count++
  },
  downCount(state) {
    state.count--
  }
}

export const actions = {
  fetchUpCount(context) {
    setTimeout(() => {
      context.commit('upCount')
    }, 5000)
  },
  fetchDownCount(context) {
    setTimeout(() => {
      context.commit('downCount')
    }, 5000)
  }
}
```
#### `/pages/index.vue`
```html
<div>
  {{ count }}
  <input type="button" value="Fetch Up" @click="fetchUpCount()" />
  <input type="button" value="Fetch Down" @click="fetchDownCount()" />
</div>
```
```ts
import Component from 'vue-class-component'
import { Vue, State, Action } from 'nuxt-property-decorator'

@Component({})
class MyPage extends Vue {
  @State count
  @Action fetchUpCount
  @Action fetchDownCount
}

export default MyPage
```
### Modules
#### `/store/auth.ts`
```ts
interface Auth {
  isLogin: boolean
}

export const state = (): Auth => ({
  isLogin: false
})

export const mutations = {
  login(state: Auth) {
    state.isLogin = true
  },
  logout(state: Auth) {
    state.isLogin = false
  }
}

export const actions = {
  fetchLogin(context) {
    setTimeout(() => {
      context.commit('login')
    }, 1000)
  }
}
```
#### `/pages/index.vue`
```html
<div>
  <h1 v-if="isLogin">로그인 상태</h1>
  <h1 v-if="!isLogin">로그아웃 상태</h1>
  <input type="button" value="Login" @click="fetchLogin()" />
</div>
```
```ts
import Component from 'vue-class-component'
import { Vue, namespace } from 'nuxt-property-decorator'

const authStore = namespace('auth')

@Component({})
class MyComponent extends Vue {
  @authStore.State('isLogin') isLogin
  @authStore.Action('fetchLogin') fetchLogin
}

export default MyComponent
```