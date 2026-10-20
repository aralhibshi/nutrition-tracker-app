/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { setupI18n } from './src/i18n';
import { readLanguageChoice } from './src/storage/preferences';

setupI18n(readLanguageChoice());

AppRegistry.registerComponent(appName, () => App);
