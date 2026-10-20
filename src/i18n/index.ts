import './polyfills';

import i18n from 'i18next';
import ICU from 'i18next-icu';
import { initReactI18next } from 'react-i18next';
import { AppState, I18nManager, type EventSubscription } from 'react-native';
import { findBestLanguageTag } from 'react-native-localize';
import RNRestart from 'react-native-restart';

import {
  defaultLanguage,
  intlLocale,
  isLanguage,
  languages,
  resolveLanguage,
  type Language,
} from './languages';
import { syncLayoutDirection, type DirectionManager } from './layoutDirection';
import ar from './locales/ar';
import en from './locales/en';

const directionRestartReason: string = 'layout-direction';

const restartForDirection = (): void => {
  RNRestart.restart(directionRestartReason);
};

// I18nManager.isRTL only changes after a restart, so a direction requested
// earlier in this session (with its restart still pending) would otherwise
// look unchanged. Compare against the requested direction instead.
let requestedRTL: boolean | null = null;

const directionManager: DirectionManager = {
  get isRTL(): boolean {
    return requestedRTL ?? I18nManager.isRTL;
  },
  allowRTL(allow: boolean): void {
    I18nManager.allowRTL(allow);
  },
  forceRTL(force: boolean): void {
    requestedRTL = force;
    I18nManager.forceRTL(force);
  },
};

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
    if (state === 'active') {
      // i18next resolves changeLanguage even if loading fails, and the
      // translations are bundled, so there's no rejection to handle.
      void applyCurrentLanguage();
    }
  });
}

async function applyCurrentLanguage(): Promise<void> {
  const language: Language = currentLanguage();
  if (language === i18n.language) {
    return;
  }
  await i18n.changeLanguage(language);
  syncLayoutDirection(language, directionManager, restartForDirection, false);
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

  // With bundled translations and initAsync: false, init finishes
  // synchronously; its promise has nothing left to report.
  void i18n
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

  // Resolve the language again when the check runs: the user may already
  // have switched it, and a stale value would set the wrong direction.
  RNRestart.getReason()
    .then(reason =>
      syncLayoutDirection(
        currentLanguage(),
        directionManager,
        restartForDirection,
        reason === directionRestartReason,
      ),
    )
    .catch(() => {
      // Without the restart reason, assume a normal launch.
      syncLayoutDirection(
        currentLanguage(),
        directionManager,
        restartForDirection,
        false,
      );
    });

  followLanguageChanges();

  return language;
}

/** The user's manual choice; null follows the device language. */
export function languageChoice(): Language | null {
  return chosen;
}

/**
 * Switches language. `choice` is a language, or null to follow the device.
 * `persist` saves the choice before a possible restart, so the app comes
 * back in the chosen language.
 */
export async function changeLanguage(
  choice: Language | null,
  persist: (choice: Language | null) => void | Promise<void>,
): Promise<void> {
  await persist(choice);
  chosen = choice;
  const language: Language = currentLanguage();
  await i18n.changeLanguage(language);
  syncLayoutDirection(language, directionManager, restartForDirection, false);
}

export { i18n };
