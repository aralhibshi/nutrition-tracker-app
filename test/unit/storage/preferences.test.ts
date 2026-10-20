import {
  readLanguageChoice,
  saveLanguageChoice,
} from '../../../src/storage/preferences';

describe('language choice', () => {
  afterEach(() => {
    saveLanguageChoice(null);
  });

  test('follows the device when nothing is saved', () => {
    expect(readLanguageChoice()).toBeNull();
  });

  test('reads back the saved language', () => {
    saveLanguageChoice('ar');

    expect(readLanguageChoice()).toBe('ar');
  });

  test('saving null goes back to following the device', () => {
    saveLanguageChoice('en');
    saveLanguageChoice(null);

    expect(readLanguageChoice()).toBeNull();
  });
});
