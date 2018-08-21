export const getElem = (selector) => {
  const element = document.querySelectorAll(selector)

  if (element.length > 1) {
    return element
  } else {
    return element[0]
  }
}

export const parseHTML = (template) => {
  var tmp = document.implementation.createHTMLDocument()
  tmp.body.innerHTML = template
  return tmp.body.children[0]
}

export const bindEvent = (events, dom) => {
  for (const [selector, event, callback] of events) {
    dom.querySelector(selector)[event] = callback
  }
}

export const bindComponent = (components, dom) => {
  for (const [selector, element] of components) {
    dom.querySelector(selector.toLowerCase()).outerHTML = element.outerHTML
  }
}
