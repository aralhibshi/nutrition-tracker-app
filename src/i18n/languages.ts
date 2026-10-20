// Also declared natively: CFBundleLocalizations in ios/NutritionTracker/Info.plist
// and android/app/src/main/res/xml/locales_config.xml.
export const languages = ['en', 'ar'] as const;

export type Language = (typeof languages)[number];

export const defaultLanguage: Language = 'en';

/** Each language's name in that language, as shown in a language picker. */
export const languageNames: Readonly<Record<Language, string>> = {
  en: 'English',
  ar: 'العربية',
};

const rtlLanguages: ReadonlySet<Language> = new Set(['ar']);

/**
 * Digits used in every language: 'latn' for 0-9, 'arab' for Eastern Arabic
 * digits. Set explicitly because engines differ: Hermes formats Arabic with
 * 0-9 by default, Node with Eastern Arabic digits.
 */
type NumberingSystem = 'latn' | 'arab';

const numberingSystem: NumberingSystem = 'latn';

/** The locale tag to pass to Intl, with the numbering system applied. */
export function intlLocale(language: Language): string {
  return `${language}-u-nu-${numberingSystem}`;
}

export function isLanguage(value: string): value is Language {
  return languages.some(language => language === value);
}

export function isRtl(language: Language): boolean {
  return rtlLanguages.has(language);
}

/**
 * The user's manual choice wins, then the best match for the device's
 * languages, then English.
 */
export function resolveLanguage(
  chosen: Language | null,
  deviceMatch: Language | undefined,
): Language {
  return chosen ?? deviceMatch ?? defaultLanguage;
}
