import {from} from '../helper.js';

export default () => {
  return from({length: Math.max(Math.random() * 10, 5)})
    .map((value, index) => ({
      text: index,
      completed: index > 4
    }))
}
