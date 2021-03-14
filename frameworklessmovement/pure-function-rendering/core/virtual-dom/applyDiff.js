import isNodeChanged from './isNodeChanged.js';
import {from} from '../../helper.js';

const applyDiff = (parentNode, realNode, virtualNode) => {
  if (realNode && !virtualNode) {
    realNode.remove();
    return
  }

  if (!realNode && virtualNode) {
    parentNode.appendChild(virtualNode);
    return
  }

  if (isNodeChanged(realNode, virtualNode)) {
    realNode.replaceWith(virtualNode);
    return
  }

  const realChildren = from(realNode.children);
  const virtualChildren = from(virtualNode.children);
  const length = Math.max(realChildren.length, virtualChildren.length);

  from({length})
    .map((v, i) => [
      realChildren[i],
      virtualChildren[i]
    ])
    .forEach(([realChild, virtualChild]) => {
      applyDiff(
        realNode,
        realChild,
        virtualChild
      )
    });
};


export default applyDiff;
