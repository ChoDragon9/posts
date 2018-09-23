import {bindComponent, getElem, parseHTML} from './helper'
import {createTodoList} from './TodoList'

export const createApp = () => {
  const initState = {
    todo: [
      { id: 0, contents: 'asdasdad' },
      { id: 1, contents: 'asdasdad' },
      { id: 2, contents: 'asdasdad' }
    ]
  }
  const template = () => `<div>
    <todo-list></todo-list>
  </div>`
  const components = () => {
    return [
      ['todo-list', createTodoList, {initState}]
    ]
  }
  const mount = () => {
    const dom = parseHTML(template())
    bindComponent(components(), dom)
    return dom
  }

  return mount()
}