### 소개
[Parcel](https://ko.parceljs.org/)는 모듈 번들러로 사용률이 높은 webpack과 같은 역할을 한다. 플러그인을 추가해 컴포넌트 확장자(
vue, react 등)를 사용할 수 있다.

#### 장점
Parcel를 사용하면 얻을 수 있는 장점은 초기 프로젝트 세팅 비용을 절약할 수 있으며 자세한 것은 아래와 같다.

* Zero Configuation : 설정없이 TypeScript/ES6+/Hot module 지원
* Entry 포인트를 HTML로 지정 가능
* Code Splitting : import() 사용으로 자동으로 코드 분할해줌
* 파일명 Hash Code : 캐시 방지에 필요한 hash code를 자동으로 해줌

#### 단점
* 설치되지 않은 모듈을 로드하면 서버를 재실행해야 함
  * import('./foo')를 해야하는 데 실수로 import('foo')를 했었다면 Error 발생

### 실행
#### 설치
```bash
$ npm init -y
$ npm install --save-dev parcel-bundler
```

#### 핫모듈 사용 및 빌드
`package.json`

```javascript
  "scripts": {
    "dev": "parcel index.html", //핫 모듈
    "build": "parcel build index.html" //빌드
  },
```

`index.html`
```html
<html>
<body>
  <script src="./index.js"></script>
</body>
</html>
```

`index.js`
```javascript
import foo from './foo'
foo()
```

`foo.js`
```javascript
export default () => {
  console.log("Foo")
}
```

`dev`나 `build`를 실행하면 코드가 동작되는 것을 확인할 수 있다.

#### 코드 분할
`import()` 함수를 사용하면 해당 파일은 번들링에 포함하지 않고 파일로 만들어 준다.
Promise를 리턴하며 첫번째로 받는 argument는 export한 것을 사용할 수 있다.

```javascript
import('./foo').then(foo => foo.default())
```