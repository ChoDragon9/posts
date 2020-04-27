#### 참고사이트
- [RFC 1738](https://tools.ietf.org/html/rfc1738#section-5)
- [JS URL](https://url.spec.whatwg.org/)

```js
const isValidUrl = url => {
  try {
    new URL(url)
    return true
  } catch (e) {
    return false
  }
}

console.log(isValidUrl('http://www.naver.com')) // true
console.log(isValidUrl('http:/')) // false
```