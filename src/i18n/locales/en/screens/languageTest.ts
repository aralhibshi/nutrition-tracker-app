// Temporary: strings for the language test screen. Remove with the screen.
const languageTest = {
  title: 'Language test',
  intro:
    'Checks translations, plurals, number and date formatting, and the layout direction.',
  language: 'Language: {name}',
  languageName: 'English',
  direction: 'Layout direction: {direction}',
  ltr: 'left to right',
  rtl: 'right to left',
  pluralTitle: 'Plurals',
  glasses:
    '{count, plural, =0 {No glasses of water yet} one {# glass of water} other {# glasses of water}}',
  addGlass: 'Add a glass',
  removeGlass: 'Remove a glass',
  formattingTitle: 'Formatting',
  number: 'Number: {value}',
  date: 'Date: {value}',
  layoutTitle: 'Layout',
  start: 'Start',
  end: 'End',
  changeLanguage: 'Change language',
  changeLanguageHint: 'Opens the language setting for this app.',
} as const;

export default languageTest;
