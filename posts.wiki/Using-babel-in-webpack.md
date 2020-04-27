babel 을 사용할 때 babel-cli를 사용하지 않고 webpack과 같이 사용한다.

왜냐면 webpack을 통해 번들링도 해야 하고 최신 기술을 사용하기 위해서다.

### Webpack에 babel 사용하기
#### 설치
```bash
npm i babel-loader babel-core -D
```
#### webpack.config.js
```javascript
module: {
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }
  ]
}
```

위와 같이 babel-loader와 babel-core를 설치하고, webpack.config.js를 설치해도 아무것도 동작하지 않는 다.

동작 시키기 위해서는 .babelrc를 만들고 plugin을 설치해야 한다.
```bash
npm i babel-preset-env -D
```
#### .babelrc 작성
```javascript
{
  "presets": ["env"]
}
```