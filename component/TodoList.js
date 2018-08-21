import {parseHTML, bindEvent, bindComponent} from './helper'
import TodoItem from './TodoItem'

class TodoList {
  constructor () {
    this._dom = null
    this._state = []
  }
  get components () {
    return [
      ['TodoItem', new TodoItem(this._state).render()]
    ]
  }
  get events () {
    return [
      ['form', 'onsubmit', this.addItem.bind(this)]
    ]
  }
  get template () {
    return `<div>
      <form>
          <input type="text" placeholder="enter task">
          <input type="submit" value="add">
      </form> 
      <TodoItem />
    </div>`
  }
  addItem (event) {
    event.preventDefault()

    const input = this._dom.querySelector('input[type="text"]')
    this._state.push(input.value)
    this.render()
  }
  render () {
    if (this._dom) {
      this._dom.innerHTML = parseHTML(this.template).innerHTML
    } else {
      this._dom = parseHTML(this.template)
    }

    bindComponent(this.components, this._dom)
    bindEvent(this.events, this._dom)
    return this._dom
  }
}

export default TodoList
