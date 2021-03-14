const getTodoElement = todo => {
  const {
    text,
    completed
  } = todo;

  return `<li ${completed ? 'class="completed"' : ''}>
    <div class="view">
      <input 
        ${completed ? 'checked' : ''}
        class="toggle" 
        type="checkbox">
      <label>${text}</label>
      <button class="destroy">X</button>
    </div>
    <input class="edit" value="${text}">
  </li>`
};

export default (targetElement, state) => {
  const newTodoList = targetElement.cloneNode(true);
  const {todos} = state;
  const todosElements = todos.map(getTodoElement).join('');

  newTodoList.innerHTML = todosElements;
  return newTodoList
}
