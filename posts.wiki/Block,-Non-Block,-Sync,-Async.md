#### 제어흐름은 블록킹이다.
- 프로그램은 실행되면 도중에 멈춰지지 않고 끝까지 실행됨
- 플랫폼의 안정성을 위해 블록되는 시간이 길면 강제 종료시킴(5초 제한)
```js
for(const i of (function*(){
  let i = 0;
  while(true) yield i++;
})()) console.log(i);
```
#### 블록
- 즉시 플로우제어권을 반환하지 않음
- 디바이스들은 60fps로 디스플레이됨
- 1fps에 딜레이를 생기면 블록킹을 일으켰다고 한다.
```js
const f = v=>{
  let i = 0;
  while(i++ < v);
  return i;
}
f(10);
f(100000000000000000000000);
```
- 이 경우 블록킹이 발생된다.
  - 배열순회, 정렬 => 배열크기에 따라
  - DOM 순회 => DOM의 하위구조에 따라
  - 이미지프로세싱 => 이미지크기에 따라

#### 자바스크립트 쓰레드
1. 메인 유저인터페이지 쓰레드 1개
   - 프레임(명령큐)
2. 백그라운드 쓰레드 n개
3. 웹 워커 쓰레드

#### 블록킹 회피
> 블록킹 함수
```js
const looper = (n, f)=>{
  for(let i = 0; i < n; i++) f(i);
};
```
1. 타임 슬라이스 메뉴얼
```js
const looper = (n, f, slice = 3) => {
    let limit = 0,
        i = 0;
    const runner = _ => {
        while (i < n) {
            if (limit++ < slice) f(i++);
            else {
                limit = 0;
                requestAnimationFrame(runner);
                break;
            }
        }
    };
    requestAnimationFrame(runner);
};
```
2. 타임 슬라이스 오토
```js
const looper = (n, f, ms = 5000, i = 0) => {
    let old = performance.now(),
        curr;
    const runner = curr => {
        while (i < n) {
            if (curr - old < ms) f(i++);
            else {
                old = performance.now();
                requestAnimationFrame(runner);
                break;
            }
        }
    };
    requestAnimationFrame(runner);
};
```
3. 웹 워커
```js
const backRun = (f, end, ...arg) => {
    const blob = new Blob([`onmessage =e=>postMessage((${f})(e.data));`], {
        type: 'text/javascript'
    });
    const url = URL.createObjectURL(blob);
    const worker = new Worker(url); //new Worker("some.js");
    worker.onmessage = e => end(e.data);
    worker.onerror = e => end(null);
    worker.postMessage(arg);
};
```

#### 논 블록킹
서브루틴이 즉시 플로우 제어권을 내놓는 것
```js
consta = 123;
looper(12, console.log);
backRun(v => v[0] + v[1], console.log, 3, 5);
console.log(a); //어쨌든콘솔은123부터출력
```

#### 싱크
서브루틴이 즉시 값을 반환함
```js
const double = v=>v*2;
console.log(double(2)); //4
```

#### 어싱크
서브루틴이 콜백을 통해 값을 반환함
```js
const double = (v, f)=>f(v*2);
double(2, console.log); //4
```

#### 요약
- 싱크 : 서브루틴이 즉시 값을 반환함
- 어싱크 : 서브루틴이 콜백을 통해 값을 반환함
- 블록 : 즉시 플로우제어권을 반환하지 않음
- 논블록 : 즉시 플로우제어권을 반환함
- 싱크&블록 : normalAPI, legacyAPI
- 싱크&논블록 : old API(img.complete)
- 어싱크&블록 : TRAP
- 어싱크&논블록 : modern API
