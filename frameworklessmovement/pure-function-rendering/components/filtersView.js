export default (targetElement, state) => {
  const newFilter = targetElement.cloneNode(true);
  const {currentFilter} = state;

  Array
    .from(newFilter.querySelectorAll('li a'))
    .forEach(a => {
      if (a.textContent === currentFilter) {
        a.style.fontWeight = 'bold';
      } else {
        a.style.fontWeight = 'normal';
      }
    });

  return newFilter;
};
