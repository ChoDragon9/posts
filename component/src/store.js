import {createStore} from './core'

export const store = createStore()
const state = {
  todo: [
    { id: 0, contents: 'asdasdad' },
    { id: 1, contents: 'asdasdad' },
    { id: 2, contents: 'asdasdad' }
  ]
}

store.set('todo', state.todo)