import {assign, clone, from} from '../helper.js';

export default (targetElement, state) => {
  const newFilter = clone(targetElement);
  const {currentFilter} = state;

  from(newFilter.querySelectorAll('li a'))
    .forEach(a => {
      const fontWeight =
        a.textContent === currentFilter
          ? 'bold'
          : 'normal';
      assign(a.style, {fontWeight});
    });

  return newFilter;
};
