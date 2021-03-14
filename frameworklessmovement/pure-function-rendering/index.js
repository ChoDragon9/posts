import getTodos from './getTodos.js';
import view from './view.js'

const state = {
  todos: getTodos(),
  currentFilter: 'All'
};

const render = () => {
  window.requestAnimationFrame(() => {
    const main = document.querySelector('.todoapp');
    const newMain = view(main, state);
    main.replaceWith(newMain);
  });
};

window.setInterval(() => {
  state.todos = getTodos();
  render();
}, 1000);
