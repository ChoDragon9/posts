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

Object.keys(data).forEach(key => {
  let internalValue = data[key]

  const dep = new Dep()

  Object.defineProperty(data, key, {
    get () {
      console.log(`Getting ${key}: ${internalValue}`)
      dep.depend()
      return internalValue
    },
    set (newVal) {
      console.log(`Setting ${key} to: ${newVal}`)
      internalValue = newVal
      dep.notify()
    }
  })
})

const watcher = fn => {
  target = fn
  target()
  target = null
}

watcher(() => {
  data.total = data.price * data.quantity
})

console.log(data.total)
data.price = 20
console.log(data.total)
data.quantity = 3
console.log(data.total)