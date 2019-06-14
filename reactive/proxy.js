const handler = {
  get (target, key) {
    console.log('GET', key)
    return target[key]
  },
  set (target, key, value) {
    console.log('SET', key, value)
    Object.assign(target, {[key]: value})
  },
  deleteProperty (target, key) {
    console.log('DELETE', key)
    delete target[key]
  }
}

const target = {}
const targetProxy = new Proxy(target, handler)

targetProxy.hello = 'World!'
targetProxy.hello
delete targetProxy.hello

console.log('-------target-------')
console.log(target)
console.log('-------targetProxy-------')
console.log(targetProxy)


// Object.assign(targetProxy, {hello: 'World!'})
// TypeError