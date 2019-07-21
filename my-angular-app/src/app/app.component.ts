import { Component, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class MyService {
  constructor(private http: HttpClient) { }
  fetchConfig() {
    return this.http.get('/path/to/config')
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(private myService: MyService) {}
  onClick () {
    this.myService.fetchConfig()
  }
}

// @Pipe({name: 'exponentialStrength'})
// export class ExponentialStrengthPipe implements PipeTransform {
//   transform(value: number, exponent?: number): number {
//     return Math.pow(value, isNaN(exponent) ? 1 : exponent);
//   }
// }
