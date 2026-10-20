import {
  syncLayoutDirection,
  type DirectionManager,
} from '../../../src/i18n/layoutDirection';

type FakeManager = DirectionManager & { calls: string[] };

function fakeManager(isRTL: boolean): FakeManager {
  const manager: FakeManager = {
    isRTL,
    calls: [],
    allowRTL(allow) {
      manager.calls.push(`allowRTL(${allow})`);
    },
    forceRTL(force) {
      manager.calls.push(`forceRTL(${force})`);
    },
  };
  return manager;
}

describe('syncLayoutDirection', () => {
  test('does nothing when the direction already matches', () => {
    const manager = fakeManager(true);
    const restart = jest.fn();

    expect(syncLayoutDirection('ar', manager, restart, false)).toBe(
      'unchanged',
    );
    expect(manager.calls).toEqual([]);
    expect(restart).not.toHaveBeenCalled();
  });

  test('switches to right-to-left and restarts for Arabic', () => {
    const manager = fakeManager(false);
    const restart = jest.fn();

    expect(syncLayoutDirection('ar', manager, restart, false)).toBe(
      'restarting',
    );
    expect(manager.calls).toEqual(['allowRTL(true)', 'forceRTL(true)']);
    expect(restart).toHaveBeenCalledTimes(1);
  });

  test('switches back to left-to-right and restarts for English', () => {
    const manager = fakeManager(true);
    const restart = jest.fn();

    expect(syncLayoutDirection('en', manager, restart, false)).toBe(
      'restarting',
    );
    expect(manager.calls).toEqual(['allowRTL(false)', 'forceRTL(false)']);
    expect(restart).toHaveBeenCalledTimes(1);
  });

  test('does not restart again if a direction restart did not take effect', () => {
    const manager = fakeManager(false);
    const restart = jest.fn();

    expect(syncLayoutDirection('ar', manager, restart, true)).toBe('skipped');
    expect(manager.calls).toEqual([]);
    expect(restart).not.toHaveBeenCalled();
  });
});
