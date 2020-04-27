#### 바닐라
- [jQuery 바닐라로 구현](http://youmightnotneedjquery.com/)
- [You Dont Need Lodash Underscore](https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore)
- [You Dont Need Momentjs](https://github.com/you-dont-need/You-Dont-Need-Momentjs)
- [Slider](http://meandmax.github.io/lory/)
- [JS Animation](https://javascript.info/js-animation)

#### 배열 아이템 삭제
```js
const arr = [0, 1, 2]
arr.splice(1, 2)
console.log(arr) // [0]
```

#### 천단위 콤마 표시
```js
const price = 10000
price.toLocaleString() // 10,000
```

#### 정렬
```js
const arr = [0, 2, 3, 1]
arr.sort((a, b) => a - b)
console.log('오름차순', ...arr)
arr.sort((a, b) => b - a)
console.log('내름차순', ...arr)
```

#### SVG Parser
```js
const parseSVG = (template) => {
  var tmp = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  tmp.innerHTML = template
  return tmp.children[0]
}
```

#### Throttle
연속적으로 콜백 실행 요청되어도, 지정된 시간 주기로 콜백이 실행하는 기법
Throttle 기법을 사용하면 일정한 시간을 주기로 콜백을 실행 할 수 있다.
```js
/**
 * Throttle
 *
 * @param callback {Function} Callback function
 * @param _threshhold {Number} Throttle time
 * @return {Function} Event Listener
 */
const throttle = (callback, ms = 100) => {
  let timer = null
  let last = 0

  return function (...args) {
    const self = this
    const now = +new Date

    if (last && now < last + ms){
      clearTimeout(timer)
      timer = setTimeout(() => {
        last = now
        callback.apply(self, args)
      }, ms)
    } else {
      last = now
      callback.apply(self, args)
    }
  }
}
```
```js
const log = throttle(console.log, 1000)
setInterval(() => {
  console.log('------')
  log('1000')
  console.log('------')
}, 500)

// ------
// 1000
// ------
// ------
// ------
// ------
// 1000
// ------
```

#### Debounce
다수의 이벤트 실행을 방지하기 위해 하나로 그룹화하여 특정 시간이 지난 후 실행되는 기법
여러개의 이벤트가 과다하게 사용이 되었을 때 부하를 줄여주는 역할을 한다.
```js
/**
 * Debounce
 *
 * @param callback {Function} Callback function
 * @param _delay {Number} Delay time
 * @return {Function} Event Listener
 */
const debounce = (callback, ms) => {
  let timer = null

  return function(...args){
    const self = this
    clearTimeout(timer)
    timer = setTimeout(() => {
      callback.apply(self, args)
    }, ms)
  }
}
```
```js
const log = debounce(console.log, 100)
log('1')
log('2')
log('3')
log('4')
// output: 4
```

#### Text More
```css
.txt{
  width: 200px;
  max-height: 35px;
  line-height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.txt.show{display:block;max-height:none}
.txt.show + .more{display:none}
```
```html
<div class="wrap">
  <div class="txt">
    가나다라마가나다라마가나다라마가나다라마가나다라마가나다라마가나다라마가나다라마가나다라마가나다라마가나다라마
    가나다라마가나다라마가나다라마가나다라마가나다라마가나다라마가나다라마가나다라마가나다라마가나다라마가나다라마
  </div>
  <a href="#" class="more" onclick="toggle()">More</a>
</div>
```
```js
const toggle = () => {
  const txt = document.querySelector('.txt').classList
  if (txt.contains('show')) {
    txt.remove('show')
  } else {
    txt.add('show')
  }
}
```