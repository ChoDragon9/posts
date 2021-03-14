import registry from './registry.js';
import todos from '../components/todos.js';
import counter from '../components/counter.js';
import filters from '../components/filters.js';

export default () => {
  registry.add('todos', todos);
  registry.add('counter', counter);
  registry.add('filters', filters);
};
