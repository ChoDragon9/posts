import { Component } from '@angular/core';
import {BehaviorSubject, Observable, combineLatest} from 'rxjs';
import {map, take, scan, withLatestFrom, tap} from 'rxjs/operators';
import {FormControl, FormArray} from '@angular/forms';

function hotObservable<T>(value: T): BehaviorSubject<T> {
  return new BehaviorSubject<T>(value);
}

interface Setting {
  name: string;
  config: string[]
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  settingSubject$: BehaviorSubject<Setting>;
  nameSubject$: BehaviorSubject<string>;
  configSubject$: BehaviorSubject<string[]>;
  setting$: Observable<Setting>;
  name$: Observable<string>;
  config$: Observable<string[]>;

  name: FormControl;
  config: FormArray;

  constructor() {
    const setting: Setting = {
      name: 'Hello',
      config: [
        'hello',
        'world'
      ]
    };
    this.intent(setting);
    this.model();
    this.view(setting);
  }

  intent(setting) {
    this.settingSubject$ = hotObservable<Setting>(setting);
    this.nameSubject$  = hotObservable<string>(setting.name);
    this.configSubject$ = hotObservable<string[]>(setting.config);
    this.setting$ = this.settingSubject$.pipe(
      scan((acc, setting: Setting) => setting)
    );
    this.name$ = this.nameSubject$.pipe(
      scan((acc, numbers: string) => numbers)
    );
    this.config$ = this.configSubject$.pipe(
      scan((acc, config: string[]) => config)
    );
  }

  model() {
    combineLatest(this.name$, this.config$)
      .pipe(
        withLatestFrom(this.setting$),
        map(([[name, config], setting]) => {
          return Object.assign(setting, {name, config});
        }),
        tap(console.log)
      )
      .subscribe(this.settingSubject$)
  }

  view(setting) {
    this.name = new FormControl(setting.name);
    this.config = new FormArray(setting.config.map(config => new FormControl(config)));
    this.name.valueChanges.subscribe(this.nameSubject$);
    this.config.valueChanges.subscribe(this.configSubject$);
  }

  addConfig() {
    this.config.push(new FormControl(''));
  }

  save$() {
    this.setting$.pipe(take(1)).subscribe(console.log);
  }
}
