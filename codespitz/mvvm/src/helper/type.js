export const type = (target, type)=>{
  if(typeof type == "string"){
    if(typeof target != type) throw `invaild type ${target} : ${type}`;
  }else if(!(target instanceof type)) throw `invaild type ${target} : ${type}`;
  return target;
};
