import todosView from '../components/todosView.js';
import counterView from '../components/counterView.js';
import filtersView from '../components/filtersView.js';
import registry from './registry.js';
import applyDiff from './virtual-dom/applyDiff.js';

registry.add('todos', todosView);
registry.add('counter', counterView);
registry.add('filters', filtersView);

export default (rootElement, state) => {
  const newRootElement = registry.renderRoot(rootElement, state);

  applyDiff(document.body, rootElement, newRootElement);
}
