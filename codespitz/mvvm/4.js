const type = (target, type)=>{
  if(typeof type == "string"){
    if(typeof target != type) throw `invaild type ${target} : ${type}`;
  }else if(!(target instanceof type)) throw `invaild type ${target} : ${type}`;
  return target;
};
const ViewModelValue = class{
  subKey; cat; k; v;
  constructor(subKey, cat, k, v){
    this.subKey = subKey;
    this.cat = cat;
    this.k = k;
    this.v = v;
    Object.freeze(this);
  }
};
const ViewModelListener = class{
  viewmodelUpdated(updated){throw "override";}
};
const ViewModelSubject = class extends ViewModelListener{
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
const ViewModel = class extends ViewModelSubject{
  static get(data){return new ViewModel(data);}
  styles = {}; attributes = {}; properties = {}; events = {};
  #subKey = "";
  get subKey(){return this.#subKey;}
  #parent = null;
  get parent(){return this.#parent;}
  setParent(parent, subKey){
    this.#parent = type(parent, ViewModel);
    this.#subKey = subKey;
    this.addListener(parent);
  }
  constructor(data, _=type(data, "object")){
    super();
    Object.entries(data).forEach(([cat, obj])=>{
      if("styles,attributes,properties".includes(cat)) {
        if (!obj || typeof obj != "object") throw `invalid object cat:${cat}, obj:${obj}`;
        this[cat] = Object.defineProperties({}, Object.entries(obj).reduce((r, [k, v])=>{
          r[k] = {
            enumerable:true,
            get:_=>v,
            set:newV=>{
              v = newV;
              this.add(new ViewModelValue(this.#subKey, cat, k, v));
            }
          };
          return r;
        }, {}));
      }else{
        Object.defineProperties(this, {
          [cat]: {
            enumerable: true,
            get: _ => obj,
            set: newV => {
              obj = newV;
              this.add(new ViewModelValue(this.#subKey, "root", cat, obj));
            }
          }
        });
        if(obj instanceof ViewModel) obj.setParent(this, cat);
      }
    });
    Object.seal(this);
  }
  viewmodelUpdated(updated){updated.forEach(v=>this.add(v));}
};
const Visitor = class {
  visit(action, target, _0=type(action, "function")) {
    throw "override"
  }
};
const DomVisitor = class extends Visitor{
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
const Scanner = class {
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
const DomScanner = class extends Scanner{
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
const Processor = class{
  cat;
  constructor(cat){
    this.cat = cat;
    Object.freeze(this);
  }
  process(vm, el, k, v, _0=type(vm, ViewModel), _1=type(el, HTMLElement), _2=type(k, "string")) {
    this._process(vm, el, k, v);
  }
  _process(vm, el, k, v){throw "override";}
};

const Binder = class extends ViewModelListener{
  #items = new Set; #processors = {};
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
const BinderItem = class{
  el; viewmodel;
  constructor(el, viewmodel, _0 = type(el, HTMLElement), _1 = type(viewmodel, "string")){
    this.el = el;
    this.viewmodel = viewmodel;
    Object.freeze(this);
  }
};
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
const viewmodel = ViewModel.get({
  isStop:false,
  changeContents(){
    this.wrapper.styles.background = `rgb(${parseInt(Math.random()*150) + 100},${parseInt(Math.random()*150) + 100},${parseInt(Math.random()*150) + 100})`;
    this.contents.properties.innerHTML = Math.random().toString(16).replace(".", "");
  },
  wrapper:ViewModel.get({
    styles:{
      width:"50%",
      background:"#ffa",
      cursor:"pointer"
    },
    events:{
      click(e, vm){
        vm.parent.isStop = true;
        console.log("click", vm)
      }
    }
  }),
  title:ViewModel.get({
    properties:{
      innerHTML:"Title"
    }
  }),
  contents:ViewModel.get({
    properties:{
      innerHTML:"Contents"
    }
  })
});
binder.watch(viewmodel);
const f =_=>{
  viewmodel.changeContents();
  if(!viewmodel.isStop) requestAnimationFrame(f);
};
requestAnimationFrame(f);
