let data = {
  price: 5,
  quantity: 2,
  total: 0
}
let target = null

class Dep {
  constructor () {
    this.subscribers = new Set()
  }
  depend () {
    if (!target) {
      return
    }
    this.subscribers.add(target)
  }
  notify () {
    this.subscribers.forEach(sub => sub())
  }
}

const deps = new Map()

// 각 프로퍼티별 의존성 클래스 할당
Object.keys(data).forEach(key => {
  deps.set(key, new Dep())
})

// 데이터의 변경 감지
data = new Proxy(data, {
  get (obj, key) {
    console.log(`Getting ${key}: ${obj[key]}`)
    deps.get(key).depend()
    return obj[key]
  },
  set (obj, key, newVal) {
    console.log(`Setting ${key} to: ${newVal}`)
    obj[key] = newVal
    deps.get(key).notify()
  }
})

const watcher = fn => {
  target = fn
  target()
  target = null
}

watcher(() => {
  data.total = data.price * data.quantity
})

watcher(() => {
  data.price
  console.log(Date.now())
})

console.log(data.total)
data.price = 20
console.log(data.total)
data.quantity = 3
console.log(data.total)