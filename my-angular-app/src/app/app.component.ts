import { Component } from '@angular/core';
import {TodoListService} from "./todo-list.service";
import {of, BehaviorSubject, Subject, Observable} from 'rxjs';
import {map, share, scan, filter, merge, mergeMap, mergeMapTo} from 'rxjs/operators';

type Mapper = (numbers: number[]) => number[];

const identity = v => v;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  update$: BehaviorSubject<Mapper> = new BehaviorSubject<Mapper>(identity);
  add$: Subject<number> = new Subject<number>();
  remove$: Subject<number> = new Subject<number>();
  number$ = this.update$.pipe(
    scan((numbers: number[], operator: Mapper) => operator(numbers), [1, 2, 3])
  );

  constructor(private todoService: TodoListService) {
    this.add$.pipe(
      map((v): Mapper => {
        return (numbers: number[]) => numbers.concat(v);
      })
    ).subscribe(this.update$)
    this.remove$.pipe(
      map((v): Mapper => {
        return (numbers: number[]) => numbers.filter(n => n !== v);
      })
    ).subscribe(this.update$)
  }

  add() {
    this.add$.next(4);
  }

  remove() {
    this.remove$.next(4);
  }
}
