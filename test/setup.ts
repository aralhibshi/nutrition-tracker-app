// Mocks for native modules, which don't exist outside a device.

jest.mock('react-native-localize', () =>
  jest.requireActual('react-native-localize/mock'),
);

jest.mock('react-native-restart', () =>
  jest.requireActual('./mocks/reactNativeRestart'),
);

// The library's own mock renders children straight away, with fixed insets.
// It exports the mocked module as its default export.
jest.mock(
  'react-native-safe-area-context',
  () =>
    jest.requireActual<{ default: unknown }>(
      'react-native-safe-area-context/jest/mock',
    ).default,
);
