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

const noop = () => {}

export const component = ({
                            state = noop,
                            template = noop,
                            components = noop,
                            methods = noop,
                            events = noop,
                            beforeCreate = noop
                          }) => {
  const create = (args) => () => {
    const dom = parseHTML(template(args))
    if (events !== noop) {
      bindEvent(events(), methods(Object.assign({dom}, args)), dom)
    }
    if (components !== noop) {
      bindComponent(components(args), dom)
    }
    return dom
  }
  return ({state: parentState, store} = {}) => {
    const args = {state: state(), parentState, store}
    const render = create(args)
    let dom
    const reRender = () => {
      const newDom = render()
      dom.replaceWith(newDom)
      dom = newDom
    }
    beforeCreate(Object.assign({render: reRender}, args))
    dom = render()
    return dom
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
