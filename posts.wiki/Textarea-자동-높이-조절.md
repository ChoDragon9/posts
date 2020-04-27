### 높이 값으로 사용하는 방법
```js
const newLine = textarea.value.match(/\r\n|\r|\n/g);
const newLineLength = newLine ? newLine.length + 1 : 1;
const height = `${20 * newLineLength}px`;
```

### CSS 를 사용하는 방법
```css
.wrap {
  width: 200px;
  position: relative;
  background-color: #f9f9f9;
}

.wrap textarea {
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 0;
}

.wrap .shadow {
  visibility: hidden;
  opacity: 0;
  word-break: break-all;
}

.wrap textarea,
.wrap .shadow {
  font-size: 20px;
  line-height: 120%;
}
```
```html
<div class="wrap">
  <textarea onkeyup="onChange(this)"></textarea>
  <div class="shadow">&nbsp;</div>
</div>
```
```js
function onChange({value}) {
  document.querySelector('.shadow').innerHTML = `&nbsp;${value}`;
}
```