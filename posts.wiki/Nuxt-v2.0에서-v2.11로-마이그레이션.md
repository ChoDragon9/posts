### 글의 목적
트위터에서 Nuxt가 TypeScript를 공식적으로 지원함을 알게 되었었다. [Nuxt v2.9.0](https://github.com/nuxt/nuxt.js/releases/tag/v2.9.0) 부터 TypeScript에 대한 공식적인 가이드와 마이그레이션 가이드를 알렸다.

8월초 프로젝트를 셋업하는 당시는 공식적인 가이드를 제공하지 않았는 데, 프로젝트 셋업 후 공식 버전이 릴리즈 되었다. 이 포스트는 프로젝트 중간에 2.11.0으로 마이그레이션 한 내용에 대한 정리이다.

### 목차
- [파일별 업그레이드 내역](#파일별-업그레이드-내역)
- [마이그레이션 과정](#마이그레이션-과정)
- [마이그레이션 시 발생한 이슈](#마이그레이션-시-발생한-이슈)

### 파일별 업그레이드 내역
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

### 마이그레이션 과정
마이그레이션은 3단계로 진행했다. TypeScript를 공식지원하는 버전인 2.9.x의 이전과 다음 버전을 구분했다.

```
1. 2.0.0 => 2.8.1
2. 2.8.1 => 2.9.2
3. 2.9.2 => 2.11.0
```

각 버전의 의미는 다음과 같다.
- 2.0.0: 현재 버전
- 2.8.1: TypeScript 공식지원 버전의 바로 **이전 버전**
- 2.9.2: TypeScript 공식지원 시작 버전(2.9.x) 중 가장 높은 버전
- 2.11.0: 가장 최신 버전

### 마이그레이션 시 발생한 이슈
마이그레이션 시 발생한 이슈 `2.8.1` => `2.9.2`에서 버전 업그레이드 후 발생한 이슈라고 볼 수 있다. 이외 다른 스팩에서는 이슈없이 바로 버전 업그레이드가 진행되었다.

#### Server 종료 되는 현상 해결
`2.8.1` => `2.9.2` 버전 업그레이드 후 SPA 모드는 커멘드 옵션으로 변경되었다. 개발 단계 서버 실행 시, `nuxt --spa`로 실행해야 한다.

#### scrollBehavior
nuxt 2.9.x 부터 app/router.scrollBehavior.js로 처리

#### Decorator에러 발생
nuxt.config.ts를 정상적으로 사용하기 위해서는 `@nuxt/typescript-runtime` 모듈을 설치해야 한다.
nuxt.config.ts에는 TypeScript를 사용하도록 설정하는 파일이 있다. 그렇기 때문에 Runtime 설정도 필요하다.

설치 후에는 `scripts`에 `nuxt`로 사용했던 명령어를 `nuxt-ts`로 변경이 필요하다.

### 끄읕
사실 Nuxt는 2.11.0으로 업그레이드한 이유는 단순히 마이그레이션의 목적이 아니였다. [TypeScript 3.7](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html)부터 [Optional Chaining](https://github.com/tc39/proposal-optional-chaining) 스팩이 추가되었는 데, 객체의 프로퍼티 접근 관련해서 안전하고 가독성 좋은 방안을 찾고 있었던 시기였다. 결론적으로 Optional Chaining를 사용하기 위해서 버전 업그레이드에 대한 연쇄적으로 찾아본 결과 Nuxt를 최신 버전으로 업그레이드하게 된 것이다.