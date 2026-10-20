import type { Translations } from '../types';
import common from './common';
import * as components from './components';
import * as screens from './screens';

const ar = {
  common,
  screens,
  components,
} satisfies Translations;

export default ar;
