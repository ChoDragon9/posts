import {Visitor} from './visitor.js'
import {type} from '../helper/type.js'

export const Scanner = class {
  #visitor;
  constructor(visitor, _ = type(visitor, Visitor)) {
    this.#visitor = visitor;
  }
  visit(f, target){
    this.#visitor.visit(f, target);
  }
  scan(target) {
    throw "override"
  }
};
