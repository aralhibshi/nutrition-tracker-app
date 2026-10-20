import { isRtl, type Language } from './languages';

export interface DirectionManager {
  readonly isRTL: boolean;
  allowRTL(allow: boolean): void;
  forceRTL(force: boolean): void;
}

export type SyncResult = 'unchanged' | 'restarting' | 'skipped';

/**
 * React Native only applies a change of layout direction after a restart.
 * When the direction for `language` differs from the current one, this sets
 * it and restarts the app.
 *
 * `restartedForDirection` is true when this launch is the result of that
 * restart. If the direction still doesn't match, it doesn't restart again,
 * so a platform that ignores the setting can't cause a restart loop.
 */
export function syncLayoutDirection(
  language: Language,
  manager: DirectionManager,
  restart: () => void,
  restartedForDirection: boolean,
): SyncResult {
  const rtl = isRtl(language);
  if (manager.isRTL === rtl) {
    return 'unchanged';
  }
  if (restartedForDirection) {
    return 'skipped';
  }
  manager.allowRTL(rtl);
  manager.forceRTL(rtl);
  restart();
  return 'restarting';
}
