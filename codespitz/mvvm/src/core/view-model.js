import {ViewModelSubject} from './view-model-subject.js'
import {ViewModelValue} from '../types/view-model-value.js'
import {type} from '../helper/type.js'

export const ViewModel = class extends ViewModelSubject{
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
