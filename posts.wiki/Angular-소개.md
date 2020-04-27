### 프레임워크과 라이브러리
**프레임워크**를 사용하면 프레임워크에서 제공하는 설계 구조를 사용하며 그 구조에 어울리는 방식으로 코드를 작성해야 한다.

**라이브러리**는 컴포넌트와 API를 중심으로 기능을 제공하며 어떠한 코드라도 필요에 맞춰서 사용할 수 있다.

### Angular 살펴보기
#### SystemJS
- 모듈 로더
- ES6 모듈 문법 사용
- systemjs.config.js 파일은 SystemJS의 설정 파일
```html
<html>
<head>
  <script>
    System.import('app').catch((err) => console.error(err))
  </script>
</head>
<body>
  <app></app>
</body>
</html>
```

#### @NgModule : 모듈 선언
#### @Component
```js
@Component({
  selector: 'search-product',
  template: `
    <form>
      <div>
        <input id="prodToFind" #prod>
        <button (click)="findProduct(prod.value)">Find Product</button>
        Product name: {{ product.name }}
      </div>
    </form>
  `
})
class SearchComponent {
  @Input () productID : number;
  product : Product; // Product 클래스의 내용은 생략한다.
  findProduct (prodName : string) {
  }
}
class Product {
  id : number,
  name : string;
  description : string;
  bid : number;
  price : number;
}
```

#### Angular 기능 구현 방식
- 업무 로직 구현 : 클래스 사용
- 클래스 멤버 참조 : this 사용
- 컴포넌트 구현 : @Component
- 템플릿 정의 : template, templateUrl in @Component
- HTML 조작 : ngIf, NgFor 또는 @Directive
- 프로퍼티 바인딩 : `<input [value]="greeting">`
- 이벤트 : `<button (click)="onClickEvent()">Get Products</button>`
- 양방향 바인딩 : `<input [(ngModel)]="myComponentProperty">`
- 컴포넌트에 데이터 전달 : @Input
- 컴포넌트에서 데이터 받기 : @Output, EventEmitter
- HTTP
  - 요청 : Http 객체 주입 후 `this.http.get('/products')`
  - 응답 : subscribe 함수, `this.http.get('/products').subscribe(...)`