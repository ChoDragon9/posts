### Observable 탬블릿 바인딩
#### ngFor
```js
number$ = of([1, 2, 3])
```
```html
<ul>
  <li *ngFor="let num of number$ | async">{{num}}</li>
</ul>
```
#### ngIf
```js
number$ = of([1, 2, 3]);
size$ = this.number$.pipe(map(v => v.length));
```
```html
<ul *ngIf="size$ | async">
  <li *ngFor="let num of number$ | async">{{num}}</li>
</ul>
<div *ngIf="!(size$ | async)">Empty</div>
```
#### Template
```html
Size: {{size$ | async}}
```
### 사용자 이벤트
```html
<ul>
  <li *ngFor="let num of number$ | async">{{num}}</li>
</ul>
<input type="button" (click)="add()" value="Add 4">
<input type="button" (click)="remove()" value="Remove 4">
```
```ts
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
```

### Reactive Forms
```html
<input type="text" [formControl]="name">
<div>{{name$ | async}}</div>
```
```ts
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
```

#### FormControl, FormArray, JSON
```ts
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

```
```html
<input type="text" [formControl]="name">
<hr>
<input type="button" (click)="addConfig()" value="add">
<ul *ngFor="let cf of config.controls">
  <li><input type="text" [formControl]="cf"></li>
</ul>
<hr>
<input type="button" (click)="save$()" value="save$">
```

#### 참고 자료
- https://github.com/RxJS-CN/angular-rxjs-todos/blob/master/src/app/services/todo.service.ts
- https://angular.io/api/common/AsyncPipe
- https://angular.io/api/forms/FormControlDirective