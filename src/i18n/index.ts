import './polyfills';

import i18n from 'i18next';
import ICU from 'i18next-icu';
import { initReactI18next } from 'react-i18next';
import {
  AppState,
  I18nManager,
  Linking,
  Platform,
  type EventSubscription,
} from 'react-native';
import {
  findBestLanguageTag,
  openAppLanguageSettings,
} from 'react-native-localize';
import RNRestart from 'react-native-restart';

import {
  defaultLanguage,
  intlLocale,
  isLanguage,
  languages,
  resolveLanguage,
  type Language,
} from './languages';
import { syncLayoutDirection } from './layoutDirection';
import ar from './locales/ar';
import en from './locales/en';

const directionRestartReason: string = 'layout-direction';

const restartForDirection = (): void =>
  RNRestart.restart(directionRestartReason);

// Numbers inside ICU messages (such as `#` in plurals) use the app's
// numbering system too.
const parseLngForICU = (lng: string): string =>
  isLanguage(lng) ? intlLocale(lng) : lng;

// The user's manual override; null follows the device language.
let chosen: Language | null = null;
let appStateSubscription: EventSubscription | null = null;

function currentLanguage(): Language {
  return resolveLanguage(chosen, findBestLanguageTag(languages)?.languageTag);
}

/**
 * The device or per-app language can change while the app is in the
 * background (Android keeps the JavaScript running), so check again each
 * time the app becomes active.
 */
function followLanguageChanges(): void {
  appStateSubscription?.remove();
  appStateSubscription = AppState.addEventListener('change', state => {
    if (state !== 'active') {
      return;
    }
    const language: Language = currentLanguage();
    if (language === i18n.language) {
      return;
    }
    i18n
      .changeLanguage(language)
      .then(() =>
        syncLayoutDirection(language, I18nManager, restartForDirection, false),
      );
  });
}

/**
 * Initialises translations synchronously, so the first render already has
 * them, then checks the layout direction in the background.
 *
 * `chosenLanguage` is the user's manual override, read from storage by the
 * caller; null follows the device language.
 */
export function setupI18n(chosenLanguage: Language | null = null): Language {
  chosen = chosenLanguage;
  const language: Language = currentLanguage();

  i18n
    .use(ICU)
    .use(initReactI18next)
    .init({
      resources: { en: { translation: en }, ar: { translation: ar } },
      lng: language,
      fallbackLng: defaultLanguage,
      supportedLngs: languages,
      initAsync: false,
      interpolation: { escapeValue: false },
      i18nFormat: { parseLngForICU },
    });

  RNRestart.getReason()
    .then(reason =>
      syncLayoutDirection(
        language,
        I18nManager,
        restartForDirection,
        reason === directionRestartReason,
      ),
    )
    .catch(() => {
      // Without the restart reason, assume a normal launch.
      syncLayoutDirection(language, I18nManager, restartForDirection, false);
    });

  followLanguageChanges();

  return language;
}

/**
 * Switches language. `persist` saves the choice before a possible restart,
 * so the app comes back in the chosen language.
 */
export async function changeLanguage(
  language: Language,
  persist: (language: Language) => Promise<void>,
): Promise<void> {
  await persist(language);
  chosen = language;
  await i18n.changeLanguage(language);
  syncLayoutDirection(language, I18nManager, restartForDirection, false);
}

/**
 * Opens the system's language setting for this app: the per-app language
 * screen on Android 13+, otherwise the app's page in Settings (on iOS it
 * includes Language, because the app declares more than one).
 */
export async function openLanguageSettings(): Promise<void> {
  if (Platform.OS === 'android') {
    try {
      await openAppLanguageSettings();
      return;
    } catch {
      // Older Android versions have no per-app language screen.
    }
  }
  await Linking.openSettings();
}

export { i18n };
