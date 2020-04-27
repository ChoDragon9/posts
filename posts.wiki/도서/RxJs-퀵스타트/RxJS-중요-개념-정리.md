### Observable
시간을 축으로 연속적인 데이터를 저장하는 컬렉션을 표현한 객체이다. Observable은 데이터를 제공하는 소스를 Observer에게 전달한다.
오퍼레이터와 함께 RxJS의 핵심중의 핵심인 개념이다. 이를 스트림이라고 부른다.

Observable를 두가지 타입으로 나뉘다. 첫번째는 지금까지 우리가 사용해왔던 Observable인 Cold Observable과
두 번째는 하나의 Observable을 여러 Observable이 공유할 때 필요한 Hot Observable이다.

| 구분                  | Cold Observable                          | Hot Observable                                                     |
|-----------------------|------------------------------------------|--------------------------------------------------------------------|
| 데이터 주제 생성 시기 | Observable 내부                          | Observable 외부                                                    |
| Observer와의 관계     | 1:1                                      | 1:N                                                                |
| 데이터 영역           | Observer마다 독립적                      | N개의 Observer와 공유                                              |
| 데이터 전달 시점      | 구독하는 순간부터 데이터를 전달하기 시작 | 구독과 상관없이 데이터를 중간부터 전달                             |
| RxJS 객체             | Observable                               | fromEvent에 의해 생성된 Observable, ConnectableObservable, Subject |

### Subject
RxJS의 대표적인 Hot Observable로는 Subject가 있다. Subject는 Observable과 마찬가지로 rxjs 네임스페이스에 존재한다.
Subject는 위에서 언급한 Hot Observable과 같이 여러 Observable가 데이터를 공유한다.
뿐만 아니라 Subject는 Observable과 다르게 새로운 상태를 전달할 수 있다.

즉, Observable이 읽기 전용이라면 Subject는 읽기 쓰기가 가능한 Observable이다.

```js
const {Subject} = rxjs;
const subject = new Subject();

// observerA를 등록
subject.subscribe({
  next: (v) => console.log(`observerA: ${v}`);
});
// 데이터 1을 전달
subject.next(1);

// observerB를 등록
subject.subscribe({
  next: (v) => console.log(`observerB: ${v}`);
});
// 데이터 2을 전달
subject.next(2);

// 결과
// "observerA: 1"
// "observerA: 2"
// "observerB: 2"
```

```js
const {Subject, Observable} = rxjs;
const subject = new Subject();
const keyup$ = fromEvent(document.getElementById('search'), 'keyup')
let [user$, reset$] = subject.pipe(partition(query => query.trim().length > 0));
user$.subscribe({ /* observer */ });
reset$.subscribe({ /* observer */ });

keyup$.subscribe(subject);
```

위와 같이 될 수 있는 이유는 Subject가 Observable을 상속하고 Observer가 구현되어 있기 때문에 가능하다. Subject는 Observable이기도 하고 Observer이기도 하다.

Subject를 연결하는 작업은 사실 좀 번거로운 작업이다. 또한 RxJS에서는 가급적이면 Subject를 외부에서 단독으로 사용하지 않기를 권고한다.
Subject는 Observable과 다르게 데이터를 변경할 수 있기 때문에 가급적이면 Subject를 구현의 내부로 감추어서 사이드 이펙트를 최소화하는 방향을 권고한다. RxJS에서는 `하나의 데이터 소스를 함께 공유한다`는 의미로 share이라는 오퍼레이터를 제공한다.

```js
const keyup$ = formEvent(document.getElementById('search'), 'keyup')
  .pipe(
    debounceTime(300),
    map(event => event.target.value)
    distinctUntilChanged(), // 특수티가 입력된 경우에 나오지 않기 위해 중복 데이터 처리
    tap(v => console.log('from keyup$', v)),
    share()
  );
```

### Operator
Observable를 생성 및 조작하는 함수를 오퍼레이터라고 한다. 오퍼레이터는 Observable를 생성하기도 하고, 각각의 Observable을 연결하기도 한다.
또한 Observable을 분리하거나 합치기도 한다. 오퍼레이터는 현재의 Observable 인스턴스를 기반으로 항상 새로운 Observable 인스턴스를 반환한다.

#### 상태관리
RxJS에서는 데이터의 상태를 유지하기 위해서 scan 오퍼레이터를 제공한다.
scan은 reduce와 사용법이 비슷하여 혼란스러울 때가 많다. 하지만 둘은 비슷해 보이지만 그 결과와 쓰임새는 완전히 다르다.
reduce를 Observable이 완료되었을 때 한 번 데이터가 전달된다. 반면, scan은 데이터가 발생할 때마다 데이터가 발생한다.
scan은 데이터가 발생할 때마다 기존 상태를 유지 또는 관리하기 위한 용도로 사용된다.

```js
const {of} = rxjs;
const {reduce} = rxjs.operators;
of(10, 10, 20, 0, 50).pipe(
  reduce((acc, value, index) => {
    acc.sum += value;
    acc.ave = acc.sum / (index + 1);
    return acc;
  }, { sum: 0, ave: 0 })
).subscribe(v => console.log('reduce' , v));

// reduce { sum: 90, ave: 15 }
```

```js
const {of} = rxjs;
const {scan} = rxjs.operators;
of(10, 10, 20, 0, 50).pipe(
  scan((acc, value, index) => {
    acc.sum += value;
    acc.ave = acc.sum / (index + 1);
    return acc;
  }, { sum: 0, ave: 0 })
).subscribe(v => console.log('scan' , v));

// scan { sum: 0, ave: 0 }
// scan { sum: 10, ave: 5 }
// scan { sum: 20, ave: 6.666666666667 }
// scan { sum: 40, ave: 10 }
// scan { sum: 40, ave: 8 }
// scan { sum: 90, ave: 15 }
```

### Observer
Observable에 의해 전달된 데이터를 소비하는 주체이다. Observer는 next, error, complete 함수를 가진 객체를 가리킨다.
Observable에 의해 데이터가 전달될 때는 next 함수가 호출되고, 에러가 발생했을 때는 error 함수,
데이터를 전달이 완료되었을 때는 complete함수가 호출된다. Observer는 Observable과 subscribe 메소드를 통해 연결된다.

### Subscription
Observable.prototype.subscribe의 반환값이다. Subscription 객체는 자원의 해제를 담당한다.
등록된 Observable의 데이터를 더이상 전달받고 싶지 않을 경우 unsubscribe 메소드를 호출하여 자원을 해제한다.

### Scheduler
RxJS로 타이머 기반의 애니메이션을 구현하기 위해서는 스케줄러에 대한 이해가 필수적이다. 스케줄러의 사전적 의미로는 "앞으로 해야 할 모든 일을 조절하는 사람"이다. RxJS 스케줄러는 Observable의 데이터 전달 시점과 Observer가 데이터를 받는 시점을 조절하는 일을 한다.

자바스크립트는 기본적으로 하나의 메인 스레드에서 모든 작업이 실행된다. 이 말은 어떤 작업의 비용이 크거나 대기 시간이 긴 경우에는
애플리케이션 자체가 멈출 수 있다는 의미이기도 하다. 이렇게 RxJS에서도 단일 스레드에서 동기적으로 작업을 처리할 수 있지만 브라우저가
블록되는 문제를 해결하기 위해서 비동기적 처리 방식으로 데이터를 전달하거나 받는다. 이런 일을 해주는 것이 바로 RxJS 스케줄러이다.

RxJS에서는 `구독의 시점을 제어`할 수 있는 subscribeOn 오퍼레이터와 `데이터 처리의 시점을 제어`할 수 있도록 observeOn 오퍼레이터를 제공한다. subscribeOn와 observeOn을 asyncScheduler과 사용하면 바로 제어권을 메인 스레드에게 넘길 수 있다.

```js
const {of, asyncScheduler} = rxjs;
const {tap, observeOn, subscribeOn} = rxjs.operators;
const obs$ = of('A', 'B')
  .pipe(
    tap(v => console.log(v, '데이터 처리1')),
    tap(v => console.log(v, '데이터 처리2')),
    observeOn(asyncScheduler),
    subscribeOn(asyncScheduler)
  );

const start = new Date().getTime();
console.log('subscribe');
obs$.subscribe(v => console.log('observer received', v));
console.log(`subscribe 후 ${new Date().getTime() - start}ms`);

// 결과
// subscribe
// subscribe 후 5ms
// A 데이터 처리1
// A 데이터 처리2
// B 데이터 처리1
// B 데이터 처리2
// observer received A
// observer received B
```

#### RxJS 개발 방법
RxJS를 사용하여 개발할 경우 프로세스는 대부분 다음과 같은 과정을 거친다.
- 첫째. 데이터 소스를 Observable로 변경한다.
- 둘째. 오퍼레이터를 통해 데이터를 변경하거나 추출한다. 또는 여러 개의 Observable을 하나의 Observable로 합치거나 하나의
Observable을 여러 개의 Observable로 만든다.
- 셋째. 원하는 데이터를 받아 처리하는 Observer를 만든다.
- 넷째. Observable의 subscribe를 통해 Observer를 등록한다.
- 다섯째. Observable 구독을 정지하고 자원을 해지한다.