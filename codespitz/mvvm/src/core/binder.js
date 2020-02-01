import {ViewModelListener} from '../types/view-model-listener.js'
import {BinderItem} from './binder-item.js'
import {ViewModel} from './view-model.js'
import {Processor} from '../types/processor.js'
import {type} from '../helper/type.js'
import {viewmodel} from '../viewmodel.js'

export const Binder = class extends ViewModelListener{
  #items = new Set;
  #processors = {};
  add(v, _ = type(v, BinderItem)){this.#items.add(v);}
  viewmodelUpdated(updated){
    const items = {};
    this.#items.forEach(item=>{
      items[item.viewmodel] = [
        type(viewmodel[item.viewmodel], ViewModel),
        item.el
      ];
    });
    updated.forEach(v=>{
      if(!items[v.subKey]) return;
      const [vm, el] = items[v.subKey], processor = this.#processors[v.cat];
      if(!el || !processor) return;
      processor.process(vm, el, v.k, v.v);
    });
  }
  addProcessor(v, _0=type(v, Processor)){
    this.#processors[v.cat] = v;
  }
  watch(viewmodel, _ = type(viewmodel, ViewModel)){
    viewmodel.addListener(this);
    this.render(viewmodel);
  }
  unwatch(viewmodel, _ = type(viewmodel, ViewModel)){
    viewmodel.removeListener(this);
  }
  render(viewmodel, _ = type(viewmodel, ViewModel)){
    const processores = Object.entries(this.#processors);
    this.#items.forEach(item=>{
      const vm = type(viewmodel[item.viewmodel], ViewModel), el = item.el;
      processores.forEach(([pk, processor])=>{
        Object.entries(vm[pk]).forEach(([k, v])=>{
          processor.process(vm, el, k, v)
        });
      });
    });
  }
};
