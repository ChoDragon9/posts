### Angular 애플리케이션의 구성 요소
#### 모듈(Module)
모듈은 관련된 컴포넌트나 서비스, 디렉티브 등을 편하게 사용하기 위해 하나로 모은 것이다.
애플리케이션을 기능 단위로 구분하기 위해 사용한다. 모듈은 클래스에 `@NgModule` 어노테이션을 붙여서 지정하고, 이 어노테이션 안에서 모듈 내용을 설정한다.
```js
@NgModule({
  imports: [BrowserModule],
  declarations: [HelloWorldComponent, HighlightDirective],
  bootstrap: [HelloWorldComponent] // 루트 컴포넌트로 렌더링 된다.
})
export class AppModule { }
```

#### 컴포넌트(Component)
컴포넌트는 Angular 애플리케이션을 구성하는 기본 요소이며, 화면을 정의하는 뷰와 컴포넌트의 동작을 정의하는 클래스로 구성된다.
컴포너트는 `@Component` 어노테이션을 붙여서 선언한다.
```js
@Component({
  selector: 'app-component',
  template: '<h1>Hello</h1>'
})
class HelloComponent {}
```

#### 디렉티브(Directive)
Angular의 디렉티브는 DOM의 동작을 추가할 수 있다. `@Directive` 어노테이션을 클래스에 붙여서 선언한다.
```js
@Directive({
  selector: 'input[log-directive]',
  host: {
    '(input)': 'onInput($event)'
  }
})
class LogDirective {
  onInput (event) {
    console.log(event.target.value)
  }
}
```
```html
<input type="text" log-directive>
```

#### 데이터 바인딩 기초
```html
// Property Value
<h1>Hello {{ name }}!!</h1>

// Property
<span [hidden]="isValid">The field is required</span>

// Event
<button (click)="placeBid()">Place Bid</button>

// Element Property
<input #title type="text">
<span>{{ title.value }}</span>
```