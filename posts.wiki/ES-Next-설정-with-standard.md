`babel-preset-*` 시리즈로 `latest`, `es2015`, `es2016`, `es2017`들이 있지만 공식적으로 사용하지 않는 것을 권고하고 있다.
공식적으로는 `babel-preset-env`를 사용하는 것으로 추천하고 있다.
```bash
npm install babel-preset-env --save-dev
```
#### .babelrc
```js
{
  "presets": ["env"]
}
```

### With Javascript Standard Style
```bash
npm install babel-eslint --save-dev
```
#### package.json
```json
{
  "standard": {
    "parser": "babel-eslint"
  }
}
```