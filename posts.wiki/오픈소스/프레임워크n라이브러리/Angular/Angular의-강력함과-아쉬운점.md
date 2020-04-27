### 글의 목적
서비스 개발 시 Angular를 사용 중이다. AngularJs를 사용했던 경험이 있어 서비스 일원이 됐을 때 Angular에 대한 반감이 있었다. 하지만 최근 들어 Angular는 Vue 못지않게 강력하다는 것을 느끼고 있다.

내가 강력하다고 느끼는 것은 두 가지다. AngularJs부터 사용된 Angular의 아키텍처와 TypeScript 사용 강제성이다. Angular의 아키텍처에서는 코드의 볼륨을 줄이는 도구들이 제공된다. 적절하게 사용된다면 작은 단위의 코드를 만들어 이해하기 쉬운 코드를 작성 가능하다. TypeScript는 컴파일 시점에 코드의 안정성을 보장해준다. 코딩할 때마다 TypeScript가 안정성을 보장해주기 때문에 비서를 둔 듯한 느낌이 들었다.

하지만 강력함 속에도 아쉬운 점 하나 있다. AngularJs부터 사용된 Service이다. Service는 Angular에서도 메타몽(포캣몬)같은 도구이다. 무엇이든 될 수 있으므로 오용되기 쉽다. AngularJs, Angular를 사용하는 프로젝트를 했을 때 항상 Service에서 오용이 발생하였다.

그래서 이 글에서는 지금까지 느꼈던 Angular의 강력함과 아쉬운 점을 정리해봤다.

### 목차
- TypeScript의 강력함
- Angular의 강력한 Component의 볼륨을 줄여주는 도구들
  - 일단 Component가 무엇인가
  - 탬플릿만 사용되는 로직은 Pipe로 만들자
  - DOM의 동작은 Directive로 만들자
  - 그래도 Component가 커지면 Service로 분리하자
- Angular의 메타몽인 Service
  - 왜 오용이 발생되는 가
  - 오용을 예방하려면 어떻게 해야 할까
- [요약] Component 작업 시 체크 포인트

### TypeScript의 강력함
TypeScript는 사용한 지 10개월 정도 됐는데, 초기에 서비스 투입이 됐을 때 TypeScript를 어렵게만 느껴졌다. Javascript와 다르게 타입을 정의해야 하고 interface, type, enum 을 언제 사용해야 하는지 익숙하지 않았기 때문이다.

요새 들어서는 TypeScript 사용은 필수라고 생각하고 있다. 나는 TypeScript를 비유적으로 비서라는 표현을 사용한다. 나의 기억과 시간의 한계를 TypeScript가 해결해주고 있기 때문이다. 내가 느끼기엔 두 가지의 역할을 잘해주고 있다고 생각한다.

**첫 번째**는 기억의 한계를 해결해주는 것은 상세한 코드 스팩을 기록할 수 있다. 예를 들어 메소드의 인자의 값이 어떤 타입을 사용하는지 기록할 수 있다. 복잡한 기능을 구현할수록 인자의 값을 복잡해진다. 인자의 타입은 string, number, boolean뿐만 아니라 interface, type, enum을 사용했을 때도 굉장히 좋은 결과를 가져다준다.

Javascript로 작성했을 때는 코드를 분석해야 인자의 자세한 정보를 알 수 있다. 함수 내부로직을 분석하면 movieTicket는 movie, startTime, endTime, count, seats, watched의 프로퍼티를 가지는 것을 알 수 있다.
```js
const movieInfo = movieTicket => {
  const {movie, startTime, endTime} = movieTicket
  return `${movie}(${startTime}~${endTime})`
}

const ticketInfo = movieTicket => {
  const {count, seats, watched} = movieTicket
  return `수량: ${count}, 좌석: ${seats.join(',')}
  관련 여부: ${watched ? '관람' : '미관람'}`
}
```

하지만 TypeScript를 사용하면 인자의 타입으로 인자의 자세한 정보를 알 수 있다.
```ts
interface MovieTicket {
  movie: string // 관람 영화명
  count: number // 티켓 수량
  startTime: string // 상영 시작 시간
  endTime: string // 상영 종료 시간
  seats: string[] // 좌석 정보
  watched: boolean // 관람 여부
}

const movieInfo = (movieTicket: MovieTicket) => {
  const {movie, startTime, endTime} = movieTicket
  return `${movie}(${startTime}~${endTime})`
}

const ticketInfo = (movieTicket: MovieTicket) => {
  const {count, seats, watched} = movieTicket
  return `수량: ${count}, 좌석: ${seats.join(',')}
  관련 여부: ${watched ? '관람' : '미관람'}`
}
```
메소드 인자까지 어딘가에 기록해둘 수 있는 게 멋지지 않은 가!!

**두 번째** 역할은 시간을 절약해주는 안정성 보장이다. 내가 코딩을 할 때마다 내 코드의 안정성을 보장해준다. 잘못된 값을 사용했을 때 브라우저에 띄우기 전에 컴파일 시점에 미리 알려준다.

버그는 늦게 발견될수록 시간 비용이 많이 든다. 가장 높은 비용을 발생하는 게 QA 기간에 발견되는 것이다. 개발 기간에 발견되는 게 가장 저렴한 비용이다.

TypeScript는 만약에 없는 프로퍼티를 사용하면 이렇게 잔소리를 해준다.
```ts
interface MovieTicket {
  movie: string // 관람 영화명
  count: number // 티켓 수량
  startTime: string // 상영 시작 시간
  endTime: string // 상영 종료 시간
  seats: string[] // 좌석 정보
  watched: boolean // 관람 여부
}

const movieInfo = (movieTicket: MovieTicket) => {
  const {movie, start, end} = movieTicket
  return `${movie}(${startTime}~${endTime})`
}
```
```
- error TS2339: Property 'start' does not exist on type 'MovieTicket'.
- error TS2339: Property 'end' does not exist on type 'MovieTicket'.
```
내가 잘못하고 있다는 것을 알려주는 게 정말 멋지지 않은 가!!

### Angular의 강력한 Component의 볼륨을 줄여주는 도구들
#### 일단 Component가 무엇인가
Component는 뷰와 데이터 로직을 재사용과 격리하기 위한 단위이다. Angular에서는 `@Component`를 통해 정의한다.
```ts
@Component({
  selector: 'hello-component',
  template: '<h1>Hello</h1>'
})
class HelloComponent {}
```
```html
<hello-component></hello-component>
```

#### 탬플릿만 사용되는 로직은 Pipe로 만들자
간혹 탬플릿에서만 사용되는 로직들이 있다. Angular에서는 탬플릿에서만 사용되는 로직은 Pipe로 정의할 수 있게 제공한다.

Date 객체를 년월일로 UI에 표시하는 것을 가정하겠다. Date를 년월일로 표시하는 이유는 시각적인 표현을 위한 것이다. 이런 상황일 때 Pipe를 사용한다.
```ts
Date => 2019-07-10
```

Pipe는 `@Pipe`로 정의한다. transform 메소드를 통해 변환을 한다.
```ts
@Pipe({name: 'dateFormat'})
class DateFormatPipe implements PipeTransform {
  transform(date: Date): string {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    const longMonth = `${month < 10 ? 0 : ''}${month}`
    const longDay = `${day < 10 ? 0 : ''}${day}`
    return `${year}-${longMonth}-${longDay}`
  }
}
```
Pipe 사용은 Component에서 Pipe Operator(`|`)를 통해 사용한다. 
```ts
@Component({
  selector: 'hello-component',
  template: '<div>{{today | dateFormat}}</div>',
})
class HelloComponent {
  today: Date = new Date()
}
```
```
2019-07-10
```

#### DOM의 동작은 Directive로 만들자
Directive는 DOM의 조작을 캡슐화하기 위한 도구이다. 자주 사용되는 로직은 DOM 이벤트의 로직이 중복적으로 사용될 때이다. Directive는 `@Directive`로 정의한다.

저장 버튼을 연속으로 눌렀을 때 Debounce를 통해 한 번만 실행되게 하는 기능이 있는 것을 가정하겠다. Attribute 이름은 debounce-submit이고, 이벤트는 mySubmit에 전달한다.
```ts
@Directive({
  selector: '[debounce-submit]',
  outputs: ['mySubmit'],
  host: {
    '(click)': 'onClick($event)'
  }
})
export class DebounceSubmitDirective {
  timer = null
  mySubmit = new EventEmitter();
  onClick (event) {
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.mySubmit.emit(event)
    }, 250)
  }
}
```
탬플릿에서는 이렇게 사용된다. 버튼에 debounce-submit를 정의하고, mySubmit로 이벤트를 받는 다.
```ts
@Component({
  selector: 'app-root',
  template: `<div>
    <input 
      type="submit"
      value="저장" 
      debounce-submit
      (mySubmit)="onSubmit()">
  </div>`,
})
export class AppComponent {
  onSubmit () {
    console.log('Submit')
  }
}
```
저장 버튼을 연속적으로 클릭해도 한 번만 실행되는 기능을 만들었다. 중복되는 DOM 이벤트의 코드가 있다면 Directive로 중복을 해결할 수 있다.

#### 그래도 Component가 커지면 Service로 분리하자
아무리 Component를 잘게 쪼개고, Pipe와 Directive로 분리해도 Component의 볼륨이 커질 때가 있다. 이런 상황일 때는 Service를 통해 코드를 분리한다.

Service는 싱글톤 객체이다. 독립적인 상태와 메소드를 가질 수 있다. 대체로 API 통신 부분을 분리할 때 사용한다. Service는 `@Injectable`를 통해 정의한다.
```ts
@Injectable()
export class MyService {
  constructor(private http: HttpClient) { }
  fetchConfig() {
    return this.http.get('/path/to/config')
  }
}
```

Component에서는 의존성 주입받아 사용한다. Service를 사용함으로써 Component의 Class에 정의되는 코드의 볼륨을 줄일 수 있다.
```ts
@Component({})
export class AppComponent {
  constructor(private myService: MyService) {}
  onClick () {
    this.myService.fetchConfig()
  }
}
```

### Angular의 메타몽인 Service
#### 왜 오용이 발생되는 가
Service는 Angular의 다른 요소들에 비해 명확한 역할이 정의되지 않는다. `@Component`, `@Pipe`, `@Directive`들은 각각의 역할을 명확히 알 수 있다. 하지만 Service는 `@Injectable`로 정의된다. 어딘가에 주입 가능하다는 것 외에는 구체적인 역할을 알 수 없다.

Service를 정의한 코드이다. Service라는 것 외에 이 코드의 역할을 바로 알 수 있는가.
```ts
@Injectable()
export class MyService {
  constructor() {}
}
```

구체적인 역할을 알 수 없으므로 다양한 역할을 하게 된다. 예를 들면 API 통신, 상태관리, 헬퍼 등 다양한 역할을 담당하게 된다. Service는 Suffix로 Service를 컨벤션으로 사용한다. 네이밍 컨벤션 또한 구체적인 역할을 기술하고 있지 않은 다. 그래서 Component의 볼륨을 줄이기 위한 Service를 만들면 대체로 Service의 볼륨을 굉장히 커지게 되는 것을 자주 봤다.

이 문제는 AngularJs를 사용하는 프로젝트와 Angular를 사용하는 프로젝트 모두 발견된 이슈이다.

#### 오용을 예방하려면 어떻게 해야 할까
Service의 역할을 폴더로 구분했던 경험이 있다. 폴더로 구분해도 여전히 Service라는 Suffix 때문에 오용하는 사례가 발생했었다.
폴더의 역할을 통해 내부적인 파일의 역할을 구분하는 것까지 잘되리라 기대하기는 힘든 것이다.

결국, Service의 Suffix 컨벤션을 제거하고 새로운 컨벤션을 만들어서 해결했다.

Service는 세 가지 역할을 수행하고 있다. API 통신, 상태관리, 헬퍼 이렇게 세 가지의 역할을 수행한다. 각각 폴더 위치를 다르지만 네이밍을 변경했다.

각 역할의 Suffix를 이렇게 변경된다.
```
- API 통신: API
- 상태관리: Store
- 헬퍼: Helper
```

기존 Service 컨벤션과 비교하면 이렇다.
```
- API 통신: ConfigService => ConfigApi
- 상태관리: DashboardService => DashboardStore
- 헬퍼: DateService => DateHelper
```

네이밍을 변경함으로써 Service의 역할이 기술된다. 역할이 기술되기 때문에 내부 코드를 작성할 때 해당 코드의 역할과 일치하는지 쉽게 알 수 있게 되었다.

### [요약] Component 작업 시 체크 포인트
- 탬플릿에만 사용되는 로직인가?
  - Pipe로 분리
- DOM 조작이 중복되는가?
  - Directive로 중복 해결
- Component의 볼륨이 큰가?
  - Service로 분리하기
- Service에서 API 통신 역할을 하는가?
  - ConfigApi 형태로 Service 분리
- Service에서 상태관리 역할을 하는가?
  - ConfigStore 형태로 Service 분리
- Service에서 유틸리티, 헬퍼 역할을 하는가?
  - ConfigHelper 형태로 Service 분리

### 끝