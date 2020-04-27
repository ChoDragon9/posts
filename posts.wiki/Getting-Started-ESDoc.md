### Basic
#### Install
```bash
npm install --save-dev esdoc esdoc-standard-plugin

yarn add esdoc esdoc-standard-plugin --dev
```

#### Config
> .esdoc.json
```json
{
  "source": "./src",
  "destination": "./docs",
  "plugins": [
    {"name": "esdoc-standard-plugin"}
  ]
}
```

#### Sample Code
```js
/**
 * this is MyClass.
 */
export default class MyClass {
  /**
   * @param {number} a - this is a value.
   * @param {number} b - this is a value.
   * @return {number} result of the sum value.
   */
  sum(a, b){
    return a + b;
  }
}
```

#### Run
```bash
./node_modules/.bin/esdoc
open ./docs/index.html
```

### Integrate Test Code
> .esdoc.json
```json
{
  "source": "./src",
  "destination": "./docs",
  "plugins": [
  {
    "name": "esdoc-standard-plugin",
    "option": {
      "test": {
        "source": "./test/",
        "interfaces": ["describe", "it", "context", "suite", "test"],
        "includes": ["(spec|Spec|test|Test)\\.js$"],
        "excludes": ["\\.config\\.js$"]
      }
    }
  }]
}
```
> use `@test`
```js
/** @test {MyClass} */
describe('MyClass has foo bar feature', ()=>{

  /** @test {MyClass#baz} */
  it('MyClass#baz returns magic value', ()=>{
    assert(true);
  });
});
```

### [ESDoc ECMAScript Proposal Plugin](https://github.com/esdoc/esdoc-plugins/tree/master/esdoc-ecmascript-proposal-plugin)
#### Install
```bash
npm i esdoc-ecmascript-proposal-plugin -D

yarn add esdoc-ecmascript-proposal-plugin -D
```

#### Config
```js
{
  "source": "./src",
  "destination": "./doc",
  "plugins": [
    {"name": "esdoc-ecmascript-proposal-plugin", "option": {"all": true}}
  ]
}
```
> If you want to enable each proposals
```js
{
  "source": "./src",
  "destination": "./doc",
  "plugins": [
    {
      "name": "esdoc-ecmascript-proposal-plugin",
      "option": {
        "classProperties": true,
        "objectRestSpread": true,
        "doExpressions": true,
        "functionBind": true,
        "functionSent": true,
        "asyncGenerators": true,
        "decorators": true,
        "exportExtensions": true,
        "dynamicImport": true
      }
    }
  ]
}
```