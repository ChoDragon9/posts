import {MyFooter} from './MyFooter.js';
import {MyItem} from './MyItem.js';
import {MyApp} from './MyApp.js';

const addCustomElement = (name, element) => {
  window.customElements
    .define(name, element);
};

addCustomElement('my-footer', MyFooter);
addCustomElement('my-item', MyItem);
addCustomElement('my-app', MyApp);
