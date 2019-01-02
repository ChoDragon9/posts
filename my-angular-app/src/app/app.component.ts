import { Component } from '@angular/core';
import {of, forkJoin, BehaviorSubject, Subject, Observable, combineLatest} from 'rxjs';
import {map, share, take, scan, filter, merge, mergeMap, mergeMapTo, withLatestFrom, tap, zip, publishBehavior} from 'rxjs/operators';
import {FormControl, FormArray} from '@angular/forms';

function hotObservable<T>(value: T): BehaviorSubject<T> {
  return new BehaviorSubject<T>(value);
}

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

  botSubject$: BehaviorSubject<Object> = hotObservable<Object>({});
  nameSubject$: BehaviorSubject<string> = hotObservable<string>('');
  configSubject$: BehaviorSubject<string[]> = hotObservable<string[]>([]);
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

  view(bot) {
    this.name = new FormControl(bot.name);
    this.config = new FormArray(bot.config.map(config => new FormControl(config)));
    this.name.valueChanges.subscribe(this.nameSubject$);
    this.config.valueChanges.subscribe(this.configSubject$);
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
  }

  constructor() {
    this.view(this.bot);
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
