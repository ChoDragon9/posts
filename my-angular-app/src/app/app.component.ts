import { Component } from '@angular/core';
import {of, BehaviorSubject, Subject, Observable} from 'rxjs';
import {map, share, scan, filter, merge, mergeMap, mergeMapTo, withLatestFrom} from 'rxjs/operators';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  nameUpdate$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  name$ = this.nameUpdate$.pipe(
    scan((acc, numbers: string) => numbers, '')
  );

  name = new FormControl('');

  constructor() {
    this.name.setValue('Hello');
    this.name.valueChanges.subscribe(this.nameUpdate$);
  }
}
