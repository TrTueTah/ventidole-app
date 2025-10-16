import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { NavigationContainer } from '@react-navigation/native';
import { blackColor, primaryColor, whiteColor } from 'constants/colors';
import { navigationRef, navigationService } from './services/NavigationService';
import { Platform, StatusBar, View } from 'react-native';
import ErrorBoundary from 'components/ErrorBoundary';
import Main from 'src';
import { FC, JSX, useEffect } from 'react';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { selectIsAuthenticated, useAuthStore } from './store/authStore';
import { useRemoteConfigStore } from './store/remoteConfig/remoteConfigStore';
import { useQueryDebugger } from 'hooks/useQueryDebugger';
import { useZustandDebugger } from 'hooks/useZustandDebugger';
import { requestTrackingPermission } from 'react-native-tracking-transparency';
import { Settings } from 'react-native-fbsdk-next';
import styled from 'styled-components/native';
import AppLoader from 'screens/App/AppLoader/AppLoader';
import Bootsplash from 'react-native-bootsplash';
import UpdateAvailableScreen from 'screens/App/UpdateAvailableScreen/UpdateAvailableScreen';
import UnderMaintenance from 'screens/App/UnderMaintenance/UnderMaintenance';

const LoadingContainer = styled.View`
  flex: 1;
  background-color: ${blackColor};
`;

const AppContent: FC = (): JSX.Element => {

  const insets = useSafeAreaInsets();
  const { isLogin } = useAuthStore();
  const isAuthenticated = useAuthStore(selectIsAuthenticated);
  const isInAuthFlow = !isAuthenticated || !isLogin;
  const shouldApplySafeAreaPadding = Platform.OS === 'android' && isInAuthFlow;

  return (
    <BottomSheetModalProvider>
      <NavigationContainer
        ref={navigationRef}
        onReady={() => navigationService.setReady()}
        theme={{
          dark: true,
          colors: {
            background: whiteColor,
            primary: primaryColor,
            card: whiteColor,
            text: blackColor,
            border: whiteColor,
            notification: whiteColor,
          },
          fonts: {
            regular: { fontFamily: 'Montserrat-Regular', fontWeight: '400' },
            medium: { fontFamily: 'Montserrat-Medium', fontWeight: '500' },
            bold: { fontFamily: 'Montserrat-Bold', fontWeight: '700' },
            heavy: { fontFamily: 'Montserrat-Heavy', fontWeight: '900' },
          },
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: whiteColor,
            paddingTop: shouldApplySafeAreaPadding ? insets.top : 0,
          }}
        >
          <ErrorBoundary>
            <Main />
          </ErrorBoundary>
          {/* <DebugBanner /> */}
        </View>
      </NavigationContainer>
    </BottomSheetModalProvider>
  );
};

const App: FC = (): JSX.Element => {

    const isApiReady = useRemoteConfigStore((state) => state.isApiReady);
    const isUpdateNeeded = useRemoteConfigStore((state) => state.isUpdateNeeded);
    const maintenance = useRemoteConfigStore((state) => state.config.maintenance);

    const initialize = useRemoteConfigStore((state) => state.initialize);


    useEffect(() => {
        initialize();
    }, [initialize]);

    useQueryDebugger();
    useZustandDebugger();

    const initializeTracking = async () => {
        const trackingStatus = await requestTrackingPermission();
        if (trackingStatus === 'authorized') {
            Settings.setAdvertiserTrackingEnabled(true);
        } else {
            Settings.setAdvertiserTrackingEnabled(false);
        }
    };

    useEffect(() => {
        initializeTracking();
        StatusBar.setBarStyle('light-content', true);
        if (Platform.OS === 'android') {
            StatusBar.setBackgroundColor('#000000', true);
            StatusBar.setTranslucent(true);
        }
    }, []);

    if (!isApiReady) {
        return (
            <SafeAreaProvider>
                <LoadingContainer>
                    <AppLoader text='API is not ready' />
                </LoadingContainer>
            </SafeAreaProvider>
        );
    }
    if (isUpdateNeeded) {
        Bootsplash.hide();
        return (
            <SafeAreaProvider>
                <LoadingContainer>
                    <UpdateAvailableScreen />
                </LoadingContainer>
            </SafeAreaProvider>
        );
    }
    if (maintenance) {
        Bootsplash.hide();
        return (
            <SafeAreaProvider>
                <LoadingContainer>
                    <UnderMaintenance />
                </LoadingContainer>
            </SafeAreaProvider>
        );
    }
    Bootsplash.hide();

    return (
        <SafeAreaProvider>
            <AppContent />
        </SafeAreaProvider>
    );
};

export default App;
