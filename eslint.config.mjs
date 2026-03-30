import globals from 'globals';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';

export default [
  reactPlugin.configs.flat.recommended,
  reactHooksPlugin.configs.flat['recommended-latest'],
  {
    files: ['src/**/*.{js,jsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'react/no-direct-mutation-state': 'off',
      'react/prop-types': 'off',
      'require-jsdoc': 'off',
      'max-len': ['warn', { ignorePattern: 'import.*' }],
    },
  },
];
