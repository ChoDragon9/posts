```
angular
├─ e2e
│  └─ src
├─ src
│  ├─ app
│  ├─ assets
│  └─ environments
```
#### e2e
e2e 테스트 설정 파일과 테스트 코드를 포함하는 디렉토리이다.

#### src
애플리케이션 코드를 포함하는 디렉토리이다.

#### src/app
컴포넌트, 컴포넌트의 테스트 코드, 모듈을 포함하는 디렉토리이다.

#### src/assets
컴파일 되지 않은 파일과 정적 파일을 포함하는 디렉토리이다.

#### src/environments
애플리케이션의 환경 설정 파일을 포함하는 디렉토리이다.

---

Angular는 세부적인 사항은 [Style Guide](https://angular.io/guide/styleguide)를 통해서 가이드하고 있다. 

오픈빌더 서비스에서 Style Guide를 기반으로 프로젝트를 세팅했다. 하지만 몇가지의 파일의 위치에 대한 모호함으로 구조의 규칙이 위반되는 현상이 자주 발생하여 자체적으로 폴더 구조를 잡았다.

### 문제점
1. 서비스가 헬퍼, 상태관리, 백엔드 API 연동 등 역할이 많다. 서비스 파일의 역할이 모호해지며 관리가 힘들었다.
2. 파이프, 디렉토리, 가드 등 Angular 아키텍쳐의 요소들의 위치가 모호했다.
3. FeatureModule, SharedModule, CoreModule의 모듈들의 역할을 이해하고 파일을 정의하지 않은 케이스가 빈번하게 발생했다.

### 자체적으로 셋업한 폴더 구조
`src/app` 부분만 자체적으로 셋업을 했다.
```
├─ src
│  └─ app
│     ├─ app.module.ts
│     ├─ constants
│     ├─ modules
│     │  └─ feature
│     │     ├─ feature.module.ts
│     │     ├─ feature.page.ts
│     │     ├─ feature.page.html
│     │     ├─ pipes
│     │     ├─ directives
│     │     ├─ shared
│     │     │  ├─ feature.helper.ts
│     │     │  ├─ feature.state.ts
│     │     │  └─ child.state.ts
│     │     └─ components
│     │        ├─ child.ts
│     │        ├─ child.html
│     │        ├─ child2
│     │        ├─ child2.ts
│     │        └─ child2.html
│     ├─ core
│     │  ├─ core.module.ts
│     │  ├─ apis
│     │  ├─ guards
│     │  ├─ helpers
│     │  └─ states
│     └─ shared
│        ├─ shared.module.ts
│        ├─ components
│        ├─ directives
│        └─ pipes
```

#### app.module.ts
루프 모듈을 정의하는 파일이다.

#### constants
상수를 포함하는 디렉토리이다.

#### modules
FeatureModule을 포함하는 디렉토리이다. FeatureModule은 기능단위의 모듈을 정의하며, 기능은 페이지 단위, 독립적으로 동작하는 팝업 단위가 될 수 있다.

#### modules/feature/shared
FeatureModule 내에서 두개 이상의 컴포넌트에서 사용할 서비스 파일을 포함한다.

#### core
CoreModule을 포함하는 디렉토리이다. 싱글턴 객체를 정의하는 파일로 역할에 맞게 각 폴더에 정의해서 사용한다.

#### shared
SharedModule을 포함하는 디렉토리이다. 재사용할 컴포넌트, 디렉티브, 파이프를 정의한다.

#### 서비스 역할 분리
- filename.api.ts: 백엔드 API의 엔드포인트를 정의하는 파일이다.
- filename.helper.ts: 독립적으로 동작하는 헬퍼를 정의하는 파일이다.
- filename.state.ts: 상태관리를 정의하는 파일이다.
- filename.guard.ts: 가드를 정의하는 파일이다.