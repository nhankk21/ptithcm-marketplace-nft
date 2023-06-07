import { registerRootComponent } from 'expo';
import { QueryClient, QueryClientProvider } from 'react-query';
import Toast from 'react-native-toast-message';
import { LogBox } from 'react-native';

import App from './App';
import { setupPrivateRequest } from '@services/api';

const queryClient = new QueryClient({});

setupPrivateRequest(queryClient);

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const EntireApp = () => (
  <QueryClientProvider client={queryClient}>
    <App />
    <Toast />
  </QueryClientProvider>
);

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(EntireApp);
