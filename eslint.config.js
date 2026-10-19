const reactNativeConfig = require('@react-native/eslint-config/flat');

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
];
