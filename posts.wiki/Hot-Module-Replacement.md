### Hot Module Replacement
코드 수정 시 웹사이트 전체 새로고침을 하지 않고 수정된 일부만 수정/삭제/추가 하는 것이다. 이렇게 되면 아래와 같은 장점이 있다.

1. 전체 새로고침을 할 때 손실되는 상태를 유지할 수 있다.
2. 변경된 내용만 업데이트해 확인하여 시간이 절약된다.
3. 스타일 변경을 바로 알 수 있다.

### Install
#### webpack-dev-server 설치
```bash
npm i -D webpack-dev-server
```
#### webpack.config.js
```js
module.exports = {
  ...
  devServer: {
    contentBase: './dist'
  }
}
```
#### package.json
```json
"scripts": {
  "start": "webpack-dev-server --open"
}
```

- https://webpack.js.org/configuration/dev-server/
- https://webpack.js.org/guides/environment-variables/