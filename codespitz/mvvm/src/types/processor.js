import {ViewModel} from '../core/view-model.js'
import {type} from '../helper/type.js'

export const Processor = class{
  constructor(cat){
    this.cat = cat;
    Object.freeze(this);
  }
  process(vm, el, k, v, _0=type(vm, ViewModel), _1=type(el, HTMLElement), _2=type(k, "string")) {
    this._process(vm, el, k, v);
  }
  _process(vm, el, k, v){throw "override";}
};
