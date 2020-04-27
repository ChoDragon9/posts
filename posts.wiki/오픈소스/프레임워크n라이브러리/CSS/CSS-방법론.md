## SMACSS(Scalable and Modular Architecture for CSS)
### 정의
- CSS에 대한 확장형 모듈시 구조
- CSS의 프레임워크가 아닌 하나의 스타일 가이드

### 사용목적
- Class명을 통한 예측
- 재사용
- 쉬운 유지보수
- 확장 가능

### 핵심 규칙 분류
#### Base
- 기본 스타일(Reset, Default, Variables, Mixins)
- 기본 스타일에는 !important를 쓸 필요가 없다.
```css
* {margin:0; padding:0}
ul, ol {list-style:none}
```

#### Layout
- 레이아웃과 관련된 스타일 정의
- class명에 Prefix `l-`를 붙인다.
```css
.l-content { width: 600px; margin-right: 10px }
.l-aside { width: 20% }
```

#### Module(Components)
- 모듈 관련 스타일
- 스타일 재사용을 위한 요소
- Block, Element, Module
- 재사용을 위한 id셀렉터와 element를 사용하지 않는 다.
- 만약, element 셀렉터를 사용해야 한다면, `.box > span` 처럼 child 셀렉터를 사용한다.
```css
.box {}
.box > span {}
```

#### State
- 상태를 나타내는 스타일
- Hidden, expend, active, hover 등의 상태에서 사용
- class명에 Prefix `is-`를 붙여서 사용
```css
.btn {}
.btn.is-active {}
```
```html
<button class="btn is-active">버튼</button>
```

#### Theme
- 사이트 전반적 look and feel 제어
- 색상이나 이미지를 불변하는 스타일과 분리, 기존 스타일을 재선언하여 사용할 수 있다.
- 적용범위가 넓은 테마는 `theme-`를 붙여서 사용한다.
```css
.theme-color {}
```

## BEM(Block, Element, Modifier)
### 작업규칙
- 가능한 명확하게 작성
- 소문자, 숫자 조합
- 여러단어의 조합은 하이픈(-)으로 연결

### 블록
- 재사용 가능한 독립적인 페이지 구성요소
- 형태(color, size)가 아닌 목적(gnb, btn)에 맞게 결정해야 한다.
- 블록은 환경에 영향을 받지 않아야 한다. 즉, 여백이나 위치를 설정하면 안된다.
- 태그, id 선택자를 사용하면 안된다.
- 블록은 서로 중첩해서 작성 할 수 있다.
```css
.header {}
.menu {}
.search-form {}
```

### 요소
- 블록안에서 특정 기능을 담당하는 부분
- block__element 형태로 사용(더블 언더바)
- 형태(color, size)가 아닌 목적(item, text, title)에 맞게 결정해야 한다.
- 요소는 중첩해서 작성할 수 있다.
- 요소는 해당 블록에서만 사용할 수 있다.
```css
.header__title {}
.menu__item {}
.search-form__input {}
```

### 수식어
- 블록, 요소의 형태와 상태를 정의한다.
- block__element--modifier, block--modifier 형태로 사용(더블 하이픈)
- 수식어의 불리언 타입과 키-벨류 타입이 있다.
- 블리언 타입 : 수식어가 있으면 값이 true라고 가정한다. form__buttom--disabled
- 키-벨류 타입 : 키, 벨류를 하이픈으로 연결하여 표시한다. color-red, theme-ocean
- 수식어는 단독으로 사용할 수 없다. 즉 기본 블록과 요소에 추가하여 사용해야 한다.
```css
.header__title--color-red {}
.menu__item--disabled {}
.search-form__input--focus {}
```

### 혼합사용
- block1, block2__element 형태로 사용 할 수 있다.
- block2__element에 여백이나 위치를 지정하고 block1은 독립적으로 유지할 수 있다.
```html
<div class="header">
  <div class="search-form header__search-form"></div>
</div>
```

## OOCSS(Object-Oriented CSS)
### 2가지 기본원칙
- 구조와 모양을 분리 : 반복적인 시각적 기능을 별로의 스킨으로 정의하여 다양한 객체와 혼합하여 중복 코드없이 시각적 다양성을 표현할 수 있다.
```css
.button {}
.box {}
.widget {}
.skin {}
```
- 콘테이너와 콘텐츠의 분리 : 스타일을 정의할 때 위치에 의존적인 스타일을 사용하지 않는다. 사물의 모양은 어디에 위치 하던지 동일하게 보인다.
```css
.header {}
.header-inside {}
```

### 네이밍방법
- 가능한 짧고 간결하게 작성한다.
- 동작과 형태가 예상 가능하도록 명확하게 작성한다.
- 어떻게 생겼는지 보다는 어떤 목적인지 알 수 있도록 의미있게 작성한다.
- 지나치게 구체적 이지 않게 일반적으로 사용가능 하도록 작성한다.
#### 잘못된 사용
```css
.twitterbtn {
  border:3px solid #000;
  padding:10px 20px;
  color:#fff;
  border-radius:10px;
  background:red;
}
 
.facebookbtn {
  border:3px solid #000;
  padding:10px 20px;
  color:#fff;
  border-radius:10px;
  background:gray;
}
```
#### 옳바른 사용
```css
.btnbase {
  border:3px solid #000;
  padding:10px 20px;
  color:#fff;
  border-radius:10px;
}
 
.twitter {
  background:red;
}
.facebook {
  background:gray;
}
```