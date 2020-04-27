Action에서 가져온 비동기 데이터를 client에서 요청하고 렌더링하게 되면 SSR의 취지와 맞지 않는 다.

그래서 axios와 같이 비동기 데이터 요청이 필요할 때는 미리 데이터를 가져와 state를 변경한 뒤 UI를 그려준다.

router에서 페이지를 접속하기전 beforeEnter 메소드에 action를 dispatch하여 state를 변경한뒤

next()를 실행하면 페이지를 렌더링 하기전에 state가 변경되어 렌더링시 state 데이터를 사용할 수 있다.

[Data Pre-Fetching and State](https://ssr.vuejs.org/en/data.html)
```javascript
return new Router({
    mode: 'history',
    routes: [
      {
        ...
        beforeEnter (to, from, next) {
          store.dispatch('getShoppingItems')
            .then(() => next())
        }
      ...
```