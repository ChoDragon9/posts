export const Visitor = class {
  visit(action, target, _0=type(action, "function")) {
    throw "override"
  }
};
