import {assign, clone} from '../helper.js';

const getTodoElement = todo => {
  const {
    text,
    completed
  } = todo;

  return `<li>
    <input 
      type="checkbox"
      ${completed ? 'checked' : ''}>
    <input value="${text}">
  </li>`
};

export default (targetElement, state) => {
  const newTodoList = clone(targetElement);
  const {todos} = state;
  const todosElements = todos.map(getTodoElement).join('');

  return assign(newTodoList, {
    innerHTML: todosElements
  });
}
