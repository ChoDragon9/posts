import {createApp} from './createApp'
import {getElem} from "./helper"

window.onload = () => {
  getElem('#container')[0].appendChild(createApp())
}
