export default (targetElement, state) => {
  const newFilter = targetElement.cloneNode(true);
  const {currentFilter} = state;

  Array
    .from(newFilter.querySelectorAll('li a'))
    .forEach(a => {
      if (a.textContent === currentFilter) {
        a.classList.add('selected')
      } else {
        a.classList.remove('selected')
      }
    });

  return newFilter;
};
