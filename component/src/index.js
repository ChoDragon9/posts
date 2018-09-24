import {createApp} from './createApp'
import {getElem} from "./core/component"

window.onload = () => {
  getElem('#container')[0].appendChild(createApp())
}
