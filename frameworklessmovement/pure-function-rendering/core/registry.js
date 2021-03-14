import {clone, from} from '../helper.js';

const COMPONENT_KEY = '[data-component]';

const registry = new Map();

const renderWrapper = component => {
  return (targetElement, state) => {
    const element = component(targetElement, state);
    const childComponents = element.querySelectorAll(COMPONENT_KEY);

    from(childComponents)
      .forEach(child => {
        const componentName = child.dataset.component;

        if (registry.has(componentName)) {
          const componentFn = registry.get(componentName);
          child.replaceWith(componentFn(child, state));
        }
      });

    return element;
  }
};

const add = (componentName, componentFn) => {
  registry.set(componentName, renderWrapper(componentFn));
};

const renderRoot = (root, state) => {
  return renderWrapper(clone)(root, state)
};

export default {
  add,
  renderRoot
}
