import {assign, clone} from '../helper.js';

const getTodoCount = todos => {
  const notCompleted = todos
    .filter(todo => !todo.completed);
  const { length } = notCompleted;

  return `${length} Items left`
};

export default (targetElement, state) => {
  return assign(clone(targetElement), {
    textContent: getTodoCount(state.todos)
  })
};
