import {
  isLanguage,
  isRtl,
  resolveLanguage,
} from '../../../src/i18n/languages';

describe('resolveLanguage', () => {
  test('uses the manual choice over the device language', () => {
    expect(resolveLanguage('en', 'ar')).toBe('en');
  });

  test('follows the device language when there is no manual choice', () => {
    expect(resolveLanguage(null, 'ar')).toBe('ar');
  });

  test('falls back to English when the device language is unsupported', () => {
    expect(resolveLanguage(null, undefined)).toBe('en');
  });
});

describe('isLanguage', () => {
  test('accepts supported languages only', () => {
    expect(isLanguage('ar')).toBe(true);
    expect(isLanguage('en')).toBe(true);
    expect(isLanguage('fr')).toBe(false);
  });
});

describe('isRtl', () => {
  test('is true for Arabic only', () => {
    expect(isRtl('ar')).toBe(true);
    expect(isRtl('en')).toBe(false);
  });
});
