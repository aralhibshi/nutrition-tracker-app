import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import LanguageTestScreen from './src/screens/languageTest/LanguageTestScreen';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      <LanguageTestScreen />
    </SafeAreaProvider>
  );
}

export default App;
