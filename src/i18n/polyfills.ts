// Hermes doesn't provide Intl.PluralRules, which ICU plurals need. The
// polyfill only installs itself when the engine lacks the feature.
import '@formatjs/intl-pluralrules/polyfill.js';
import '@formatjs/intl-pluralrules/locale-data/ar.js';
import '@formatjs/intl-pluralrules/locale-data/en.js';
