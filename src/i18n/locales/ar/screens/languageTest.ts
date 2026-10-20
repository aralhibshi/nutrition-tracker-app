import type { Translations } from '../../types';

// Temporary: strings for the language test screen. Remove with the screen.
const languageTest = {
  title: 'اختبار اللغة',
  intro: 'يتحقق من الترجمة وصيغ الجمع وتنسيق الأرقام والتواريخ واتجاه التخطيط.',
  language: 'اللغة: {name}',
  direction: 'اتجاه التخطيط: {direction}',
  ltr: 'من اليسار إلى اليمين',
  rtl: 'من اليمين إلى اليسار',
  pluralTitle: 'صيغ الجمع',
  glasses:
    '{count, plural, =0 {لم تشرب أي كوب ماء بعد} one {كوب ماء واحد} two {كوبا ماء} few {# أكواب ماء} many {# كوبًا من الماء} other {# كوب ماء}}',
  addGlass: 'أضف كوبًا',
  removeGlass: 'احذف كوبًا',
  formattingTitle: 'التنسيق',
  number: 'رقم: {value}',
  date: 'التاريخ: {value}',
  layoutTitle: 'التخطيط',
  start: 'البداية',
  end: 'النهاية',
  choiceTitle: 'لغة التطبيق',
  deviceOption: 'الجهاز',
  choiceHint:
    'التبديل بين العربية والإنجليزية يعيد تشغيل التطبيق لتغيير اتجاه التخطيط.',
} satisfies Translations['screens']['languageTest'];

export default languageTest;
