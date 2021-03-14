import fetchMockTodos from './mockup/fetchMockTodos.js';
import createApp from './core/createApp.js'

const state = {
  todos: [],
  currentFilter: 'All'
};
const main = document.querySelector('#main');

const render = () => {
  window.requestAnimationFrame(() => {
    createApp(main, state);
  });
};

window.setInterval(() => {
  state.todos = fetchMockTodos();
  render();
}, 1000);
