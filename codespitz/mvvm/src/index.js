import {DomScanner} from './core/dom-scanner.js'
import {DomVisitor} from './core/dom-visitor.js'
import {Processor} from './types/processor.js'
import {viewmodel} from './viewmodel.js'

const scanner = new DomScanner(new DomVisitor);
const binder = scanner.scan(document.querySelector("#target"));
binder.addProcessor(new (class extends Processor{
  _process(vm, el, k, v){el.style[k] = v;}
})("styles"));
binder.addProcessor(new (class extends Processor{
  _process(vm, el, k, v){el.setAttribute(k, v);}
})("attributes"));
binder.addProcessor(new (class extends Processor{
  _process(vm, el, k, v){el[k] = v;}
})("properties"));
binder.addProcessor(new (class extends Processor{
  _process(vm, el, k, v){el["on" + k] =e=>v.call(el, e, vm);}
})("events"));
binder.watch(viewmodel);
const f =_=>{
  viewmodel.changeContents();
  if(!viewmodel.isStop) requestAnimationFrame(f);
};
requestAnimationFrame(f);
