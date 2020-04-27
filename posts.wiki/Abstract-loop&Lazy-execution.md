#### 단순한 배열
단순한 배열을 루프인 경우는 간단히 이터레이션을 작성할 수 있다.
```js
{
    [Symbol.iterator]() {
        return this;
    },
    data: [1, 2, 3, 4],
    next() {
        return {
            done: this.data.length == 0,
            value: this.data.shift()
        };
    }
}
```

#### 추상 루프
- 다양한 구조의 루프와 무관하게 해당 값이나 상황의 개입만 하고 싶은 경우
- 제어문을 직접 사용할 수 없고 구조객체를 이용해 루프실행기를 별도로 구현