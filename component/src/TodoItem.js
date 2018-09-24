import {component} from './core'
import {store} from './store'

export const TodoItem = component({
  template () {
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
  },
  methods () {
    return {
      removeItem () {
        const id = this.parentNode.getAttribute('data-id')
        const todo = store.get('todo')
          .filter((item) => item.id.toString() !== id)
        store.set('todo', todo)
      }
    }
  },
  events () {
    return [
      ['li > button', 'onclick', 'removeItem']
    ]
  },
  beforeCreate ({render}) {
    store.subscribe('todo', render)
  }
})