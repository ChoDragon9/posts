import { Component } from '@angular/core';
import {of, BehaviorSubject, Subject, Observable} from 'rxjs';
import {map, share, scan, filter, merge, mergeMap, mergeMapTo, withLatestFrom} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  todo: string;

  update$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  add$: Subject<string> = new Subject<string>();
  remove$: Subject<string> = new Subject<string>();
  number$ = this.update$.pipe(
    scan((acc, numbers: string[]) => numbers, [])
  );

  constructor() {
    this.add$.pipe(
      withLatestFrom(this.number$),
      map(([value, todos]: any[]) => todos.concat(value))
    ).subscribe(this.update$);
    this.remove$.pipe(
      withLatestFrom(this.number$),
      map(([value, todos]: any[]) => todos.filter(v => v !== value))
    ).subscribe(this.update$);
  }

  add() {
    this.add$.next(this.todo);
    this.todo = '';
  }

  remove(todo) {
    this.remove$.next(todo);
  }
}
