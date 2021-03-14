import todosView from './views/todosView.js';
import counterView from './views/counterView.js';
import filterView from './views/filterView.js';

export default (targetElement, state) => {
  const element = targetElement.cloneNode(true);

  const list = element.querySelector('.todo-list');
  const counter = element.querySelector('.todo-count');
  const filters = element.querySelector('.filters');

  list.replaceWith(todosView(list, state));
  counter.replaceWith(counterView(counter, state));
  filters.replaceWith(filterView(filters, state));

  return element
}
