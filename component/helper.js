export const getElem = (selector, parent = document) => {
  return parent.querySelectorAll(selector)
}

export const parseHTML = (template) => {
  var tmp = document.implementation.createHTMLDocument()
  tmp.body.innerHTML = template
  return tmp.body.children[0]
}

export const bindEvent = (events, methods, dom) => {
  for (const [selector, event, methodName] of events) {
    getElem(selector, dom).forEach(elem => {
      elem[event] = methods[methodName]
    })
  }
}

export const bindComponent = (components, dom) => {
  for (const [selector, component, args] of components) {
    getElem(selector, dom).forEach(elem => {
      elem.replaceWith(component(args))
    })
  }
}

export const createStore = () => {
  const store = new Map()
  const subscriber = new Map()
  const nodify = (key) => {
    if (subscriber.has(key)) {
      for (const listener of subscriber.get(key)) {
        listener(store.get(key))
      }
    }
  }

  return {
    set (key, value) {
      store.set(key, value)
      nodify(key)
    },
    get (key) {
      return store.get(key)
    },
    subscribe (key, listener) {
      let listeners
      if (subscriber.has(key)) {
        listeners = subscriber.get(key)
      } else {
        listeners = []
      }
      listeners.push(listener)
      subscriber.set(key, listeners)
    }
  }
}
