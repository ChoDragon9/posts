### 글의 목적
Angular 기반한 프로젝트를 한 경험이 있다. Angular는 TypeScript를 필수로 사용한다. 그 프로젝트에서 TypeScript를 사용하면 생산성이 높아지는 것을 몸소 느끼게 되었다. 그래서 새롭게 프로젝트를 하게되면 TypeScript를 사용하는 것으로 마음(?)먹었다.

이 글에서는 Nuxt를 TypeScript 기반으로 개발하는 것을 가이드한다. Nuxt를 TypeScript로 개발하는 것에 대한 레퍼런스가 아직 많이 없기 때문에 직접 작성하기로 했다. 이 글에서는 Nuxt에 TypeScript를 세팅하는 방법과 TypeScript로 작성한 Vue와 Vuex 코드를 소개한다.

### 설치 및 설정
먼저 개발환경을 잡기 위해서 필요할 모듈 설치와 환경설정이 필요하다.

#### NPX 설치
TypeScript로 작성된 Nuxt는 `npx`를 통해서 커멘드를 실행하는 게 좋다. 기본으로 제공하는 `dev` 명령어는 TypeScript를 기반으로 실행해주지 않기 때문에 `npx` 설치는 필수이다.

[npx](https://www.npmjs.com/package/npx#description)는 `node_modules/.bin`에 설치되는 커멘드를 프로젝트 로컬에서 실행가능하도록 해주는 모듈이다.

```
$ npm install -g npx
```

#### Nuxt 프로젝트 설치
> [공식 가이드 문서](https://nuxtjs.org/guide/installation)를 참고한다.

Nuxt를 설치하는 것은 JS로 개발할 때와 동일하다. 이 명령어를 실행하면 **UI Framework**와 **Server-side Framework** 선택이 나온다. 원하는 Framework를 선택하면 된다.
```
$ npx create-nuxt-app <project-name>
```

#### Nuxt TypeScript 설치
컴파일 타임에 타입 체크를 하기 위해서 `devDependencies`에 `@nuxt/typescript`와 `nuxt-property-decorator`를 설치한다.
```
$ npm install -D @nuxt/typescript nuxt-property-decorator
```

`nuxt.config.ts`와 `serverMiddlewares`에 TypeScript를 런타임에 지원하기 위해서 `dependencies`에 `ts-node`를 설치한다.
```
$ npm install ts-node
```

#### 설정 파일 수정
모듈 설치가 끝나면 TypeScript로 개발할 수 있도록 설정이 필요하다.

1. `touch tsconfig.json` 명령어로 TypeScript 설정파일을 만든다. 
2. `npx nuxt` 명령어로 `tsconfig.json`을 수정한다. `nuxt`를 처음 실행하면 `tsconfig.json`을 자동으로 업데이트 해준다.
3. `tsconfig.json`에 `@nuxt/config`을 추가한다. nuxt 타입을 IDE에서 자동완성 가능하게 된다.
```diff
"types": [
 "@types/node",
 "@nuxt/vue-app",
+ "@nuxt/config"
]
```

#### 설정파일을 TypeScript로 변경
1. `nuxt.config.js`를 `nuxt.config.ts`로 변경한다. 
2. TypeScript로 `nuxt.config.ts`를 수정한다.

```ts
import NuxtConfiguration from '@nuxt/config'

const config: NuxtConfiguration = {
  // Type or Press `Ctrl + Space` for autocompletion
}

export default config
```

#### 실행하기
Nuxt에서 TypeScript를 사용하기 위해서는 해당 명령어로 실행해야 한다.
`npm run dev` 명령어가 기본으로 설정되어 있지만 해당 명령어로는 TypeScript가 동작하지 않는다.
```
$ npx nuxt
```

#### 빌드하기
빌드는 2가지가 있다. `SPA`와 `정적파일 생성`이다.
- `npx nuxt build`: SPA 빌드
- `npx nuxt generate`: 정적파일 생성

### 빌드 파일 실행하기
빌드 결과가 있는 `dist` 폴더를 실행하기 위해서는 아래 명령어를 사용한다.
```
$ npx nuxt start
```

### TypeScript로 Vue 코드 작성하기
#### Vue의 `<script>`를 TypeScript로 설정하기
먼저 **주의**할 점은 `.vue`파일에 `<script>`는 `<script lang="ts">`로만 작성해야 한다. `lang="ts"`를 추가하면 IDE에서 컴포넌트를 자동으로 `import`가능하다.

#### 컴포넌트 작성하기
> `v-for`를 사용하면 `:key`를 필수로 사용해야 한다.

```html
<template>
  <div class="VueToNuxtLogo">
    <template v-for="item in classes">
      <div :class="`${COMMON_CLASS} ${item}`" :key="item"></div>
    </template>
  </div>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import { Vue } from 'nuxt-property-decorator'

@Component({})
class Logo extends Vue {
  COMMON_CLASS = 'Triangle'
  classes: string[] = [
    'Triangle--two',
    'Triangle--one',
    'Triangle--three',
    'Triangle--four'
  ]
}

export default Logo
</script>
```

```html
<template>
  <div class="container">
    <logo />
    <a class="button--green" @click.prevent="upCount()">
      Up
    </a>
    { { count } }
    <a class="button--grey" @click.prevent="downCount()">
      Down
    </a>
  </div>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import { Vue } from 'nuxt-property-decorator'
import Logo from '~/components/Logo.vue'

@Component({
  components: {
    Logo
  }
})
class Page extends Vue {
  count: number = 0
  upCount() {
    this.count++
  }
  downCount() {
    this.count++
  }
}

export default Page
</script>
```

#### Vuex 루트에 사용하기
루트에 정의할 때는 `store/index.ts`에 `state`, `mutations`, `getters`, `actions`를 정의한다.
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
```

컴포넌트에서는 데코레이터만 붙이면 사용가능하다.
```ts
class Page extends Vue {
  @State count
  @Mutation upCount
  @Mutation downCount
}
```

#### Vuex 모듈 모드 사용하기
모듈 모드로 정의할 때는 `store`에 다른 파일을 정의한다. 파일 내부에는 `state`, `mutations`, `getters`, `actions`를 정의한다.
```ts
// page.ts
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
```

컴포넌트에서 사용할 때는 모듈을 접근해서 사용한다.
```ts
class Page extends Vue {
  @State((state) => state.page.count)
  count
  @Mutation('page/upCount')
  upCount
  @Mutation('page/downCount')
  downCount
}
```

### 끝
이 글에서 작성된 설정과정을 보일러 플레이트로 만들어서 [create-nuxt-ts](https://github.com/ChoDragon9/create-nuxt-ts)에 올렸다. 이 저장소를 내려받으면 설정 과정없이 바로 사용 가능하다.

그리고 처음 인텔리제이를 통해서 개발환경세팅을 했는 데, 인텔리제이는 IDE에 설정과정에서 많은 삽질이 필요하다. 웹스톰을 사용하면 별도로 IDE 설정 필요없이 바로 사용가능하다.