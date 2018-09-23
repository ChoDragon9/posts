import {createApp} from './createApp'
import {getElem} from "./core"

window.onload = () => {
  getElem('#container')[0].appendChild(createApp())
}
