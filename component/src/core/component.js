const noop = () => {}
const always = v => _ => v

export const component = (options) => () => {
  const { beforeCreate = noop } = options
  const render = create(options)
  let dom = render()
  beforeCreate({render: replaceWith(dom, render)})
  return dom
}

const create = ({
                  template = noop,
                  components = always([]),
                  methods = always([]),
                  events = always([])
                }) => () => {
  const dom = parseHTML(template())
  bindEvent(events(), methods({dom}), dom)
  bindComponent(components(), dom)
  return dom
}

const replaceWith = (dom, render) => () => {
  const newDom = render()
  dom.replaceWith(newDom)
  dom = newDom
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
  for (const [selector, component] of components) {
    getElem(selector, dom).forEach(elem => {
      replaceWith(elem, component)()
    })
  }
}

export const getElem = (selector, parent = document) => {
  return parent.querySelectorAll(selector)
}
