import React, { useState } from 'react';
import CommonAuthLayout from '../Layouts/CommonAuthLayout/CommonAuthLayout';
import { useAppNavigation } from 'hooks/useAppNavigation';
import { Formik } from 'formik';
import { resetPasswordSchema } from 'src/schemas/reset-password.schema';
import * as S from './ResetPasswordScreen.style';
import Input from 'components/Inputs/Input';
import { TouchableOpacity } from 'react-native';
import EyeClosed from 'assets/images/icons/eye-closed.svg';
import EyeOpen from 'assets/images/icons/eye-open.svg';
import { transparentBlack20Color } from 'constants/colors';

const ResetPasswordScreen = () => {
  const navigation = useAppNavigation();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  return (
    <CommonAuthLayout
      title={'Enter your new password'}
      continueButtonTitle="Continue"
      continueButtonDisabled={false}
      onContinuePress={() => {
        navigation.navigate('/auth-complete', {
          type: 'resetPassword',
          title: 'Password Reset Successful',
          subtitle: 'Your password has been reset successfully. You can now log in with your new password.',
        });
      }}
    >
      <Formik
        initialValues={{
          email: '',
          username: '',
          phoneNumber: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={resetPasswordSchema}
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
              <Input
                label="Password"
                placeholder="Enter your password"
                value={values.password}
                onChange={handleChange('password')}
                onBlur={() => handleBlur('password')}
                secureTextEntry={!isPasswordVisible}
                isError={!!(touched.password && errors.password)}
                errorText={errors.password}
                InputIcon={
                  <TouchableOpacity
                    onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                  >
                    {isPasswordVisible ? (
                      <EyeOpen color={transparentBlack20Color} />
                    ) : (
                      <EyeClosed color={transparentBlack20Color} />
                    )}
                  </TouchableOpacity>
                }
              />
              <Input
                label="Confirm Password"
                placeholder="Re-enter your password"
                value={values.confirmPassword}
                onChange={handleChange('confirmPassword')}
                onBlur={() => handleBlur('confirmPassword')}
                secureTextEntry={!isPasswordVisible}
                isError={!!(touched.confirmPassword && errors.confirmPassword)}
                errorText={errors.confirmPassword}
                InputIcon={
                  <TouchableOpacity
                    onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                  >
                    {isPasswordVisible ? (
                      <EyeOpen color={transparentBlack20Color} />
                    ) : (
                      <EyeClosed color={transparentBlack20Color} />
                    )}
                  </TouchableOpacity>
                }
              />
            </S.InputContainer>
          </S.Wrapper>
        )}
      </Formik>
    </CommonAuthLayout>
  );
};

export default ResetPasswordScreen;
