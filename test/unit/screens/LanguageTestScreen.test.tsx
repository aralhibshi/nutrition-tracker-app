import { render, screen, userEvent } from '@testing-library/react-native';

import { i18n, setupI18n } from '../../../src/i18n';
import LanguageTestScreen from '../../../src/screens/languageTest/LanguageTestScreen';

describe('LanguageTestScreen', () => {
  beforeAll(() => {
    setupI18n('en');
  });

  test('renders English strings', async () => {
    await i18n.changeLanguage('en');
    await render(<LanguageTestScreen />);

    expect(
      screen.getByRole('header', { name: 'Language test' }),
    ).toBeOnTheScreen();
    expect(screen.getByText('Language: English')).toBeOnTheScreen();
    expect(screen.getByText('No glasses of water yet')).toBeOnTheScreen();
  });

  test('renders Arabic strings', async () => {
    await i18n.changeLanguage('ar');
    await render(<LanguageTestScreen />);

    expect(
      screen.getByRole('header', { name: 'اختبار اللغة' }),
    ).toBeOnTheScreen();
    expect(screen.getByText('اللغة: العربية')).toBeOnTheScreen();
  });

  test('steps through the Arabic plural forms', async () => {
    const user = userEvent.setup();
    await i18n.changeLanguage('ar');
    await render(<LanguageTestScreen />);
    const add = screen.getByRole('button', { name: 'أضف كوبًا' });

    await user.press(add);
    expect(screen.getByText('كوب ماء واحد')).toBeOnTheScreen();

    await user.press(add);
    expect(screen.getByText('كوبا ماء')).toBeOnTheScreen();
  });

  test('disables removing a glass at zero', async () => {
    await i18n.changeLanguage('en');
    await render(<LanguageTestScreen />);

    expect(
      screen.getByRole('button', { name: 'Remove a glass' }),
    ).toBeDisabled();
  });
});
