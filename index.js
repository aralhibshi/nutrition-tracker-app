/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { setupI18n } from './src/i18n';

setupI18n();

AppRegistry.registerComponent(appName, () => App);
