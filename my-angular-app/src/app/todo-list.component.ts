import { Component, OnInit } from '@angular/core';
import {TodoListService} from "./todo-list.service";
import {reduce, count, tap, map} from 'rxjs/operators'

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
})
export class TodoListComponent implements OnInit {
  todo$ = this.todoService.todo$;
  todoSize$ = this.todo$
      .pipe(map(item => item.size))
  emptyTodo$ = this.todoSize$
    .pipe(map(n => n === 0))

  constructor(private todoService: TodoListService) {}

  ngOnInit() {}

  removeItem(item: string): void {
    this.todoService.removeTodo$.next(item);
  }
}
