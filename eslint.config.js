const reactNativeConfig = require('@react-native/eslint-config/flat');
const testingLibrary = require('eslint-plugin-testing-library');

module.exports = [
  {
    ignores: ['android/', 'ios/', 'vendor/', 'coverage/'],
  },
  ...reactNativeConfig,
  {
    // No Flow code here, and the bundled eslint-plugin-ft-flow 2.x crashes on ESLint 9.
    rules: {
      'ft-flow/define-flow-type': 'off',
      'ft-flow/use-flow-type': 'off',
    },
  },
  {
    // Type-aware rules, so deprecated APIs and missing return types are errors.
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-deprecated': 'error',
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        { allowExpressions: true },
      ],
    },
  },
  {
    files: ['test/unit/**/*.test.{ts,tsx}'],
    ...testingLibrary.configs['flat/react'],
  },
];
