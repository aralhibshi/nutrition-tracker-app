# To do

Work deferred until its dependencies exist. Remove items as they're done.

## Milestones

Each milestone ends with a minor version bump (`npm version minor`); 1.0.0 is
the store release.

### 0.1.0: Offline foundations

- [ ] CI with GitHub Actions: format check, lint, type-check and Jest on every
      push.
- [ ] API repo set up with its own CI.
- [ ] Local database with migrations (op-sqlite and Drizzle).
- [ ] Food search from the bundled database (USDA FoodData Central, FTS5
      index).
- [ ] Food and water logging.
- [ ] Today view: calories, macros and water against targets.

### Later milestones

- **0.2.0: Sync.** Accounts, the push and pull API, both halves of the sync
  engine, sign-in and account deletion.
- **0.3.0: Fasting.** Prayer times, the eating window, Ramadan mode, reminders
  and feature flags.
- **0.4.0: Health and language.** Apple Health and Health Connect, and full
  Arabic. The i18n and RTL groundwork is already in place.
- **1.0.0: Store release.** Release pipeline, monitoring, end-to-end flows,
  curated regional foods, TestFlight and a Play internal test.

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
