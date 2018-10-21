import { Component, OnInit } from '@angular/core';
import {TodoListService} from "./todo-list.service";

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
})
export class TodoListComponent implements OnInit {
  private todo;
  constructor(private todoService: TodoListService) {}

  ngOnInit() {
    this.todoService.todo$.subscribe(todo => this.todo = todo);
  }

  removeItem(item: string): void {
    this.todoService.remove(item);
  }
}
