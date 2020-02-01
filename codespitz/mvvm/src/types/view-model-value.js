export const ViewModelValue = class{
  subKey; cat; k; v;
  constructor(subKey, cat, k, v){
    this.subKey = subKey;
    this.cat = cat;
    this.k = k;
    this.v = v;
    Object.freeze(this);
  }
};
