import { Component } from '@angular/core';
import {TodoListService} from "./todo-list.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  // 입력
  todoItem: string = '';

  constructor(private todoService: TodoListService) { }

  addTodo(): void {
    this.todoService.add(this.todoItem);
    this.todoItem = '';
  }
}
