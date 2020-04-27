[Nuxt TypeScript](Nuxt-TypeScript) 환경 구축한 뒤 상황이다. 기본적으로 설치되어 있는 Jest를 기반으로 TypeScript와 Vue를 테스트할 수 있도록 설정하는 것을 설명한다.

#### 1. 설치
jest와 typescript는 설정되있음으로 `ts-jest`와 `@types/jest`를 설치한다.
```
npm install -D ts-jest @types/jest
```

#### 2. tsconfig.json 설정
`@types/jest`를 `tsconfig.json`에 설정한다. TypeScript가 Jest의 타입을 알 수 있도록 한다.
```
{
  "compilerOptions": {
    ...
    "types": [
      "@types/node",
      "@types/jest",
      ...
    ]
  }
}
```

#### 3. jest.config.js 설정
- moduleFileExtensions: ts를 추가한다. ts파일을 해석하도록 설정한다.
- transform: ts의 확장자를 가지는 파일은 `ts-jest`로 해석하도록 한다.
- testRegex: 테스트 코드 파일명의 규칙을 설정한다.
- globals.ts-jest.diagnostics: 타입 오류도 테스트 오류로 판단한다.

```
module.exports = {
  ...
  moduleFileExtensions: ['ts', 'js', 'vue', 'json'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
    ...
  },
  testRegex: '\\.spec\\.ts$',
  ...
  globals: {
    'ts-jest': {
      diagnostics: true
    }
  }
}
```

#### 4. vue 확장자 타입 추가
테스트 코드에서 `.vue` 확장자를 해석하지 못한다. 그래서 타입을 추가해줘야 한다.
```
$ cd <Project Root>
$ mkdir types
$ cd types
$ touch vue-jest.d.ts
```

`vue-jest.d.ts` 파일에 아래 코드를 작성한다.
```ts
declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}
```

### 끝