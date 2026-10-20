# Nutrition Tracker

An offline-first nutrition and water tracker for iOS and Android, built around fasting: Ramadan, and
eating windows in general. Arabic and English, with full right-to-left support.

> **Work in progress.** The current milestone is
> [0.1.0 Offline foundations](https://github.com/aralhibshi/nutrition-tracker-app/milestones). The
> app can't be used for tracking yet.

## What it will do (v1)

- Log food from a bundled food database that works offline, or quick-add calories and macros
- Log water with one tap, against a daily target
- See the day's calories, protein, carbs, fat and water against your targets
- Fasting mode: an eating window from iftar to suhoor, calculated on the device from prayer times
- Optional account for backup and sync across devices
- Sync with Apple Health and Health Connect, and show the day's steps from them

## Built so far

- React Native 0.88 on the New Architecture with Hermes, and TypeScript with strict compiler and
  lint rules
- Arabic and English with ICU plurals, typed translation keys, and an in-app language switch that
  changes the layout direction. Tested on iOS and Android.
- Design tokens for colours, spacing, radius and type, with an automated contrast check
- CI on every push (format, lint, type-check and tests), Git hooks, and a manually started Android
  build

## Roadmap

| Milestone                 | Scope                                                           |
| ------------------------- | --------------------------------------------------------------- |
| 0.1.0 Offline foundations | Local database, food search, food and water logging, Today view |
| 0.2.0 Sync                | Accounts, the sync API and engine, account deletion             |
| 0.3.0 Fasting             | Prayer times, eating window, Ramadan mode, reminders            |
| 0.4.0 Health and language | Apple Health, Health Connect, full Arabic                       |
| 1.0.0 Store release       | Release pipeline, monitoring, TestFlight and Play testing       |

Work is tracked in [issues](https://github.com/aralhibshi/nutrition-tracker-app/issues).

## Running it

Requires Node 24.15 or later, Ruby 3.4 with Bundler, Xcode for iOS and Android Studio for Android.

```sh
npm ci
bundle install
cd ios && bundle exec pod install && cd ..
npm start          # Metro
npm run ios        # or: npm run android
```

`npm run check` runs every check that CI runs.

## Author

Ahmed Alhibshi, [ahmedalhibshi.dev](https://ahmedalhibshi.dev)
