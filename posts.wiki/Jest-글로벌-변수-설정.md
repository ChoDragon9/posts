`jest.config.js`
```js
module.exports = {
  ...,
  globals: {
    fetch: true
  },
  setupFiles: ['./test/_setup/fetch.js']
}
```
`./test/_setup/fetch.js`
```js
global.fetch = () => Promise.resolve()
```