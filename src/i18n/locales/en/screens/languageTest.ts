// Temporary: strings for the language test screen. Remove with the screen.
const languageTest = {
  title: 'Language test',
  intro:
    'Checks translations, plurals, number and date formatting, and the layout direction.',
  language: 'Language: {name}',
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
  choiceTitle: 'App language',
  deviceOption: 'Device',
  choiceHint:
    'Switching between English and Arabic restarts the app to change the layout direction.',
} as const;

export default languageTest;
