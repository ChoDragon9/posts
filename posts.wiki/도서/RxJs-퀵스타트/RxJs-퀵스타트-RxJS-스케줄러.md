### RxJS 스케줄러
RxJS에서 자바스크립트의 비동기 작업을 효과적으로 처리할 수 있도록 도와주는 역할을 한다.

#### 자바스크립트 엔진
자바스크립트 엔진은 기본적으로 하나의 스레드에서 동작한다. 하나의 스레드는 하나의 스택을 가지고 있다는 의미하고, 
동시에 단 하나의 작업만을 할 수 있다는 의미이다. 그 비밀은 이벤트 루프와 큐에 있다.

#### 이벤트 루프와 큐
> https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/
자바스크립트는 이벤트 루프와 큐를 통해 비동기 작업을 수행한다. 직접적인 작업은 Web API에서 처리되고, 작업이 완료되면 요청 시 등록했던
콜백이 큐에 등록된다.

이벤트 루프는 계속 반복해서 콜 스택과 큐 사이의 작업을 확인한다. 콜 스택이 비워 있는 경우 큐에서 작업을 꺼내어 콜 스택에 넣는 다.

콜 스택에 작업이 없을 경우 우선적으로 마이크로태스크 큐를 확인한다. 마이크로테스크에 작업이 있다면 작업을 꺼내서 콜 스택에 넣는 다.
만약 마이크로테스크 큐가 비어서 더 이상 처리할 작업이 없으면 태스크 큐를 확인한다. 태스크 큐에 작업이 있다면 작업을 꺼내서 콜 스택에 넣는 다.

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

#### RxJS 스케줄러와 자바스크립트 비동기 작업의 종류
1. 태스크
   - 비동기 작업을 순차적으로 수행될 수 있도록 보장하는 형태의 작업 유형
   - RxJS에서 `asyncScheduler` 스케줄러를 이용하여 구현
   - `asyncScheduler`는 `setInterval`로 구현됨
2. 마이크로태스크
   - 비동기 작업이 현재 실행되는 자바스크립트 바로 다음에 일어나는 작업
   - 태스크보다 항상 먼저 실행
   - `MutationObserver`와 `Promise`가 해당
   - RxJS에서 `asapScheduler` 스케줄러는 이용하여 구현
   - `asapScheduler`는 `Promise`로 구현됨
