import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  layer1 = new LayerHelper();
  layer2 = new LayerHelper();
  layer3 = new LayerHelper();
  constructor() {}
}

class LayerHelper {
  isShow = false;
  toggle() {
    this.isShow = !this.isShow;
  }
  constructor() {}
}
