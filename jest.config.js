const preset = require('@react-native/jest-preset/jest-preset.js');

module.exports = {
  preset: '@react-native/jest-preset',
  testMatch: ['<rootDir>/test/unit/**/*.test.[jt]s?(x)'],
  // Keep the preset's setup and add the native module mocks.
  setupFiles: [...preset.setupFiles, '<rootDir>/test/setup.ts'],
  // The preset's pattern, plus intl-messageformat and its @formatjs
  // dependencies, which only ship ES modules.
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|intl-messageformat|@formatjs)/)',
  ],
};
