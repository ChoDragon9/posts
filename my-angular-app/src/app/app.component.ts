import { Component, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class MyService {
  count = 0
  constructor() {
    setInterval(() => {
      this.count++
    }, 1000)
  }
}

@Component({
  selector: 'child-component',
  template: '<div>{{count}}</div>'
})
export class ChildComponent {
  constructor(private myService: MyService) {}
  get count () {
    return this.myService.count
  }
}

@Component({
  selector: 'app-root',
  template: `<div>
    {{count}}
    <child-component></child-component>
  </div>`,
})
export class AppComponent {
  constructor(private myService: MyService) {
  }
  get count () {
    return this.myService.count
  }
}

// @Pipe({name: 'exponentialStrength'})
// export class ExponentialStrengthPipe implements PipeTransform {
//   transform(value: number, exponent?: number): number {
//     return Math.pow(value, isNaN(exponent) ? 1 : exponent);
//   }
// }
