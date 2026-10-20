import IntlMessageFormat from 'intl-messageformat';

import {
  changeLanguage,
  i18n,
  languageChoice,
  setupI18n,
} from '../../../src/i18n';
import ar from '../../../src/i18n/locales/ar';
import en from '../../../src/i18n/locales/en';

function keysOf(value: object, prefix = ''): string[] {
  return Object.entries(value).flatMap(([key, child]) =>
    typeof child === 'object' && child !== null
      ? keysOf(child, `${prefix}${key}.`)
      : [`${prefix}${key}`],
  );
}

describe('i18n', () => {
  beforeAll(() => {
    setupI18n('en');
  });

  test('Arabic and English have the same keys', () => {
    expect(keysOf(ar).sort()).toEqual(keysOf(en).sort());
  });

  test('uses the ICU message format', () => {
    expect(i18n.modules.i18nFormat).toBeDefined();
  });

  test('selects Arabic plural forms', () => {
    const message = new IntlMessageFormat(
      '{count, plural, zero {zero} one {one} two {two} few {few} many {many} other {other}}',
      'ar',
    );

    expect(
      [0, 1, 2, 3, 11, 100].map(count => message.format({ count })),
    ).toEqual(['zero', 'one', 'two', 'few', 'many', 'other']);
  });

  test('changeLanguage saves the choice before switching', async () => {
    const persist = jest.fn();

    await changeLanguage('ar', persist);

    expect(persist).toHaveBeenCalledWith('ar');
    expect(i18n.language).toBe('ar');
    expect(languageChoice()).toBe('ar');
  });

  test('changeLanguage with null follows the device language', async () => {
    const persist = jest.fn();
    await changeLanguage('ar', persist);

    await changeLanguage(null, persist);

    expect(persist).toHaveBeenLastCalledWith(null);
    expect(i18n.language).toBe('en');
    expect(languageChoice()).toBeNull();
  });
});
