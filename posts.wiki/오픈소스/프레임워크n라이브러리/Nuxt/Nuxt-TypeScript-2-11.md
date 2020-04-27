### 설치
설치 순서는 다음과 같다.
```bash
$ npm install -g npx # npx 설치. create-nuxt-app을 설치하기 위함.
$ npx create-nuxt-app <project-name> # nuxt 설치
$ cd <project-name>
$ npm install --save-dev @nuxt/typescript-build
```

### 환경설정
설치가 완료되면 몇가지 환경설정이 필요하다.

#### 1. TypeScript의 빌드 옵션 설정
`tsconfig.json` 파일을 추가한뒤 아래 코드를 작성한다. 아래 코드는 공식 가이드 문서에서 가져왔다.

```js
{
  "compilerOptions": {
    "target": "es2018",
    "module": "esnext",
    "moduleResolution": "node",
    "lib": [
      "esnext",
      "esnext.asynciterable",
      "dom"
    ],
    "esModuleInterop": true,
    "allowJs": true,
    "sourceMap": true,
    "strict": true,
    "noEmit": true,
    "baseUrl": ".",
    "paths": {
      "~/*": [
        "./*"
      ],
      "@/*": [
        "./*"
      ]
    },
    "types": [
      "@types/node",
      "@nuxt/types"
    ]
  },
  "exclude": [
    "node_modules"
  ]
}
```

#### 2. `*.vue` 확장자 파일 설정
TypeScript에서 `*.vue` 확장자 파일을 사용하기 위한 설정이다. `vue-shim.d.ts` 파일을 추가한뒤 아래 코드를 작성한다.
```ts
declare module "*.vue" {
  import Vue from 'vue'
  export default Vue
}
```

#### 3. Nuxt에 TypeScript 빌드 설정
`nuxt.config.js`의 `buildModules`에 `@nuxt/typescript-build`를 추가한다.

```diff
buildModules: [
+  '@nuxt/typescript-build'
],
```

### 동작확인
먼저 로컬 서버를 띄운다.
```bash
$ npm run dev
```

`pages/index.vue` 파일에서 TypeScript 코드를 작성하여 확인해보자.

```html
<script lang="ts">
import Logo from '~/components/Logo.vue'

interface User {
  firstName: string
  lastName: string
}

export default {
  components: {
    Logo
  },
  data (): User {
    return {
      firstName: 'Peter',
      lastName: 'Cho'
    }
  }
}
</script>
```

### 끝