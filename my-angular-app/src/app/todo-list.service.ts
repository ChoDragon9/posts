import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class TodoListService {
  private todo: Set<string> = new Set();
  private todoSubject = new BehaviorSubject(this.todo);

  get todo$() {
    return this.todoSubject;
  }

  add(item: string) {
    this.todo.add(item);
    this.todoSubject.next(this.todo);
  }

  remove(item: string) {
    this.todo.delete(item);
    this.todoSubject.next(this.todo);
  }
}
