import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class TodoListService {
  private todo: Set<string> = new Set();
  private todoSubject = new BehaviorSubject(new Set(this.todo));

  get todo$() {
    return this.todoSubject;
  }

  add(item: string) {
    this.todo.add(item);
    this.notify()
  }

  remove(item: string) {
    this.todo.delete(item);
    this.notify()
  }

  notify() {
    this.todoSubject.next(new Set(this.todo))
  }
}
