import { Component } from '@angular/core';
import {BehaviorSubject, Observable, combineLatest} from 'rxjs';
import {map, take, scan, withLatestFrom, tap} from 'rxjs/operators';
import {FormControl, FormArray} from '@angular/forms';

function createHot$<T>(value: T): BehaviorSubject<T> {
  return new BehaviorSubject<T>(value);
}
const assign = (target, ...source) => Object.assign(target, ...source);
const createFormControl = (val: any) => new FormControl(val);
const createFormArray = (arr: any[]) => new FormArray(arr);

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
    assign(this, {
      settingSubject$: createHot$<Setting>(setting),
      nameSubject$: createHot$<string>(setting.name),
      configSubject$: createHot$<string[]>(setting.config),
    });
    assign(this, {
      setting$: this.settingSubject$.pipe(
        scan((acc, setting: Setting) => setting)
      ),
      name$: this.nameSubject$.pipe(
        scan((acc, numbers: string) => numbers)
      ),
      config$: this.configSubject$.pipe(
        scan((acc, config: string[]) => config)
      )
    });
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

  view({name, config}: Setting) {
    assign(this, {
      name: createFormControl(name),
      config: createFormArray(config.map(createFormControl))
    });
    this.name.valueChanges.subscribe(this.nameSubject$);
    this.config.valueChanges.subscribe(this.configSubject$);
  }

  addConfig() {
    this.config.push(createFormControl(''));
  }

  save$() {
    this.setting$.pipe(take(1)).subscribe(console.log);
  }
}
