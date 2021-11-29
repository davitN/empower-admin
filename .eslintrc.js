module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:@typescript-eslint/recommended', 'airbnb', 'airbnb-typescript',],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'import'],
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'react/function-component-definition': 'off',
    '@typescript-eslint/explicit-module-boundary-types':'off',
    'arrow-body-style': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', 'tsx'] }],
    'react/react-in-jsx-scope': 'off',
    'jsx-a11y/label-has-associated-control':'off',
    '@typescript-eslint/no-use-before-define':'off',
    'max-len': 'off',
    'react/require-default-props': 'off',
    'default-param-last':'off',
    "@typescript-eslint/no-unused-expressions":'off',
    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {
          String: false,
          Boolean: false,
          Number: false,
          Symbol: false,
          '{}': false,
          Object: false,
          object: false,
          Function: false,
        },
        extendDefaults: true,
      },
    ],
  },
};
