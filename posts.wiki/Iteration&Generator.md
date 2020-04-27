#### Interface
1. 인터페이스란 사양에 맞는 값과 연결된 속성키의 셋트
2. 어떤 Object라도 인터페이스의 정의를 충족시킬 수 있다.
3. 하나의 Object는 여러개의 인터페이스를 충족시킬 수 있다.

> Interface Test
1. test라는 키를 갖고
2. 값으로 문자열인자를 1개를 받아 불린결과를 반환하는 함수가 온다.
```js
{
  test(str){ return true; }
}
```

#### Iterator Interface
1. next라는 키를 갖고
2. 값으로 인자를 받지 않고 IteratorResultObject를 반환하는 함수가 온다.
3. IteratorResultObject는 value와 done이라는 키를 갖고 있다.
4. 이 중 done은 계속 반복할 수 있을 지 없을지에 따라 불린값을 반환한다.
```js
{
  data: [1,2,3,4],
  next(){
    return {
      done: this.data.length == 0,
      value: this.data.pop()
    }
  }
}
```

#### Iterable Interface
1. `Symbol.iterator`라는 키를 갖고
2. 값으로 인자를 받지 않고 `Iterator Object`를 반환하는 함수가 온다.
```js
{
  [Symbol.iterator](){
    return {
      next(){ return { value: 1, done: false} }
    }
  }
}
```