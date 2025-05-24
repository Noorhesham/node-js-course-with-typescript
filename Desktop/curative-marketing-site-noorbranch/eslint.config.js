const js = require('@eslint/js');
const prettier = require('eslint-config-prettier');

module.exports = [
  js.configs.recommended,
  prettier,
  {
    ignores: ['**/node_modules/**', '**/dist/**', '**/.next/**'],
    rules: {
      // Add any custom rules here
      'no-undef': 'off',
    },
  },
];
