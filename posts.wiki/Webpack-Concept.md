### 웹팩 컨셉
#### 요약
* Entry : 웹팩 빌드 시작점
* Output : 웹팩 빌드 결과물 만들어지는 곳
* Loaders : import를 통해 읽은 파일을 컴파일하고 싶을 때 사용
* Plugins : 코드 최적화를 하고 싶을 때 사용

#### Entry
- entry point는 웹팩 빌드의 시작점이다.
- 모듈과 의존성이 있는 라이브러리들을 계산해 내부적인 종속성 그래프를 만든다
- String으로 단일 파일을 Entry로 지정할 수 있고, Array / Object Literal를 통해 2개 이상의 Entry 를 만들수 있다.

#### Output
- 웹팩 빌드의 결과물을 지정한다.
- 빌드 결과물의 파일명을 지정한다.

#### Loaders
- webpack.config.js에 작성할 때 `module`이라는 프로퍼티명을 사용한다.
- 로더는 자바스크립트 파일이외 다른 파일을 처리할 수 있게 도와주는 역할을 한다.
- import의 기본 확장자는 `.js`로 로더를 추가없이 사용가능하지만 ES Feature를 사용하기 위해서 로더를 추가할 수 있다.
- 로더를 사용하지 않으면 웹팩은 자바스크립트만 사용가능하다
```javascript
module.exports = {
  entry: './entry.js',
  output: {
    path: './dist',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  }
}
```
- rules[].test 는 변환될 파일들을 찾는다.
- rules[].use 는 변환을 위해 사용할 로더를 설정한다.
- 위 설정은 이렇게 해석할 수 있다. `import로 .txt파일을 사용할 경우 raw-loader를 사용해서 변환하라`

#### Plugins
- 로더보다 광범위한 역할을 한다.
- 성능 최적화와 코드 최소화 작업을 할 수 있다.
- webpack.config.js 파일에 require()를 통해 읽어온 뒤 new operator를 통해 정의해서 사용한다.
``` javascript
const webpack = require('webpack')
module.exports = {
  ..., //entry, output, module
  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ]
}
```

#### Resolve
- 모듈(`import`, `require`)이 어떻게 해석되는 지를 설정
- 자주 사용되는 기능은 `alias`로 상대경로를 절대경로로 사용하여 기술할 수 있다.
```js
module.exports = {
  //...
  resolve: {
    alias: {
      Utilities: path.resolve(__dirname, 'src/utilities/'),
      Templates: path.resolve(__dirname, 'src/templates/')
    }
  }
};
```
```js
import Utility from '../../utilities/utility';
```