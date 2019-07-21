import {Component} from "../../node_modules/@angular/core";

@Component({
  selector: 'hello-component',
  // template: '<h1>Hello</h1>'
  template: '<div>{{today | dateFormat}}</div>'
})
// export class HelloComponent {}
export class HelloComponent {
  today: Date = new Date()
}
