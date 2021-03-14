import registry from './registry.js';
import applyDiff from './virtual-dom/applyDiff.js';
import registerComponents from './registerComponents.js';

const renderRoot = (rootElement, state) => {
  const newRootElement = registry.renderRoot(rootElement, state);
  const {parentNode} = rootElement;

  applyDiff(parentNode, rootElement, newRootElement);
};

export default (rootElement, state) => {
  registerComponents();
  renderRoot(rootElement, state);
}
