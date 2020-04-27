이 글은 코드리뷰하며 코멘트를 줬던 사항이다. 아래 3가지 사례에 대한 글이다.
- [상태 전파 코드 위치](#상태-전파-코드-위치)
- [구독 해지 방법](#구독-해지-방법)
- [상태 의존성 관리](#상태-의존성-관리)

RxJs의 기본동작은 Subject에 Observer를 등록하고 사용하는 것이다.
```js
const {Subject} = rxjs;
const subject = new Subject();

subject.subscribe((v) => console.log(`observer: ${v}`));

subject.next(1);
subject.next(2);
```
위 실행된 결과는 아래와 같다.
```
$ "observer: 1"
$ "observer: 2"
```

### 상태 전파 코드 위치
이 부분이 Subject를 통해 상태 전파하는 코드이다.
```
subject.next(1);
subject.next(2);
```
이 부분이 Subject에 Observer를 등록하여 구독하는 코드이다.
```
subject.subscribe((v) => console.log(`observer: ${v}`));
```

#### [Question] 그럼 상태 전파 코드 위치는?
1. 컴포넌트 파일
2. 상태관리 파일
3. 컴포넌트, 상태관리 파일 모두
4. 마음속

#### [Answer] 정답은 "2. 상태관리 파일" 이다.
- MVC의 Model 역할
- Flux의 Store 역할
- 데이터 관리 파일에 위치해야 함

#### Not Cool!
상태관리 기능을 Service를 통해서 하고 있다. 그런데 Component에서 상태 전파를 하는 코드이다. 
```js
@Injectable()
export class MyService {
  data$ = new BehaviorSubject()
}
```
```js
@Component()
export class MyComponent {
  constructor (private service: MyService) {}
  
  onChange () {
    this.service.data$.next('changed')
  }
}
```

#### Cool!
정상적인 상태전파 코드의 위치는 Service에 정의되야 한다.
```js
@Injectable()
export class MyService {
  data$ = new BehaviorSubject()
  
  changeData () {
    this.data$.next('changed')
  }
}
```
```js
@Component()
export class MyComponent {
  constructor (private service: MyService) {}
  
  onChange () {
    this.service.changeData()
  }
}
```

### 구독 해지 방법
구독 해지에 대한 사례이다. 이 코드는 Observer를 등록한 코드이다.
```
subject.subscribe((v) => console.log(`observer: ${v}`));
```
이렇게 사용한 코드의 사례를 봤다. pipe를 통해 Component가 삭제됬을 때 Observer가 실행안되게 하는 것이다.
```
ngOnInit () {
  subject
    .pipe(takeWhile(() => this.isSubscribe))
    .subscribe((v) => console.log(`observer: ${v}`));
}
ngDestory () {
  this.isSubscribe = false
}
```
이 코드는 페이지 이탈 시에도 계속 구독중이다. 그리고 페이지 재진입시, 추가적으로 구독하게 된다.

#### RxJs는 DOM Event 구독해지와 동일한 디자인 패턴을 사용한다.
```js
const elem = document.querySelector('div')
const listener = () => console.log('Click!')
```
##### 등록
```js
elem.addEventListener('click', listener)
```
##### 미사용 시 해지
```js
elem.removeEventListener('click', listener)
```

#### Subject 구독해지는 이렇게 한다.
```js
const {Subject} = rxjs;
const subject = new Subject();
```
##### 등록
```js
const subscription = subject.subscribe((v) => {
  console.log(`observer: ${v}`)
});
```
##### 미사용 시 해지
```js
subscription.unsubscribe()
```

전체적인 코드의 예시를 이렇게 작성할 수 있다.
```js
const {Subject} = rxjs;
const subject = new Subject();

const subscription = subject.subscribe((v) => {
  console.log(`observer: ${v}`)
});

subject.next(1);
subscription.unsubscribe()

subject.next(2);
```
```
$ "observer: 1"
$ "observer: 2"
```

### 상태 의존성 관리
- 상태 의존성은 상태간의 의존성이 생김에 따른 리엑티브 처리를 말한다.
- 예
  - 달력의 시작날짜와 종료날짜
  - 범위를 담은 배열

이런 형태의 코드가 있다고 가정하겠다.
```js
startDate$ = new BehaviorSubject()
endDate$ = new BehaviorSubject()
range$ = new BehaviorSubject()
```
```js
changeDate () {
  const startDate = '2019-03-01'
  const endDate = '2019-03-03'
  
  startDate$.next(startDate)
  endDate$.next(endDate)
  range$.next(this.range(startDate, endDate))
}
```

#### 수동으로 전파!
- 수동으로 전파할 경우, 모든 코드에 따라다님
- 하나라도 미정의시 오류

```js
changeDate () {
  const startDate = '2019-03-01'
  const endDate = '2019-03-03'
  
  startDate$.next(startDate)
  endDate$.next(endDate)
  // Not Cool!
  range$.next(this.range(startDate, endDate))
}
```

#### RxJs의 자동 전파
- combineLatest 사용으로 **상태 의존성 관리**

```js
startDate$ = new BehaviorSubject()
endDate$ = new BehaviorSubject()
range$ = combineLatest(this.startDate$, this.endDate$)
  .pipe(
    map(([startDate, endDate]) => {
      return this.range(startDate, endDate)
    })
  )
```
```js
changeDate () {
  const startDate = '2019-03-01'
  const endDate = '2019-03-03'
  
  startDate$.next(startDate)
  endDate$.next(endDate)
}
```

### 끝