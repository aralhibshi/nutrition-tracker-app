const reactNativeConfig = require('@react-native/eslint-config/flat');
const typescriptPlugin = require('@typescript-eslint/eslint-plugin');
const testingLibrary = require('eslint-plugin-testing-library');

const typeScriptFiles = ['**/*.ts', '**/*.tsx'];

// typescript-eslint's strictest preset sets, applied to TypeScript files only.
const strictTypeChecked = [
  ...typescriptPlugin.configs['flat/strict-type-checked'],
  ...typescriptPlugin.configs['flat/stylistic-type-checked'],
].map(config => ({ ...config, files: typeScriptFiles }));

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
  ...strictTypeChecked,
  {
    files: typeScriptFiles,
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
      // No casts (`value as Type`); `as const` is still allowed.
      '@typescript-eslint/consistent-type-assertions': [
        'error',
        { assertionStyle: 'never' },
      ],
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/switch-exhaustiveness-check': 'error',
      // Types are written out on purpose, even when they could be inferred.
      '@typescript-eslint/no-inferrable-types': 'off',
      // `void promise;` marks a deliberately unawaited promise
      // (no-floating-promises); void inside expressions stays banned.
      'no-void': ['error', { allowAsStatement: true }],
      // Allow `onPress={() => setValue(next)}`; still flag void elsewhere.
      '@typescript-eslint/no-confusing-void-expression': [
        'error',
        { ignoreArrowShorthand: true },
      ],
    },
  },
  {
    files: ['test/unit/**/*.test.{ts,tsx}'],
    ...testingLibrary.configs['flat/react'],
  },
  {
    // Jest mocks are safe to pass around unbound; the Jest version of the
    // rule knows that, as typescript-eslint recommends for test files.
    files: ['test/**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/unbound-method': 'off',
      'jest/unbound-method': 'error',
    },
  },
];
