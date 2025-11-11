import { useContext } from 'react';
import { BackendApiContext } from 'src/contexts/BackendApiContex';
import { useAuthStore } from 'src/store/authStore';
import { components } from 'src/schemes/openapi';
import { showToast } from 'src/helpers/showToast';

type SignInRequest = components['schemas']['SignInRequest'];
type SignInResponse = components['schemas']['SignInResponse'];

interface LoginCredentials {
  email: string;
  password: string;
}

export const useLogin = () => {
  const backendApi = useContext(BackendApiContext);
  const { setAccessToken, setRefreshToken, setIsLogin, setUserMetadata } = useAuthStore();

  const loginMutation = backendApi.useMutation('post', '/v1/auth/sign-in', {
    onSuccess: (data) => {
      if (data.data) {
        const { accessToken, refreshToken, id, role } = data.data as SignInResponse;
        
        // Update auth store
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        setUserMetadata({ uid: id });
        setIsLogin(true);

        showToast('success', 'Login successful!');
      }
    },
    onError: (error: any) => {
      console.error('Login error:', error);
      const errorMessage = error?.message || 'Login failed. Please check your credentials.';
      showToast('warning', errorMessage);
    },
  });

  return {
    login: (credentials: LoginCredentials) => {
      loginMutation.mutate({
        body: credentials as SignInRequest,
      });
    },
    isLoading: loginMutation.isPending,
    isError: loginMutation.isError,
    isSuccess: loginMutation.isSuccess,
    error: loginMutation.error,
  };
};
