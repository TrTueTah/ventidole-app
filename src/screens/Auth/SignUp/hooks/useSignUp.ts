import { useContext } from 'react';
import { BackendApiContext } from 'src/contexts/BackendApiContex';
import { useAuthStore } from 'src/store/authStore';
import { components } from 'src/schemes/openapi';
import { showToast } from 'src/helpers/showToast';

type SignUpRequest = components['schemas']['SignUpRequest'];
type SignInResponse = components['schemas']['SignInResponse'];

interface SignUpCredentials {
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
}

export const useSignUp = () => {
  const backendApi = useContext(BackendApiContext);
  const { setAccessToken, setRefreshToken, setIsLogin, setUserMetadata } = useAuthStore();

  const signUpMutation = backendApi.useMutation('post', '/v1/auth/sign-up', {
    onSuccess: (data) => {
      console.log('✅ Sign up success - Full response:', JSON.stringify(data, null, 2));
      
      if (data.data) {
        const { accessToken, refreshToken, id, role } = data.data as SignInResponse;
        
        // Update auth store
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        setUserMetadata({ uid: id });
        setIsLogin(true);

        showToast('success', 'Account created successfully!');
      }
    },
    onError: (error: any) => {
      console.error('❌ Sign up error:', error);
      const errorMessage = error?.message || 'Sign up failed. Please try again.';
      showToast('warning', errorMessage);
    },
  });

  return {
    signUp: (credentials: SignUpCredentials) => {
      signUpMutation.mutate({
        body: credentials as SignUpRequest,
      });
    },
    isLoading: signUpMutation.isPending,
    isError: signUpMutation.isError,
    isSuccess: signUpMutation.isSuccess,
    error: signUpMutation.error,
  };
};
