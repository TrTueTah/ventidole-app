import React, { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { RootStackParamList } from 'typescript/types';
import * as S from './VerifyEmailScreen.style';
import { Formik } from 'formik';
import { verifyEmailSchema } from 'src/schemas/verify-scheme';
import Input from 'components/Inputs/Input';
import Button from 'components/Button/Button';
import CommonAuthLayout from '../Layouts/CommonAuthLayout/CommonAuthLayout';
import { useAppNavigation } from 'hooks/useAppNavigation';

type VerifyEmailRouteParams = RootStackParamList['/verify-email'];

const VerifyEmailScreen = () => {
  const route = useRoute();
  const params = route.params as VerifyEmailRouteParams;
  const { type, header } = params || {};
  const [isValidOtp, setIsValidOtp] = useState<boolean>(true);
  const navigation = useAppNavigation();
  return (
    <CommonAuthLayout
      title={header}
      continueButtonTitle="Continue"
      continueButtonDisabled={false}
      onContinuePress={() => {
        type === 'resetPassword'
          ? navigation.navigate('/reset-password')
          : navigation.navigate('/sign-up');
      }}
    >
      <Formik
        initialValues={{ email: '', otp: '' }}
        validationSchema={verifyEmailSchema}
        onSubmit={values => console.log('Form values:', values)}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
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
                  title="Send OTP"
                  onPress={() => {}}
                  buttonStyle={{ flex: 1 }}
                  disabled
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
        )}
      </Formik>
    </CommonAuthLayout>
  );
};

export default VerifyEmailScreen;
