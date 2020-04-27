### 번들러
#### Webpack
- [Webpack Basic](https://github.com/ChoDragon9/es6/wiki/Webpack+Basic)
- [Webpack Concept](https://github.com/ChoDragon9/es6/wiki/Webpack+Concept)
- [환경변수사용](%ED%99%98%EA%B2%BD-%EB%B3%80%EC%88%98-%EC%82%AC%EC%9A%A9)
- [번들링시 노드모듈 예외처리](%EB%B2%88%EB%93%A4%EB%A7%81%EC%8B%9C-%EB%85%B8%EB%93%9C%EB%AA%A8%EB%93%88-%EC%98%88%EC%99%B8%EC%B2%98%EB%A6%AC)
- [Multi Chunk](Multi-chunk-file)
- [Tree Shaking](https://webpack.js.org/guides/tree-shaking/) : 미사용 코드 삭제
- [Hot Module Replacement](Hot-Module-Replacement)
- [웹펙 성능 개선 포인트](웹펙-성능-개선-포인트)

#### Babel
- [Babel Basic](https://github.com/ChoDragon9/es6/wiki/Babel+Basic)
- [Using-babel-in-webpack](Using-babel-in-webpack)
- [Babel Stage](Babel-Stage)
- [ES Next 설정 with standard](ES-Next-%EC%84%A4%EC%A0%95-with-standard)
- [Babel: Javascript Decorators](Babel:-Javascript-Decorators)

#### Parcel
- [Parcel Basic](https://github.com/ChoDragon9/es6/wiki/Parcel+Basic)

### 테스트
#### Jest
- [Getting Started](https://github.com/ChoDragon9/es6/wiki/Getting-Started-Jest)
- [Jest 글로벌 변수 설정](Jest-글로벌-변수-설정)

### 문서화
#### ESDoc
- [Getting Started](Getting-Started-ESDoc)
- [Document Coverage Hosting Service](Document-Coverage-Hosting-Service)

### CI
#### Travis CI
- [Getting Started](Getting-Started-Travis-CI)

#### Coveralls
- [Getting Started](Getting-Started-Coveralls)

#### Code Climate
- [Getting Started](Getting-Started-Code-Climate)

### Lint
#### ESLint
#### extends
- 기본 설정에서 확장할 수 있게 한다.
- `extends` 프로퍼티는 `eslint-config-` 프리픽스로 시작하는 패키지를 사용한다.
- `plugins:`으로 시작하는 값은 `eslint-plugin-` 프리픽스로 시작하는 패키지를 사용한다.
  - 커스텀으로 만들어진 추가적인 설정 규칙을 사용할 수 있다.
  - `plugins:<package name>/<configuration name>` 형태로 사용된다.
- 패키지의 순서에 따라서 결과가 달라진다.
  - 하위에 선언될 수록 우선순위가 높아진다.
  - 상위에 선언된 룰을 하위에서 덮어쓴다.

#### plugins
- 플러그인 설정파일을 사용하기 위해서는 `plugins`에 플러그인을 등록해야 한다.
- `eslint-plugin-` 프리픽스로 시작하는 패키지를 사용한다.

#### Standard JS
- 실제 웹 표준 그룹에서 개발한 것이 아니지만 npm, github, mongoDB 와 같은 수천개의 프로젝트에서 사용됨
- 설정 파일을 작성하지 않고 추가 할 수 있다.
- 자동으로 설정에 맞게 변경해주는 기능이 있다.
- 리뷰 시간에 코딩 스타일을 잡는 것을 방지한다.