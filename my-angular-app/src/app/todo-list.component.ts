import { Component } from '@angular/core';
import {TodoListService} from "./todo-list.service";

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
})
export class TodoListComponent {
  constructor(private todoService: TodoListService) {}

  removeItem(item: string): void {
    this.todoService.remove(item);
  }
}
