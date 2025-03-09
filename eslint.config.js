import globals from 'globals';
import pluginJs from '@eslint/js';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      'no-console': 'off',
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'], 
      'global-require': 'error',
      'no-debugger': 'off',
      'callback-return': 'error',
      'handle-callback-err': 'error',
      'indent': ['error', 2],
      'space-in-parens': ['error', 'never'],
      'space-before-blocks': ['error', 'always'],
      'space-before-function-paren': ['error', 'always']
    },
  },
  pluginJs.configs.recommended,
];
