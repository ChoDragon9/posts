import {ViewModel} from './core/view-model.js'
export const viewmodel = ViewModel.get({
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
