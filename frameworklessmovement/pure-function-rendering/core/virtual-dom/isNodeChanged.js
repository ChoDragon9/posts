const isDiffAttrLength = (node1, node2) => {
  const n1Attrs = node1.attributes;
  const n2Attrs = node2.attributes;

  return n1Attrs.length !== n2Attrs.length;
};

const isDiffAttrValue = (node1, node2) => {
  return Array
    .from(node1.attributes)
    .find(attr => {
      const {name} = attr;
      const attr1 = node1.getAttribute(name);
      const attr2 = node2.getAttribute(name);

      return attr1 !== attr2
    });
};

const isDiffTextContent = (node1, node2) => {
  return node1.children.length === 0 &&
    node2.children.length === 0 &&
    node1.textContent !== node2.textContent;
};

export default (node1, node2) => {
  return isDiffAttrLength(node1, node2)
    || isDiffAttrValue(node1, node2)
    || isDiffTextContent(node1, node2);
};
