import { Injectable } from '@angular/core';

@Injectable()
export class TodoListService {
  public todo: Set<string> = new Set();

  add(item: string) {
    this.todo.add(item);
  }

  remove(item: string) {
    this.todo.delete(item);
  }
}
