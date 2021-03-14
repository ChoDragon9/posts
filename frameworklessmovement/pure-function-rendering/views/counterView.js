const getTodoCount = todos => {
  const notCompleted = todos
    .filter(todo => !todo.completed);

  const { length } = notCompleted;
  if (length === 1) {
    return '1 Item left'
  }

  return `${length} Items left`
};

export default (targetElement, state) => {
  const newCounter = targetElement.cloneNode(true);
  const {todos} = state;
  newCounter.textContent = getTodoCount(todos);
  return newCounter;
};
