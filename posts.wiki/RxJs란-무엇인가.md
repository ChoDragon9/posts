#### RxJS란?
RxJS의 공식 사이트에서는 다음과 같이 정의하고 있다.
> RxJS를 Observable를 사용하여 비동기 및 이벤트 기반 프로그램을 작성하기 위한 라이브러리이다.

만약에 RxJS가 어렵다면 비동기 컬렉션 데이터를 다루는 라이브러리 정도로 생각하고 접근해보자.

#### RxJs시작하기
이벤트 핸들러를 만들고 그 핸들러를 addEventListener를 통해 등록하기만 하면 우리가 원하는 코드를 작성할 수 있다.
```js
const eventHandler = event => console.log(event.currentTarget);
document.addEventListener('click', eventHandler);
```

이 코드와 동일한 기능을 RxJS로 작성해 보자.
```js
const { fromEvent } = rxjs;
const click$ = fromEvent(document, 'click');
const observer = event => console.log(event.currentTarget);
click$.subscribe(observer);
```

이벤트 핸들러를 등록하는 것은 동일하지만 다른 점이 있다면 브라우저를 통해 전달되는 이벤트 정보를 Observable로 변환하는 작업을 추가로 한다는 점이다.