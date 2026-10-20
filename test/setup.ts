// Mocks for native modules, which don't exist outside a device.

// Like a device whose best match is the first supported language (English).
// The library's mock always answers 'en-US', which isn't a supported tag.
jest.mock('react-native-localize', () => ({
  ...jest.requireActual<object>('react-native-localize/mock'),
  findBestLanguageTag: <T extends string>(tags: readonly T[]) => {
    const languageTag: T | undefined = tags[0];
    return languageTag === undefined
      ? undefined
      : { languageTag, isRTL: false };
  },
}));

// MMKV uses its own in-memory store under Jest, so Nitro's native side is
// never called; the stub only stops it looking for the native module on import.
jest.mock('react-native-nitro-modules', () => ({
  NitroModules: { createHybridObject: jest.fn() },
}));

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
