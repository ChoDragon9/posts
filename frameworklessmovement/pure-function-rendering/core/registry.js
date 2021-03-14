import {clone, from} from '../helper.js';

const COMPONENT_KEY = '[data-component]';

const registry = {};

const renderWrapper = component => {
  return (targetElement, state) => {
    const element = component(targetElement, state);
    const childComponents = element.querySelectorAll(COMPONENT_KEY);

    from(childComponents)
      .forEach(child => {
        const componentName = child.dataset.component;
        const componentFn = registry[componentName];

        if (componentFn) {
          child.replaceWith(componentFn(child, state));
        }
      });

    return element;
  }
};

const add = (componentName, componentFn) => {
  registry[componentName] = renderWrapper(componentFn);
};

const renderRoot = (root, state) => {
  return renderWrapper(clone)(root, state)
};

export default {
  add,
  renderRoot
}
