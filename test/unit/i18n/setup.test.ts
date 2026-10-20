import { I18nManager } from 'react-native';
import RNRestart from 'react-native-restart';

import { changeLanguage, setupI18n } from '../../../src/i18n';

function flushPromises(): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, 0));
}

describe('setupI18n', () => {
  test('the startup direction check uses the language current when it runs', async () => {
    let finishReason: (reason: string | null) => void = () => {};
    jest.mocked(RNRestart.getReason).mockReturnValueOnce(
      new Promise(resolve => {
        finishReason = resolve;
      }),
    );
    jest.mocked(RNRestart.restart).mockClear();

    // Starts in Arabic, which needs RTL; Jest's layout is LTR.
    setupI18n('ar');
    // The user switches to English before the startup check finishes.
    await changeLanguage('en', jest.fn());
    finishReason(null);
    await flushPromises();

    // English matches the LTR layout, so nothing should restart.
    expect(RNRestart.restart).not.toHaveBeenCalled();
  });

  test('a switch during a pending direction restart overrides it', async () => {
    const forceRTL = jest.spyOn(I18nManager, 'forceRTL');
    jest.mocked(RNRestart.restart).mockClear();

    // Arabic at launch: the startup check requests RTL and a restart.
    setupI18n('ar');
    await flushPromises();
    expect(forceRTL).toHaveBeenLastCalledWith(true);

    // Switching to English before that restart must request LTR again,
    // even though I18nManager.isRTL still reports the old direction.
    await changeLanguage('en', jest.fn());

    expect(forceRTL).toHaveBeenLastCalledWith(false);
    expect(RNRestart.restart).toHaveBeenCalledTimes(2);
    forceRTL.mockRestore();
  });
});
