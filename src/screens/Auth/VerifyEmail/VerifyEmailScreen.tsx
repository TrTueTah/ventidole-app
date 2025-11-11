import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { RootStackParamList } from 'typescript/types';
import * as S from './VerifyEmailScreen.style';
import { Formik } from 'formik';
import { verifyEmailSchema } from 'src/schemas/verify-scheme';
import Input from 'components/Inputs/Input';
import Button from 'components/Button/Button';
import CommonAuthLayout from '../Layouts/CommonAuthLayout/CommonAuthLayout';
import { useVerifyEmail } from './hooks/useVerifyEmail';

type VerifyEmailRouteParams = RootStackParamList['/verify-email'];

const VerifyEmailScreen = () => {
  const route = useRoute();
  const params = route.params as VerifyEmailRouteParams;
  const { type = 'register', header } = params || {};
  const [canSendOtp, setCanSendOtp] = useState<boolean>(true);
  const [countdown, setCountdown] = useState<number>(0);
  
  const {
    sendVerification,
    isSendingVerification,
    verificationData,
    confirmVerification,
    isConfirmingVerification,
  } = useVerifyEmail({ type: type as 'resetPassword' | 'register' });

  // Handle countdown timer for resend OTP
  useEffect(() => {
    if (verificationData?.waitSeconds) {
      setCountdown(verificationData.waitSeconds);
      setCanSendOtp(false);
    }
  }, [verificationData]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setCanSendOtp(true);
    }
  }, [countdown]);

  const handleSendOtp = (email: string) => {
    if (email && canSendOtp) {
      sendVerification({ email });
    }
  };

  const handleVerifyOtp = (email: string, code: string) => {
    if (email && code) {
      confirmVerification({ email, code });
    }
  };

  // Email validation helper
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <Formik
      initialValues={{ email: '', otp: '' }}
      validationSchema={verifyEmailSchema}
      onSubmit={values => handleVerifyOtp(values.email, values.otp)}
    >
      {({
        handleChange,
        handleBlur,
        values,
        errors,
        touched,
      }) => (
        <CommonAuthLayout
          title={header}
          continueButtonTitle="Verify & Continue"
          continueButtonDisabled={isConfirmingVerification || !isValidEmail(values.email) || !values.otp}
          continueButtonLoading={isConfirmingVerification}
          onContinuePress={() => handleVerifyOtp(values.email, values.otp)}
        >
            <S.Wrapper>
              <S.InputContainer>
                <S.EmailContainer>
                  <Input
                    label="Email"
                    placeholder="johndoe@gmail.com"
                    value={values.email}
                    onChange={handleChange('email')}
                    onBlur={() => handleBlur('email')}
                    isError={!!(touched.email && errors.email)}
                    errorText={errors.email}
                    containerStyle={{ flex: 2 }}
                  />
                  <Button
                    variant="outline"
                    title={countdown > 0 ? `Wait ${countdown}s` : 'Send OTP'}
                    onPress={() => handleSendOtp(values.email)}
                    buttonStyle={{ flex: 1 }}
                    disabled={!canSendOtp || isSendingVerification || !isValidEmail(values.email)}
                    loading={isSendingVerification}
                  />
                </S.EmailContainer>
                <Input
                  label="Verification code"
                  placeholder="Enter the 4-digit code"
                  value={values.otp}
                  onChange={handleChange('otp')}
                  onBlur={() => handleBlur('otp')}
                  isError={!!(touched.otp && errors.otp)}
                  errorText={errors.otp}
                />
              </S.InputContainer>
            </S.Wrapper>
        </CommonAuthLayout>
      )}
    </Formik>
  );
};

export default VerifyEmailScreen;
