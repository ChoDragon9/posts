import getTodos from './getTodos.js';
import view from './view.js'

const state = {
  todos: getTodos(),
  currentFilter: 'All'
};

window.requestAnimationFrame(() => {
  const main = document.querySelector('.todoapp');
  const newMain = view(main, state);
  main.replaceWith(newMain);
});
