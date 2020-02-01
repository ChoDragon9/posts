import {ViewModelListener} from '../types/view-model-listener.js'
import {ViewModelValue} from '../types/view-model-value.js'
import {type} from '../helper/type.js'

export const ViewModelSubject = class extends ViewModelListener{
  static #subjects = new Set;
  static #inited = false;
  static notify(){
    const f =_=>{
      this.#subjects.forEach(vm=>{
        if(vm.#info.size){
          vm.notify();
          vm.clear();
        }
      });
      if(this.#inited) requestAnimationFrame(f);
    };
    requestAnimationFrame(f);
  }
  static watch(vm, _=type(vm, ViewModelListener)){
    this.#subjects.add(vm);
    if(!this.#inited){
      this.#inited = true;
      this.notify();
    }
  }
  static unwatch(vm, _=type(vm, ViewModelListener)){
    this.#subjects.delete(vm);
    if(!this.#subjects.size) this.#inited = false;
  }
  #info = new Set; #listeners = new Set;
  add(v, _=type(v, ViewModelValue)){this.#info.add(v);}
  clear(){this.#info.clear();}
  addListener(v, _=type(v, ViewModelListener)){
    this.#listeners.add(v);
    ViewModelSubject.watch(this);
  }
  removeListener(v, _=type(v, ViewModelListener)){
    this.#listeners.delete(v);
    if(!this.#listeners.size) ViewModelSubject.unwatch(this);
  }
  notify(){this.#listeners.forEach(v=>v.viewmodelUpdated(this.#info));}
};
