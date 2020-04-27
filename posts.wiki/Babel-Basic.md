### Babel
- 다음 세대의 ECMAScript(ECMA 262)를 사용할 수 있게 한다.
- 사용자가 지정한 브라우저에서 동작하는 버전으로 컴파일 결과 코드를 만들어 준다.

### ES2015 and beyond 설치 방법
```bash
npm i babel-preset-dev -D
```
babel-preset-env는 es2015, es2016, es2017 버전을 모두 지원한다.

옵션을 설정하지 않고 env를 그대로 사용할 경우 babel-preset-latest와 동작이 동일하다.

.babelrc에 환경을 설정하게 되면 해당하는 기능을 컴파일 해준다.

```javascript
{
  "presets": [
    ["env", {
      "targets": {
        "browsers": ["last 2 versions", "safari >= 7"]
      }
    }]
  ]
}
```
위 설정의 의미는 각 브라우저의 최신 2개의 버전과 사파리 버전이 7이거나 큰 버전에서 동작하는 코드를 export 해달라는 의미이다.

babel은 browserslist 파서를 사용하기 때문에 브라우저 지원 범위는 browserslist를 참고해서 작성한다.

주로 사용하는 것을 정리하면
- "last 2 versions" : 각 브라우저의 최신 두 버전
- " > 5%" : 전세계 사용량 통계를 기준으로 사용, 5% 초과하는 버전 사용, >= <= < 모두 사용 가능
- "not ie <= 8" : IE8 이하 버전 제외

### Babel Polyfill
babel은 문법적인 부분(화살표 함수 같은) 컴파일 하기 때문에 새로운 자바스크립트 API를 사용하기 위해서는 babel-polyfill을 설치해야 한다.
babel 사이트에서는 Promise, WeakMap, Array.from, Object.assign, Array.prototype.includes 와 같은 built-in 기능을 사용하려면 설치하라고 가이드 하고 있다.

```
npm i babel-polyfill -D
```