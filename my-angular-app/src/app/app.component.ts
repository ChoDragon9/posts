import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  // 입력
  todoItem: string = '';
  todo: Set<string> = new Set();

  addTodo(): void {
    this.todo.add(this.todoItem);
    this.todoItem = '';
  }

  removeTodo(item: string): void {
    this.todo.delete(item);
  }
}
