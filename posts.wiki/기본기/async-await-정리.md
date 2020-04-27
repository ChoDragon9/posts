> 두서 없이 케이스별로 정리한 async await

#### async 함수
async 함수는 Promise를 반환한다.
```js
const f = async () => {}
f() // Promise
```
**정상적인 동작**으로 값을 반환하면 **then**에서 받을 수 있다.
```js
const f = async () => 'Hi!'
f().then(console.log) // Hi!
```

**비정상적인 동작**으로 에러를 발생하면 **catch**에서 받을 수 있다.
```js
const f = async () => die;
f().catch(error => console.log('에러 발생!')) // 에러 발생!
```

#### async에서 Promise 반환
async 함수의 반환값으로 Promise를 사용하면 호출자에서는 async 함수 사용과 동일하게 사용된다.
resolve 상태면 then으로 처리되고, reject 상태면 catch에서 처리된다.
```js
const f = async () => Promise.resolve('Hi!')
f().then(console.log) // Hi!
```
```js
const f = async () => Promise.reject('Hi!')
f().catch(error => console.log('에러 발생!')) // 에러 발생!
```

#### async에서 Promise 반환값의 throw
async 반환되는 Promise의 내부에서 예외 상황이 발생했을 때는 async의 reject 상태가 된다.
```js
const f = async () => {
  return new Promise(() => die)
}
f().catch(() => console.log('에러 발생!'))
```

#### async await
Promise를 반환하는 코드를 다수 기술이 필요할 경우 await를 사용하면 읽기 쉽게 기술이 가능하다. await는 resolve 상태의 값은 좌항에 바인딩하고, reject 상태는 async의 catch로 전달된다.

```js
const delay = (time, value) => new Promise(resolve => {
  setTimeout(() => resolve(value), time);
});
```

```js
async function f() {
  const a = await delay(1000, 'a');
  const b = await delay(2000, 'b');
  return `${a}${b}`;
}

f().then(console.log) // ab
```

```js
async function f() {
  const a = await delay(1000, 'a');
  const b = await Promise.reject('에러 발생!');
  return `${a}${b}`;
}

f().catch(console.log) // 에러 발생!
```

#### async await throw
await를 사용된 함수에서 예외가 발생되면 catch로 전달된다.
```js
const g = () => Promise.resolve(die)
const f = async () => {
  return await g()
}

f().catch((err) => console.log('에러 발생!', err)) // 에러 발생!
```

#### await 동기 코드 에러
await에서 동기 코드에서 에러가 발생되면 catch로 전달된다.
```js
const g = () => die
const f = async () => {
  return await g()
}

f().catch(() => console.log('에러 발생!')) // 에러 발생!
```