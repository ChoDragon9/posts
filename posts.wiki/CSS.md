### 기술정리
- [CSS 방법론](CSS-방법론)
- [CSS Flex](CSS-Flex)
- CSS Var
```html
<div class="box">00000000000</div>
<div class="text">00000000000</div>
```
```css
:root {
  --main-color: #ff0;
  --main-column: 2
}
.box {
   width: calc(100 / var(--main-column) * 1%);
  background-color: var(--main-color)
}
.text {
  color: var(--main-color)
}
@media (min-width: 1024px) {
  :root {
    --main-color: #f00;
    --main-column: 4
  }
}
```
- CSS Grid
  - [Float vs Flex vs Grid](Float-vs-Flex-vs-Grid)
  - http://www.usefulparadigm.com/2017/03/31/a-few-ways-to-make-a-grid-layout/
  - https://developer.mozilla.org/ko/docs/Web/CSS/CSS_Grid_Layout

### 아이디어
- [Kakao i simpson | 텍스트 애니메이션](https://www.youtube.com/watch?v=fzXwGQeVNI4)