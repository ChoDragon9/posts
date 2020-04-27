RxJS의 오퍼레이터들은 새로운 `Observable`를 생성하고 호출한 `Observable`를 구독한다. 외부에서는 변경이 불가는 한 객체 `Immutable Object`를 만들기 위함이다.

#### filter
> https://rxjs-dev.firebaseapp.com/api/operators/filter
```js
function filter(predicate, thisArg) {
    return function filterOperatorFunction(source) {
        return source.lift(new FilterOperator(predicate, thisArg));
    };
}
var FilterOperator = (function () {
    function FilterOperator(predicate, thisArg) {
        this.predicate = predicate;
        this.thisArg = thisArg;
    }
    FilterOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new FilterSubscriber(subscriber, this.predicate, this.thisArg));
    };
    return FilterOperator;
}());
var FilterSubscriber = (function (_super) {
    __extends(FilterSubscriber, _super);
    function FilterSubscriber(destination, predicate, thisArg) {
        var _this = _super.call(this, destination) || this;
        _this.predicate = predicate;
        _this.thisArg = thisArg;
        _this.count = 0;
        return _this;
    }
    FilterSubscriber.prototype._next = function (value) {
        var result;
        try {
            result = this.predicate.call(this.thisArg, value, this.count++);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        if (result) {
            this.destination.next(value);
        }
    };
    return FilterSubscriber;
}(Subscriber));
```

#### Observable.pipe
> http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-pipe

```js
class Observable {
   ...
    pipe(...operations) {
        if (operations.length === 0) {
            return this;
        }
        return pipeFromArray(operations)(this);
    }
   ...
}
```
#### Observable.lift
새로운 Observable를 생성한다.
> http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-lift

```js
class Observable {
   ...
   lift(operator) {
        const observable = new Observable();
        observable.source = this;
        observable.operator = operator;
        return observable;
    }
   ...
}
```