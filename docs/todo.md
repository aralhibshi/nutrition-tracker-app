# To do

Work deferred until its dependencies exist. Remove items as they're done.

## i18n

- [ ] **Persist the manual language choice.** `setupI18n(chosenLanguage)` and
      `changeLanguage(language, persist)` are ready; wire them to the settings
      table once the local database exists. Until then the app follows the device
      language.
- [ ] **Decide on the in-app language picker.** The test screen opens the
      system's per-app language setting (iOS Settings › app › Language,
      Android 13+ App language), which needs no storage. An instant in-app
      switch needs the stored choice above.
- [ ] **Confirm the digits decision.** `numberingSystem` in
      `src/i18n/languages.ts` is `'latn'` (0–9); switch to `'arab'` for Eastern
      Arabic digits.
- [ ] **Arabic font.** Load a font covering Arabic and Latin (for example IBM
      Plex Sans Arabic) as part of the design system.
- [ ] **Write the translations** as screens and components are built, then
      remove the temporary language test screen (`src/screens/languageTest`
      and its strings).

## Testing

- [ ] **End-to-end flows with Maestro** in `test/e2e/`: log food offline, sync
      after reconnecting, Ramadan mode, and switching language to Arabic.

## Tooling

- [ ] Turn on `noUncheckedIndexedAccess` in `tsconfig.json`.
- [ ] Remove the `ft-flow` rule overrides in `eslint.config.js` once
      `@react-native/eslint-config` ships `eslint-plugin-ft-flow` 3.x.

## Product scope

- [ ] Move the weekly progress view and reading steps from "later" into v1, and
      add a step target to the targets.
