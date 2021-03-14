import getTodos from './getTodos.js';
import createApp from './core/createApp.js'

const state = {
  todos: getTodos(),
  currentFilter: 'All'
};

const render = () => {
  window.requestAnimationFrame(() => {
    const main = document.querySelector('.todoapp');
    createApp(main, state);
  });
};

window.setInterval(() => {
  state.todos = getTodos();
  render();
}, 1000);
