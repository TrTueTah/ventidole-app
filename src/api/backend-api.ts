/* eslint-disable no-console */
import createFetchClient, { Middleware } from 'openapi-fetch';
import createClient from 'openapi-react-query';
import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { BACKEND_BASE_URL } from '@env';
import { useAuthStore } from 'src/store/authStore';
import { showToast } from 'helpers/showToast';
import { paths } from 'src/schemes/openapi';

const myMiddleware: Middleware = {
  onError: (error: any) => {
    console.log('onError', error);
    if (error.message.includes('Aborted')) return;
    console.error('error while fetching', error);
  },
  async onRequest({ request }) {
    console.log('onRequest', request);

    const platform = Platform.OS === 'ios' ? 'ios' : 'android';
    const version = DeviceInfo.getVersion();
    const buildNumber = DeviceInfo.getBuildNumber();
    request.headers.set('Content-Type', 'application/json');
    request.headers.set('platform', platform);
    request.headers.set('version', version);
    request.headers.set('buildNumber', buildNumber);

    try {
      const { accessToken, refreshToken } = useAuthStore.getState();
      if (accessToken) {
        request.headers.set('Authorization', `Bearer ${accessToken}`);
        request.headers.set('x-refresh-token', refreshToken);
      }
    } catch (error: any) {
      console.error('❌ myMiddleware: Failed to set access token:', error);
    }
    return request;
  },
  async onResponse({ response }) {
    const newAccessToken = response.headers.get('x-access-token');
    const newRefreshToken = response.headers.get('x-refresh-token');
    if (newAccessToken) {
      const { setAccessToken } = useAuthStore.getState();
      setAccessToken?.(newAccessToken);
    }
    if (newRefreshToken) {
      const { setRefreshToken } = useAuthStore.getState();
      setRefreshToken?.(newRefreshToken);
    }

    if (response.status === 502) {
      showToast(
        'warning',
        'Our servers are currently experiencing issues. Please try again later or contact support.',
      );
    }

    if (response.status === 401) {
      try {
        const responseBody = await response.clone().json();
        if (
          responseBody?.error?.includes('Token expired') ||
          responseBody?.error?.includes('no refresh token available') ||
          responseBody?.error?.includes('Authentication expired')
        ) {
          console.log('🔒 Authentication expired, logging out user');
          const { logout } = useAuthStore.getState();
          logout();
        }
      } catch (error) {
        console.error('Error parsing 401 response:', error);
        const { logout } = useAuthStore.getState();
        logout();
      }
    }

    return response;
  },
};

export const initializeApiClient = async (backendUrl: string) => {
  console.log('initializeApiClient', backendUrl);
  try {
    const fetchClient = createFetchClient<paths>({ baseUrl: backendUrl });
    fetchClient.use(myMiddleware);
    return { queryClient: createClient<paths>(fetchClient), fetchClient };
  } catch (error) {
    console.error('Failed to initialize API client:', error);
    return {
      queryClient: createClient<paths>(
        createFetchClient<paths>({ baseUrl: BACKEND_BASE_URL }),
      ),
      fetchClient: createFetchClient<paths>({ baseUrl: BACKEND_BASE_URL }),
    };
  }
};

export default initializeApiClient;
