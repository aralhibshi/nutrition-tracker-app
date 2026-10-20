import { render, screen } from '@testing-library/react-native';

import App from '../../App';
import { setupI18n } from '../../src/i18n';

beforeAll(() => {
  setupI18n('en');
});

test('renders the app', async () => {
  await render(<App />);

  expect(
    screen.getByRole('header', { name: 'Language test' }),
  ).toBeOnTheScreen();
});
