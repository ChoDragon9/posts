import {type} from '../helper/type.js'
export const BinderItem = class{
  el; viewmodel;
  constructor(el, viewmodel, _0 = type(el, HTMLElement), _1 = type(viewmodel, "string")){
    this.el = el;
    this.viewmodel = viewmodel;
    Object.freeze(this);
  }
};
