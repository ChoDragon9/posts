import {Visitor} from '../types/visitor.js'
import {type} from '../helper/type.js'

export const DomVisitor = class extends Visitor{
  visit(action, target, _0=type(action, "function"), _1=type(target, HTMLElement)) {
    const stack = [];
    let curr = target.firstElementChild;
    do {
      action(curr);
      if (curr.firstElementChild) stack.push(curr.firstElementChild);
      if (curr.nextElementSibling) stack.push(curr.nextElementSibling);
    } while (curr = stack.pop());
  }
};
