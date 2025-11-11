import { useContext, useState, useEffect } from 'react';
import { BackendApiContext } from 'src/contexts/BackendApiContex';
import { useAppNavigation } from 'src/hooks/useAppNavigation';
import { components } from 'src/schemes/openapi';
import { showToast } from 'src/helpers/showToast';

type SendVerificationRequest = components['schemas']['SendVerificationRequest'];
type VerificationCodeResponse = components['schemas']['VerificationCodeResponse'];
type ConfirmVerificationRequest = components['schemas']['ConfirmVerificationRequest'];
type ConfirmVerificationResponse = components['schemas']['ConfirmVerificationResponse'];

type VerificationType = 'FIND_EMAIL' | 'RESET_PASSWORD' | 'REGISTER_ACCOUNT' | 'UPDATE_PROFILE';
type RouteType = 'resetPassword' | 'register';

interface SendVerificationParams {
  email: string;
}

interface ConfirmVerificationParams {
  email: string;
  code: string;
}

interface UseVerifyEmailParams {
  type: RouteType;
}

export const useVerifyEmail = ({ type }: UseVerifyEmailParams) => {
  const backendApi = useContext(BackendApiContext);
  const navigation = useAppNavigation();
  const [verificationData, setVerificationData] = useState<VerificationCodeResponse | null>(null);
  const [confirmedData, setConfirmedData] = useState<ConfirmVerificationResponse | null>(null);

  // Map route type to API verification type
  const getVerificationType = (routeType: RouteType): VerificationType => {
    switch (routeType) {
      case 'resetPassword':
        return 'RESET_PASSWORD';
      case 'register':
        return 'REGISTER_ACCOUNT';
      default:
        return 'REGISTER_ACCOUNT';
    }
  };

  // Send verification code mutation
  const sendVerificationMutation = backendApi.useMutation('post', '/v1/auth/send-verification', {
    onSuccess: (data) => {
      if (data.data) {
        const responseData = data.data as VerificationCodeResponse;
        setVerificationData(responseData);
        
        const waitTime = Math.floor(responseData.waitSeconds || 60);
        showToast('success', `Verification code sent! Please wait ${waitTime} seconds before requesting again.`);
      }
    },
    onError: (error: any) => {
      console.error('Send verification error:', error);
      const errorMessage = error?.message || 'Failed to send verification code. Please try again.';
      showToast('warning', errorMessage);
    },
  });

  // Confirm verification code mutation
  const confirmVerificationMutation = backendApi.useMutation('post', '/v1/auth/confirm-verification', {
    onSuccess: (data, variables) => {
      console.log('✅ Confirm verification success - Full response:', JSON.stringify(data, null, 2));
      console.log('✅ Response statusCode:', data.statusCode);
      const emailFromRequest = (variables?.body as ConfirmVerificationRequest)?.email;
      // Verification successful - data.data can be null as it's just for verification
      // Store the response data if it exists
      if (data.data) {
        const responseData = data.data as ConfirmVerificationResponse;
        setConfirmedData(responseData);
        console.log('✅ Confirmed data:', responseData);
      }
      
      // Show success toast
      showToast('success', 'Email verified successfully!');
      console.log('✅ Navigating to:', type === 'resetPassword' ? '/reset-password' : '/sign-up');
      
      // Handle navigation based on type
      setTimeout(() => {
        if (type === 'resetPassword') {
          console.log('🔄 Navigating to reset password...');
          navigation.navigate('/reset-password');
        } else {
          console.log('🔄 Navigating to sign up...');
          navigation.navigate('/sign-up', { email: emailFromRequest || '' });
        }
      }, 500);
    },
    onError: (error: any) => {
      console.error('❌ Confirm verification error:', error);
      const errorMessage = error?.message || 'Invalid or expired verification code.';
      showToast('warning', errorMessage);
    },
  });

  return {
    // Send verification
    sendVerification: (params: SendVerificationParams) => {
      sendVerificationMutation.mutate({
        body: {
          email: params.email,
          verificationType: getVerificationType(type),
        } as SendVerificationRequest,
      });
    },
    isSendingVerification: sendVerificationMutation.isPending,
    sendVerificationError: sendVerificationMutation.error,
    verificationData,

    // Confirm verification
    confirmVerification: (params: ConfirmVerificationParams) => {
      confirmVerificationMutation.mutate({
        body: {
          email: params.email,
          code: params.code,
          verificationType: getVerificationType(type),
        } as ConfirmVerificationRequest,
      });
    },
    isConfirmingVerification: confirmVerificationMutation.isPending,
    confirmVerificationError: confirmVerificationMutation.error,
    confirmedData,
    isVerificationConfirmed: confirmVerificationMutation.isSuccess,

    // Reset states
    resetVerification: () => {
      setVerificationData(null);
      setConfirmedData(null);
    },
  };
};
