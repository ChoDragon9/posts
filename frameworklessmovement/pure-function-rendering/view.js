import todosView from './components/todosView.js';
import counterView from './components/counterView.js';
import filtersView from './components/filtersView.js';
import registry from './registry.js';

registry.add('todos', todosView);
registry.add('counter', counterView);
registry.add('filters', filtersView);

export default (targetElement, state) => {
  return registry.renderRoot(targetElement, state);
}
