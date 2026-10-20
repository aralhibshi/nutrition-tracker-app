import { intlLocale, type Language } from './languages';

// Use these instead of calling Intl directly, so every number and date uses
// the app's numbering system.

export function formatNumber(
  value: number,
  language: Language,
  options?: Intl.NumberFormatOptions,
): string {
  return new Intl.NumberFormat(intlLocale(language), options).format(value);
}

export function formatDate(
  date: Date,
  language: Language,
  options?: Intl.DateTimeFormatOptions,
): string {
  return new Intl.DateTimeFormat(intlLocale(language), options).format(date);
}
