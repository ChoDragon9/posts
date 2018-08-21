import {parseHTML, bindEvent} from './helper'

export const createTodoItem = ({store}) => {
  let dom = null
  const template = () => {
    const todo = store.get('todo')
    const items = todo.reduce((result, {id, contents}) => {
      return `${result}<li data-id="${id}">
        ${contents} <button type="button">X</button>
      </li>`
    }, '')
    let list

    if (items) {
      list = `<ul>${items}</ul>`
    } else {
      list = 'No Items'
    }
    return `<div>${list}</div>`
  }
  const mount = () => {
    dom = methods.createNewDom()
    store.subscribe('todo', () => {
      methods.render()
    })
    return dom
  }
  const methods = {
    render () {
      const newDom = this.createNewDom()
      dom.replaceWith(newDom)
      dom = newDom
    },
    createNewDom () {
      const dom = parseHTML(template())
      bindEvent(events, methods, dom)
      return dom
    },
    removeItem () {
      const id = this.parentNode.getAttribute('data-id')
      const todo = store.get('todo')
        .filter((item) => item.id.toString() !== id)
      store.set('todo', todo)
    }
  }
  const events = [
    ['li > button', 'onclick', 'removeItem']
  ]

  return mount()
}
