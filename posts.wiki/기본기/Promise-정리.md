> 두서없이 정리한 Promise

### 목차
- Promise 상태
- 응답 결과 전달 방법
- 마이크로테스크
- 연속적인 동작
- Promise API
- catch 케이스 스터디
- 적용 사례

### Promise 상태
Promise의 상태는 **대기**, **이행**, **거부** 상태가 있다.
상태는 대기에서 이행/거부로만 변경이 가능하다.
- 대기 : 초기상태
- 이행 : 성공 상태, resolve(), Promise.resolve()
- 거부 : 실패 상태, reject(), Promise.reject()

**이행상태**는 then으로 처리할 수 있다. resolve를 통해 전달한 값이 then에 인자로 전달된다.
```js
Promise.resolve(10)
  .then(result => console.log(result)) // 10
```

**거부상태**는 catch으로 처리할 수 있다. reject를 통해 전달한 값이 catch에 인자로 전달된다.
```js
Promise.reject({code: 404})
  .catch(({code}) => console.log(code)) // 404
```

### 응답 결과 전달 방법
응답 결과의 전달에 있어서 Callback과 Promise 차이가 있다.
#### [Promise] Active Async Control
프로미스는 then을 호출해야 결과를 얻는 다.
필요할 때 then을 호출해서 데이터를 받는 것이다.
```js
let result;
const promise = new Promise(r => $.post(url1, data1, r));
promise.then(v => {
    result = v;
});
```
```js
const promise1 = new Promise(r => $.post(url1, data1, r));
const promise2 = new Promise(r => $.post(url2, data2, r));
promise1.then(result => {
    promise2.then(v => {
        result.nick = v.nick;
        report(result);
    });
});
```
#### [Callback] Passive Async Control
콜백을 보낼 수는 있지만 언제 올지는 모른다.
```js
$.post(url. data, () => {
  // 언제 실행 되는 가
})
```

현실적으로 다수의 API 요청을 통해 결과를 만들기 때문에 언제 응답이 오는 지 중요하다.
```js
let result;
$.post(url1, data1, v => {
    result = v;
});
$.post(url2, data2, v => {
    result.nick = v.nick;
    report(result);
});
```

### 마이크로테스크
비동기로 등록되는 테스크 중 가장먼저 실행되는 마이크로테스크가 있다.
마이크로테스크는 Promise를 통해 등록 가능하다.

#### 자바스크립트 엔진
자바스크립트 엔진은 기본적으로 하나의 스레드에서 동작한다. 하나의 스레드는 하나의 스택을 가지고 있다는 의미하고, 
동시에 단 하나의 작업만을 할 수 있다는 의미이다. 그 비밀은 이벤트 루프와 큐에 있다.

#### 이벤트 루프와 큐
> https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/
자바스크립트는 이벤트 루프와 큐를 통해 비동기 작업을 수행한다. 직접적인 작업은 Web API에서 처리되고, 작업이 완료되면 요청 시 등록했던
콜백이 큐에 등록된다.

이벤트 루프는 계속 반복해서 콜 스택과 큐 사이의 작업을 확인한다. 콜 스택이 비워 있는 경우 큐에서 작업을 꺼내어 콜 스택에 넣는 다.

콜 스택에 작업이 없을 경우 우선적으로 마이크로테스크 큐를 확인한다. 마이크로테스크에 작업이 있다면 작업을 꺼내서 콜 스택에 넣는 다.
만약 마이크로테스크 큐가 비어서 더 이상 처리할 작업이 없으면 테스크 큐를 확인한다. 테스크 큐에 작업이 있다면 작업을 꺼내서 콜 스택에 넣는 다.

#### 자바스크립트 처리 과정
1. 비동기 작업으로 등록되는 작업은 Task와 Microtask 그리고 AnimationFrame 작업으로 구분된다.
2. Microtask는 Task보다 먼저 작업이 처리된다.
3. Microtask가 처리된 이후 requestAnimationFrame이 호출되고 이후 브라우저 렌더링이 발생한다.

```js
console.log('script start')

setTimeout(() => console.log('setTimeout'), 0)

Promise.resolve()
  .then(() => console.log('promise1'))
  .then(() => console.log('promise2'))

requestAnimationFrame(() => console.log('requestAnimationFrame'))

console.log('script end')
```
```
$ script start
$ script end
$ promise1
$ promise2
$ requestAnimationFrame
$ setTimeout
```

### 연속적인 동작
Promise는 비동기를 값으로 다룰 수 있다.
Promise로 처리하는 함수는 리턴된 Promise를 통해서 **연속적인 동작**을 할 수 있다.
반면에 콜백으로 처리하는 함수는 리턴되는 값이 없어 내부에서 처리해야 한다.
```js
const add10 = (a, callback) => {
  setTimeout(() => callback(a + 10), 100);
};

add10(10, res => {
  add10(res, res => {
    console.log(res);
  });
});

const add20 = (a, callback) => {
  return new Promise(resolve => setTimeout(() => resolve(a + 20), 100));
};

add20(10)
  .then(add20)
  .then(console.log);
```

### Promise API
#### resolve/reject
```javascript
const promise = new Promise((resolve, reject) => {
  getData(
    response => resolve(response.data), 
    error => reject(error.message)
  )
})
```
#### then/catch
```javascript
promise
  .then(data => console.log(data))
  .catch(err => console.error(err))
```
#### all
**Promise.all**은 모두 **이행**상태일 때 **then**을 통해 결과를 받게 된다.
```javascript
Promise
  .all([
    getPromise(),
    getPromise(),
    getPromise()
  ])
  //response all data
  .then(data => console.log(data))
  .catch(err => console.error(err))
```

**하나**라도 **거부**상태가 되면 **catch**가 실행되게 된다.
```javascript
Promise
  .all([
    Promise.resolve(1),
    Promise.reject(2),
  ])
  .catch(err => console.error(err))
  // 2
```

#### race
**Promise.race**는 **하나라도 이행 또는 거부 상태일 때** 완료를 하게 된다. 완료시에는 상태에 따라 then 또는 catch를 실행하게 된다.
```javascript
Promise
  .race([
    getPromise(), //1000ms
    getPromise(), //500ms
    getPromise() //250ms
  ])
  //response of 250ms
  .then(data => console.log(data))
```

```javascript
Promise
  .race([
    getPromise(), //1000ms
    getPromise(), //500ms
    getPromiseReject() //250ms
  ])
  //response of 250ms
  .catch(err => console.error(err))
```

### catch 케이스 스터디
#### catch에서 동기값 리턴
catch에서 값을 리턴하게 되면 다음 then에서 받게 된다.
HTTP Status가 2XX가 아닐 때 catch에 받더라도
경우에 따라 성공으로 처리하고 싶을 때가 있다.
해당 케이스에 유용할 것으로 보인다.
```js
const fetchData = _ => new Promise((_, reject) => {
  reject(100)
})
const fetchWrapper = _ => fetchData()
  .catch(() => 'fail')

fetchWrapper()
  .then(response => console.log(`response ${response}`))
// response fail
```

#### catch에서 Promise.reject() 리턴
catch에서 Promise.reject()을 리턴하면 catch에서 받게 된다.
**공통 에러 처리**할 때 용이할 것으로 보인다.
```js
const fetchData = _ => new Promise((_, reject) => {
  reject(100)
})
const fetchWrapper = _ => fetchData()
  .catch(() => Promise.reject('fail'))

fetchWrapper()
  .catch(error => console.log(`error ${error}`))
// error fail
```

### 적용 사례
#### 최소 요청 시간이 있는 비동기 처리
5초전에 응답이 오면 경우 5초뒤에 재요청할 것이고 5초뒤에 응답이 오면 응답이 온뒤 재요청한다.
```js
const recur = () => Promise.all([
  new Promise(resolve => setTimeout(resolve, 5000)),
  getData
]).then(recur)
```

#### async, await + Promise.all
async, await를 사용하여 동기코드와 유사하게 코드 작성이 가능하다. 여기에 Promise.all를 사용하면
병렬처리를 구현할 수 있다. 아래와 같이 일정시간이 지나면 resolve를 실행해는 delay함수가 있다.
```js
const delay = ms => new Promise(resolve => {
  setTimeout(() => resolve(ms), ms)
});
```
Promise를 리턴하는 함수를 사용할 때 await를 통해 resolve값을 받을 수 있다. main 함수의 결과는 6000ms 뒤에 반환된다.
```js
const main = async () => {
  console.time('main');
  const delay1s = await delay(1000);
  const delay2s = await delay(2000);
  const delay3s = await delay(3000);
  console.timeEnd('main');
  return delay1s + delay2s + delay3s;
};
main().then(console.log);
// main: 6005.81787109375ms
// 6000
```
각각의 Promise들이 서로 영향이 없다면 병렬로 처리할 필요가 있다. 모든 Promise가 끝날 때 Promise.all를 통해 확인한다.
함수의 결과는 3000ms 뒤에 반환된다. 병렬 처리를 하게 되면 빠른 응답을 받을 수 있다.
```js
const main = async () => {
  console.time('main');
  const [delay1s, delay2s, delay3s] = await Promise.all([delay(1000), delay(2000), delay(3000)]);
  console.timeEnd('main');
  return delay1s + delay2s + delay3s;
};
main().then(console.log);
// main: 3001.468017578125ms
// 6000
```

#### 참고자료
- [인프런](https://www.inflearn.com/course/functional-es6#curriculum) 함수형 프로그래밍과 JavaScript ES6+ - 비동기:동시성 프로그래밍 1
- [Youtube](https://youtu.be/fWRMM6AaMMc) NAVER 테크톡 - 함수형 자바스크립트와 동시성 프로그래밍
- [Youtube](https://youtu.be/_aFGnJUUmKA) 코드스피츠77 - ES6+ 기초편 6회차
- RxJs 퀵스타트 도서 - 자바스크립트 비동기 처리 과정과 RxJS 스케줄러