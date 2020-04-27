## Flex Basic
### Flex는 flex를 사용한 자식들에게 비율 크기를 할당해줍니다.
```html
<div style="display: flex">
  <div style="flex: 1">flex(1)</div>
  <div style="flex: 3">flex(3)</div>
  <div style="flex: 2">flex(2)</div>
</div>
```
![](https://user-images.githubusercontent.com/17817719/56206261-eb3c6a00-6086-11e9-9e1d-fd113b1bbf05.png)

### 헤더는 이렇게 작성가능합니다.
```html
<div style="display: flex">
  <div style="width: 200px">로고</div>
  <nav style="flex: 1">
    <ul>
      <li>메뉴1</li>
      <li>메뉴2</li>
      <li>메뉴3</li>
      <li>메뉴4</li>
      <li>메뉴5</li>
    </ul>
  </nav>
</div>
```
![](https://user-images.githubusercontent.com/17817719/56206277-f42d3b80-6086-11e9-9bec-eadad63303ab.png)

### 가로 정렬
```html
<ul style="display: flex; flex-direction: row">
  <li style="flex: 1">메뉴1</li>
  <li style="flex: 1">메뉴2</li>
  <li style="flex: 1">메뉴3</li>
  <li style="flex: 1">메뉴4</li>
  <li style="flex: 1">메뉴5</li>
</ul>
```
![](https://user-images.githubusercontent.com/17817719/56206286-f8595900-6086-11e9-89c5-b6bd7b1681b5.png)

### 콘텐츠들을 중앙 기준으로 모을 수 있어요
```html
<div style="display: flex; justify-content: center">
  <button>Button1</button>
  <button>Button2</button>
  <button>Button3</button>
</div>
```
![](https://user-images.githubusercontent.com/17817719/56206294-fd1e0d00-6086-11e9-8736-8935be5310e7.png)

### 콘텐츠들을 오른쪽 기준으로 모을 수 있어요
```html
<div style="display: flex; justify-content: flex-end">
  <button>Button1</button>
  <button>Button2</button>
  <button>Button3</button>
</div>
```
![](https://user-images.githubusercontent.com/17817719/56206405-48d0b680-6087-11e9-98e9-92ef0c42b699.png)

### 콘텐츠들을 왼쪽 기준으로 모을 수 있어요
```html
<div style="display: flex; justify-content: flex-start">
  <button>Button1</button>
  <button>Button2</button>
  <button>Button3</button>
</div>
```
![](https://user-images.githubusercontent.com/17817719/56206307-06a77500-6087-11e9-96aa-17360bacc616.png)

### 콘텐츠들을 각자 동일한 여백으로 정렬할 수 있어요
```html
<div style="display: flex; justify-content: space-around">
  <button>Button1</button>
  <button>Button2</button>
  <button>Button3</button>
</div>
```
![](https://user-images.githubusercontent.com/17817719/56206318-0d35ec80-6087-11e9-8722-6b6da952f9bc.png)

### 콘텐츠 양끝에 붙이고, 남은 여백을 기준으로 정렬할 수 있어요
```html
<div style="display: flex; justify-content: space-between">
  <button>Button1</button>
  <button>Button2</button>
  <button>Button3</button>
</div>
```
![](https://user-images.githubusercontent.com/17817719/56206330-132bcd80-6087-11e9-84d8-e77677137a57.png)

### 콘텐츠 세로 전체를 차지할 수 있어요
```html
<div style="display: flex; align-items: stretch; height: 200px;">
  <button>Button1</button>
  <button>Button2</button>
  <button>Button3</button>
</div>
```
![](https://user-images.githubusercontent.com/17817719/56206336-1757eb00-6087-11e9-9ab5-a94de43f99b6.png)

## Flex 레이아웃 코딩
### 헤더 코딩하기
```html
<header style="display: flex; max-width: 1000px">
  <figure style="width: 150px">
    <img
      src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
      style="width: 100%">
  </figure>
  <nav style="flex: 1">
    <ul style="display: flex; justify-content: space-between">
      <li><a href="">메뉴1</a></li>
      <li><a href="">메뉴2</a></li>
      <li><a href="">메뉴3</a></li>
      <li><a href="">메뉴4</a></li>
      <li><a href="">메뉴5</a></li>
    </ul>
  </nav>
</header>
```
#### 1024px
![](https://user-images.githubusercontent.com/17817719/56207715-6c493080-608a-11e9-8f90-2f9437552326.png)

#### 480px
![](https://user-images.githubusercontent.com/17817719/56207718-70754e00-608a-11e9-8d84-e6a775bd7e4f.png)

### 리스트 코딩
```css
.wrapper {display: flex; justify-content: center}
.list {width: 1140px; display: flex; justify-content: space-between}
.list__item {width: 150px; text-align: center}
```
```html
<div class="wrapper">
  <div class="list">
    <figure class="list__item">
      <img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png" style="width: 100%">
      <figcaption>아이템1</figcaption>
    </figure>
    <figure class="list__item">
      <img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png" style="width: 100%">
      <figcaption>아이템2</figcaption>
    </figure>
    <figure class="list__item">
      <img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png" style="width: 100%">
      <figcaption>아이템3</figcaption>
    </figure>
    <figure class="list__item">
      <img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png" style="width: 100%">
      <figcaption>아이템4</figcaption>
    </figure>
  </div>
</div>
```
![](https://user-images.githubusercontent.com/17817719/56209498-afa59e00-608e-11e9-9fe7-7bc3994a38f0.png)

![](https://user-images.githubusercontent.com/17817719/56209499-b03e3480-608e-11e9-82ec-513db601edcb.png)
