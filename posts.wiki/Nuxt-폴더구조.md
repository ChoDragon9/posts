> https://nuxtjs.org/guide/directory-structure

```
nuxt
├─ assets
├─ components
├─ layouts
├─ middleware
├─ pages
├─ plugins
├─ static
├─ store
└─ test
```
#### assets
Stylus, Sass 파일들, 이미지, 폰트 처럼 컴파일되지 않은 에셋들을 포함하는 디렉토리이다.

assets에 있는 이미지 파일은 `v-bind`를 사용하면 동작하지 않는 다. `v-bind`를 사용하려면 `static`을 사용해야 한다.

`src='path/to/image'` 형태로 작성되면 `build`시 이미지 파일명에 해쉬코드가 추가되며, `.nuxt/dist/client/img`에 추가된다.

#### components
VueJs 컴포넌트를 포함하는 디렉토리이다. 이 컴포넌트들에게는 `asyncData` 또는 `fetch`를 사용해선 안된다.

#### layouts
애플리케이션의 레이아웃을 포함하는 디렉토리이다. 페이지의 Look and Feel를 변경하기 위해 사용된다.

레이아웃을 사용하는 것은 `page`에서 결정하며 레이아웃 코드중 `<nuxt />`에 `page` 컴포넌트가 작성된다.

#### middleware
애플리케이션의 미들웨어를 포함하는 디렉토리이다. 미들웨어는 **페이지나 레이아웃이 렌더링 되기 전**에 실행할 사용자 정의 함수를 정의할 수 있다.

페이지나 레이아웃 접근전이나 모든 라우팅 변경 시 **인증** 처리를 할 수 있다.

```
// middleware/logger.ts
export default () => {
  console.log('Logger')
}
```

```
// nuxt.config.ts
const config: NuxtConfiguration = {
  ...
  router: {
    middleware: 'logger'
  }
}
```

```
// pages/index.vue
@Component({
  ...
  middleware: 'logger'
})
```

#### pages
애플리케이션의 뷰와 라우트를 포함하는 디렉토리이다. NuxtJs는 모든 `.vue`파일을 읽고 애플리케이션의 라우터를 생성한다.

#### plugins
**루트 VueJs 애플리케이션이 생성되기 전**에 실행하고 싶은 자바스크립트 플러그인을 포함하는 디렉토리이다.

plugins는 글로벌에 컴포넌트를 등록하거나 함수 또는 상수를 주입하기 위해 사용한다. `layouts`, `pages`, `components`, `store`에서 등록된 플러그인을 사용가능하다.

```
// plugins/date-inject
export default ({ app }, inject) => {
  inject('getTime', () => Date.now())
}
```

```
// pages/index.vue
@Component({})
class Page extends Vue {
  constructor() {
    super()
    console.log('page getTime', this.$getTime())
  }
}
```

```
// store/index.ts
export const mutations = {
  upCount(state) {
    console.log('store getTime', this.$getTime())
    state.count++
  },
  downCount(state) {
    console.log('store getTime', this.$getTime())
    state.count--
  }
}
```

#### static
정적 파일들을 포함하는 디렉토리이다. `/filename.png` 형태로 사용하면 `/static/filename.png`로 연결된다.

#### store
Vuex Store 파일을 포함하는 디렉토리이다. Vuex Store 옵션은 NuxtJs 프레임워크에 의해 실행되며, `index.js` 파일을 생성하면 프레임워크가 자동으로 옵션을 활성화한다.

#### test
테스트 파일을 포함하는 디렉토리이다.