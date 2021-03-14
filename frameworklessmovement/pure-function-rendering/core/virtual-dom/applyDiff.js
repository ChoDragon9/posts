import isNodeChanged from './isNodeChanged.js';

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

  const realChildren = Array.from(realNode.children);
  const virtualChildren = Array.from(virtualNode.children);
  const length = Math.max(realChildren.length, virtualChildren.length);

  Array
    .from({length})
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
