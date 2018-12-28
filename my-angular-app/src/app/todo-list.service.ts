import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable()
export class TodoListService {
  private todo: Set<string> = new Set();
  todo$ = new BehaviorSubject(new Set(this.todo));
  removeTodo$ = new BehaviorSubject(null);
  addTodo$ = new BehaviorSubject(null);

  constructor() {
    this.removeTodo$.subscribe(item => {
      this.remove(item);
    });

    this.addTodo$
      .pipe(filter(v => v))
      .subscribe(item => {
      this.add(item);
    })
  }

  private add(item: string) {
    this.todo.add(item);
    this.notify()
  }

  private remove(item: string) {
    this.todo.delete(item);
    this.notify()
  }

  private notify() {
    this.todo$.next(new Set(this.todo))
  }
}
