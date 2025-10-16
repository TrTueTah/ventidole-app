import { AppRegistry, LogBox } from 'react-native';
import Bugsnag from '@bugsnag/react-native';
import React from 'react';
import App from './src/App';
import { name as appName } from './app.json';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { KeyboardProvider } from 'react-native-keyboard-controller';

if (__DEV__) {
  require('./ReactotronConfig');
}

LogBox.ignoreLogs([
  'Module provider RNDatePickerManager does not conform to RCTModuleProvider',
  'ViewPropTypes will be removed',
  'ColorPropType will be removed',
]);

Bugsnag.start();

const ErrorBoundary = Bugsnag.getPlugin('react').createErrorBoundary(React);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

// Wrap the app with necessary providers
const AppWithProviders: React.FC = () => {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <KeyboardProvider>
          <App />
        </KeyboardProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

// Register root component for Expo dev client / updates
AppRegistry.registerComponent(appName, () => AppWithProviders);
