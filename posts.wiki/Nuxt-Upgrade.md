### 업그레이드 전략
- Release Note를 통해 버전을 한 단계씩 올린다.
- 이슈는 검색이 안될 수 있음. 현상을 보고 해결한다.

### v2.9.2
#### Server 종료 되는 현상 해결
`2.8.0` => `2.9.2` 버전 업그레이드 후 SPA 모드는 커멘드 옵션으로 변경되었다. 개발 단계 서버 실행 시, `nuxt --spa`로 실행해야 한다.

#### scrollBehavior
nuxt 2.9.x 부터 app/router.scrollBehavior.js로 처리

#### Decorator에러 발생
nuxt.config.ts를 정상적으로 사용하기 위해서는 `@nuxt/typescript-runtime` 모듈을 설치해야 한다.
nuxt.config.ts에는 TypeScript를 사용하도록 설정하는 파일이 있다. 그렇기 때문에 Runtime 설정도 필요하다.

설치 후에는 `scripts`에 `nuxt`로 사용했던 명령어를 `nuxt-ts`로 변경이 필요하다.

### @nuxt/typescript, nuxt v.2.11.1
#### nuxt.config.ts
```diff
- import NuxtConfiguration from '@nuxt/config'
+ import { Configuration } from '@nuxt/types'

- const config: NuxtConfiguration = {
+ const config: Configuration = {

-   devModules: [
-     // Doc: https://github.com/nuxt-community/eslint-module
-     '@nuxtjs/eslint-module'
-   ],

+   buildModules: [
+     [
+       '@nuxt/typescript-build',
+       {
+         typeCheck: true,
+         ignoreNotFoundWarnings: true
+       }
+     ]
+   ],
```

#### package.json
```diff
-    "dev": "nuxt",
-    "build": "nuxt build",
-    "generate": "nuxt generate",
-    "start": "nuxt start",
+    "dev": "nuxt-ts --spa",
+    "build": "nuxt-ts build --spa",
+    "generate": "nuxt-ts generate",
+    "start": "nuxt-ts start",
"dependencies": {
+    "@nuxt/typescript-runtime": "^0.3.3",
-    "nuxt": "^2.0.0",
+    "nuxt": "^2.11.0",
"devDependencies": {
-    "@nuxt/typescript": "^2.8.1",
+    "@nuxt/typescript-build": "^0.5.2",
```

#### tsconfig.json
```diff
-  "@nuxt/vue-app",
-  "@nuxt/config"
+  "@nuxt/types"
```

#### middleware
```diff
- import { Middleware } from '@nuxt/vue-app'
+ import { Middleware } from '@nuxt/types'
```