[produce 구현해보기](https://chodragon9.github.io/blog/produce/)에서 작성된 코드를 OOP 버전으로 리팩토링한 코드이다.

```js
const isArray = value => Array.isArray(value)
const assign = (...obj) => Object.assign(...obj)
const canProduce = value => {
  return value === undefined || value === null ?
    false :
    isArray(value) || typeof value === 'object'
}
const shallowCopy = obj => {
  return !canProduce(obj) ?
    obj :
    isArray(obj) ?
      obj.concat() :
      assign({}, obj)
}

class LinkedList {
  constructor(base, parent, propName) {
    this.base = base
    this.parent = parent
    this.propName = propName
    this.copy = null
  }
  toBase() {
    return this.copy || this.base
  }
  changeLinkedList (propName, value) {
    const nextValue = {[propName]: value}

    this.copy ?
      assign(this.copy, nextValue) :
      assign(this, {
        copy: assign(shallowCopy(this.base), nextValue)
      })

    if (this.parent) {
      this.parent.changeLinkedList(this.propName, this.copy)
    }
  }

  static create(base, parent = null, propName = null) {
    return new LinkedList(base, parent, propName)
  }
}

class LinkedListProxy {
  constructor(base, parentState, propName) {
    const {proxy, revoke} = this.createProxy(base)
    this.proxy = proxy
    this.revokeFn = revoke
    this.state = LinkedList.create(base, parentState, propName)
    this.children = []
  }
  createProxy(base) {
    return Proxy.revocable(base, {
      get: (...args) => this.getter(...args),
      set: (...args) => this.setter(...args)
    })
  }
  getter(target, propName) {
    const value = this.toBase()[propName]
    return canProduce(value) ?
      this.createChildProxy(value, propName) :
      value
  }
  createChildProxy(value, propName) {
    const child = LinkedListProxy.create(value, this.state, propName)
    this.children.push(child)
    return child.proxy
  }
  setter(target, propName, value) {
    this.state.changeLinkedList(propName, value)
  }
  revoke() {
    this.revokeFn()
    this.children.forEach(child => child.revoke())
  }
  toBase() {
    return this.state.toBase()
  }
  toProxy() {
    return this.proxy
  }
  static create(base, parentState, propName) {
    return new LinkedListProxy(base, parentState, propName)
  }
}

const produceBase = (base, fn) => {
  const linkedListProxy = LinkedListProxy.create(base)

  fn(linkedListProxy.toProxy())
  linkedListProxy.revoke()

  return linkedListProxy.toBase()
}

const produce = (fn) => (base) => {
  return canProduce(base) ? produceBase(base, fn) : base
}
```