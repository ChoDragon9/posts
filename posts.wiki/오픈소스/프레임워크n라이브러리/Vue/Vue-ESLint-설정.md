---
title: Vue ESLint 설정
---

Nuxt 기반한 프로젝트에서 `vue/eslint-plugin-vue`를 사용중이다. prettier 를 사용하려고 검토하는 도중 우연히 `vue/eslint-plugin-vue`에 룰이 많다는 것을 알게 되었다. 초기 세팅 시에 잡혀있는 `plugin:vue/recommended`는 굉장히 약한 수준의 룰이다. [eslint-plugin-vue](https://eslint.vuejs.org/rules/)를 참고해서 아래와 같이 룰을 수정했다.

- `rules`에 prettier로 작업했던 유사한 룰을 추가했다.
- 기본룰 수준을 [plugin:vue/recommended](https://eslint.vuejs.org/rules/#priority-b-strongly-recommended-improving-readability-for-vue-js-2-x)에서 [plugin:vue/strongly-recommended](https://eslint.vuejs.org/rules/#priority-b-strongly-recommended-improving-readability-for-vue-js-2-x)로 변경했다.
```js
module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true
  },
  plugins: ['vue'],
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended',
    'plugin:vue/strongly-recommended',
  ],
  parserOptions: {
    sourceType: 'module'
  },
  rules: {
    'vue/html-self-closing': 'off',
    'vue/component-name-in-template-casing': ['error', 'kebab-case', {
      registeredComponentsOnly: false
    }],
    'vue/max-attributes-per-line': ['error', {
      'singleline': 1,
      'multiline': {
        'max': 1,
        'allowFirstLine': false
      }
    }],
    'vue/singleline-html-element-content-newline': ['error', {
      'ignoreWhenNoAttributes': false,
      'ignoreWhenEmpty': false,
      'ignores': []
    }]
  }
}

```