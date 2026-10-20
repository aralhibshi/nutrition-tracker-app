import { createMMKV, type MMKV } from 'react-native-mmkv';

import { isLanguage, type Language } from '../i18n/languages';

// Small preferences that must be readable synchronously at startup, before
// the first render. App data lives in the SQLite database instead.
const storage: MMKV = createMMKV({ id: 'preferences' });

const languageKey: string = 'language';

/** The saved language choice; null follows the device language. */
export function readLanguageChoice(): Language | null {
  const value: string | undefined = storage.getString(languageKey);
  return value !== undefined && isLanguage(value) ? value : null;
}

/** Saves the language choice; null goes back to following the device. */
export function saveLanguageChoice(choice: Language | null): void {
  if (choice === null) {
    storage.remove(languageKey);
  } else {
    storage.set(languageKey, choice);
  }
}
