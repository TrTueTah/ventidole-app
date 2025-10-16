import { View } from 'react-native';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useRemoteConfigStore } from './store/remoteConfig/remoteConfigStore';
import AppLoader from 'screens/App/AppLoader/AppLoader';
import { blackColor } from 'constants/colors';
import BackendApiProvider from 'contexts/BackendApiContex';
import { AuthProvider } from 'contexts/AuthContext';
import Navigator from 'navigator/Navigator';

const AppSideEffects = () => {
  // usePushNotifications();
  // useNewCounts();
  return null;
};

const BootFlow = () => {
  // Ensure user is fetched even while navigation shows loader
  // useUser();
  return null;
};

const Main = () => {
  const backendApi = useRemoteConfigStore(state => state.backendApi);

  if (!backendApi) {
    return <AppLoader text="API is not ready" />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: blackColor }}>
        <BackendApiProvider backendApi={backendApi}>
          <AppSideEffects />
          <AuthProvider>
            <BootFlow />
            <Navigator />
            {/* <LocalNotification /> */}
          </AuthProvider>
        </BackendApiProvider>
      </View>
    </GestureHandlerRootView>
  );
};

export default Main;
