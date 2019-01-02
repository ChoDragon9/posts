import { Component } from '@angular/core';
import {of, forkJoin, BehaviorSubject, Subject, Observable, combineLatest} from 'rxjs';
import {map, share, take, scan, filter, merge, mergeMap, mergeMapTo, withLatestFrom, tap, zip} from 'rxjs/operators';
import {FormControl, FormArray} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  bot = {
    name: 'Hello',
    config: [
      'hello',
      'world'
    ]
  };

  botSubject$: BehaviorSubject<Object> = new BehaviorSubject<Object>({});
  nameSubject$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  configSubject$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  bot$: Observable<Object>;
  name$: Observable<string>;
  config$: Observable<string[]>;

  addConfig() {
    this.config.push(new FormControl(''));
  }

  save() {
    console.log(this.name.value);
    console.log(this.config.value);
  }

  save$() {
    this.bot$.pipe(take(1)).subscribe(console.log);
  }

  name: FormControl;
  config: FormArray;

  view() {
    this.name = new FormControl(this.bot.name);
    this.config = new FormArray(this.bot.config.map(config => new FormControl(config)));
  }

  model() {
    combineLatest(this.name$, this.config$)
      .pipe(
        map(([name, config]) => {
          return Object.assign(this.bot, {name, config})
        }),
        tap(console.log)
      )
      .subscribe(this.botSubject$)
  }

  intent() {
    this.bot$ = this.botSubject$.pipe(
      scan((acc, bot: Object) => bot, {})
    );
    this.name$ = this.nameSubject$.pipe(
      scan((acc, numbers: string) => numbers, '')
    );
    this.config$ = this.configSubject$.pipe(
      scan((acc, config: string[]) => config, [])
    );
    this.name.valueChanges.subscribe(this.nameSubject$);
    this.config.valueChanges.subscribe(this.configSubject$);
  }

  constructor() {
    this.view();
    this.intent();
    this.model();

    // forkJoin(this.name$, this.config$)
    //   .pipe(
    //     map(([name, config]) => {
    //       return Object.assign(this.bot, {name, config})
    //     }),
    //     tap(console.log)
    //   )
    //   .subscribe(this.botSubject$)
  }
}
