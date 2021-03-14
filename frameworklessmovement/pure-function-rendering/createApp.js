import todosView from './components/todosView.js';
import counterView from './components/counterView.js';
import filtersView from './components/filtersView.js';
import registry from './registry.js';

registry.add('todos', todosView);
registry.add('counter', counterView);
registry.add('filters', filtersView);

export default (rootElement, state) => {
  const newRootElement = registry.renderRoot(rootElement, state);
  rootElement.replaceWith(newRootElement);
}
