import registry from './registry.js';
import todosView from '../components/todosView.js';
import counterView from '../components/counterView.js';
import filtersView from '../components/filtersView.js';

export default () => {
  registry.add('todos', todosView);
  registry.add('counter', counterView);
  registry.add('filters', filtersView);
};
