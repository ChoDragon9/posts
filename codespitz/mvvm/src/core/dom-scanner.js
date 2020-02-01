import {Scanner} from '../types/scanner.js'
import {DomVisitor} from './dom-visitor.js'
import {Binder} from './binder.js'
import {BinderItem} from './binder-item.js'
import {type} from '../helper/type.js'

export const DomScanner = class extends Scanner{
  constructor(visitor, _=type(visitor, DomVisitor)) {
    super(visitor);
  }
  scan(target, _ = type(target, HTMLElement)){
    const binder = new Binder, f = el=>{
      const vm = el.getAttribute("data-viewmodel");
      if(vm) binder.add(new BinderItem(el, vm));
    };
    f(target);
    this.visit(f, target);
    return binder;
  }
};
