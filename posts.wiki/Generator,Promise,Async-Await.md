### Generator
#### Breaking Block
- 프로그램을 중도에 멈췄다가 다시 실행할 수 있음
- yield를 이용하면 블록을 중간에 끊어주는 효과가 발생
```js
const infinity= (function*(){
  let i = 0;
  while(true) yield i++;
})();
console.log(infinity.next());
....
console.log(infinity.next());
```

### Promise
#### [Callback] Passive Async Control
콜백을 보낼 수는 있지만 언제 올지는 모른다.
```js
$.post(url. data, e=>{ // 언제 실행 되는 가 })
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

#### [Promise] Active Async Control
프로미스는 `then`을 호출해야 결과를 얻는 다.
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

#### Generator + Promise
```js
const profile = function*(end, r) {
    const userid = yield new Promise(res => $.post('member.php', {r}, res));
    let added = yield new Promise(res => $.post('detail.php', {userid}, res));
    added = added.split(",");
    end({userid, nick: added[0], thumb: added[1]});
};
```
```js
const executor = (gene, end, ...arg) => {
    const iter = gene(end, ...arg);
    const next = ({value, done}) => {
        if (!done) value.then(v => next(iter.next(v)));
    };
    next(iter.next());
};
```
```js
executor(profile, console.log, 123);
```

#### Async Await
`Generator + Promise` 조합을 사용하면 `then`을 호출해야 하기 때문에 실행기가 필요하다.
하지만 `async await`를 사용하면 `then` 호출을 대신해준다.
```js
const profile = async function(end, r) {
    const userid = await new Promise(res => $.post('member.php', {r}, res));
    let added = await new Promise(res => $.post('detail.php', {userid}, res));
    added = added.split(",");
    end({userid, nick: added[0], thumb: added[1]});
};
profile(console.log, 123);
```