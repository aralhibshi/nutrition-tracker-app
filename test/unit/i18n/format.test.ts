import { formatDate, formatNumber } from '../../../src/i18n/format';
import { intlLocale } from '../../../src/i18n/languages';

describe('intlLocale', () => {
  test('adds the numbering system to the language', () => {
    expect(intlLocale('ar')).toBe('ar-u-nu-latn');
    expect(intlLocale('en')).toBe('en-u-nu-latn');
  });
});

describe('formatNumber', () => {
  test('uses 0-9 digits in Arabic', () => {
    expect(formatNumber(1234.5, 'ar')).toMatch(/^[0-9.,٬٫\s]+$/);
    expect(formatNumber(1234.5, 'ar')).not.toMatch(/[٠-٩]/);
  });

  test('formats English numbers', () => {
    expect(formatNumber(1234.5, 'en')).toBe('1,234.5');
  });
});

describe('formatDate', () => {
  const date = new Date(2027, 1, 18);

  test('uses Arabic names with 0-9 digits', () => {
    const text = formatDate(date, 'ar', { day: 'numeric', month: 'long' });

    expect(text).toContain('18');
    expect(text).toContain('فبراير');
  });

  test('formats English dates', () => {
    expect(formatDate(date, 'en', { day: 'numeric', month: 'long' })).toBe(
      'February 18',
    );
  });
});
