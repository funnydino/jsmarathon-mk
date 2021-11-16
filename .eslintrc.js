/* eslint-disable */
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    // 'linebreak-style': ['error', 'windows'],
    'no-param-reassign': ["error", { "props": false }],
    'no-unused-expressions': ["error", { "allowTernary": true }],
    'max-len': ["error", { "code": 130 }],
  },
};
