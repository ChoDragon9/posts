### Install
```bash
$ mkdir hello-webpack
$ cd hello-webpack
$ npm init
$ npm i webpack webpack-cli -D
```
### Getting start
#### webpack.config.js
```javascript
const path = require('path')

module.exports = {
  entry: './entry.js',
  output: {
    path: path.resolve(__dirname,'dist'),
    filename: 'bundle.js'
  }
}
```
#### 샘플 코드 만들기
##### entry.js
```javascript
import { foo } from './foo'
import { bar } from './bar'

foo()
bar()
```
##### bar.js
```javascript
export const bar = {
  bar () {
    console.log("bar")
  }
}
```
##### foo.js
```javascript
export const foo = {
  foo () {
    console.log("foo")
  }
}
```
#### build
##### package.json 에 `build`명령어 추가
```
"scripts": {
  "build": "webpack --config webpack.config.js"
}
```
##### webpack build
```bash
$ npm run build
```
```
├── dist
     └── bundle.js
```
### Webpack Nodejs
webpack에서 nodejs 코드를 빌드하려면 target를 지정해줘야 한다.
```javascript
module.exports = {
  entry: './entry-server.js',
  target: 'node'
}
```