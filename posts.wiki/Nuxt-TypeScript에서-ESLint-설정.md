> 참고: https://dev.to/robertcoopercode/using-eslint-and-prettier-in-a-typescript-project-53jb

기존처럼 사용하면 타입스크립트 문법인 `as`가 동작되지 않는다. TypeScript의 ESLint 설정이 안되서 발생하는 현상이다. 다음과 같이 설정하면 해결 가능하다.

#### 1. 설치
```
$ npm i -D @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

#### 2. `.eslintrc.js` 변경
```diff
  parserOptions: {
-   parser: 'babel-eslint'
+   parser: '@typescript-eslint/parser'
  },
  extends: [
+   'plugin:@typescript-eslint/recommended',
+   'prettier/@typescript-eslint',
```

parserOptions.parser 옵션을 변경하고 extends에 옵션을 추가한다. extends에는 상위에 추가해야 정상동작한다.