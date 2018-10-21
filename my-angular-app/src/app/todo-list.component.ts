import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
})
export class TodoListComponent {
  @Input()
  todo: Set<string>;
  @Output()
  onremove = new EventEmitter<string>();

  removeItem(item: string): void {
    this.onremove.emit(item)
  }
}
