import { useState } from 'react';
import CommonAuthLayout from '../Layouts/CommonAuthLayout/CommonAuthLayout';
import { Formik } from 'formik';
import { signUpSchema } from 'src/schemas/sign-up.schema';
import * as S from './SignUpScreen.style';
import Input from 'components/Inputs/Input';
import { TouchableOpacity } from 'react-native';
import EyeClosed from 'assets/images/icons/eye-closed.svg';
import EyeOpen from 'assets/images/icons/eye-open.svg';
import { transparentBlack20Color } from 'constants/colors';
import { useAppNavigation } from 'hooks/useAppNavigation';

const SignUpScreen = () => {
  const navigation = useAppNavigation();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  return (
    <CommonAuthLayout
      title={'Please, fill your information'}
      continueButtonTitle="Continue"
      continueButtonDisabled={false}
      onContinuePress={() => {
        navigation.navigate('/terms-and-use');
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
        validationSchema={signUpSchema}
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
                label="Email"
                placeholder="Enter your email"
                editable={false}
                value={values.email}
                onChange={handleChange('email')}
                onBlur={() => handleBlur('email')}
                isError={!!(touched.email && errors.email)}
                errorText={errors.email}
              />
              <Input
                label="Username"
                placeholder="Enter your username"
                value={values.username}
                onChange={handleChange('username')}
                onBlur={() => handleBlur('username')}
                isError={!!(touched.username && errors.username)}
                errorText={errors.username}
              />
              <Input
                label="Phone Number"
                placeholder="Enter your phone number"
                value={values.phoneNumber}
                onChange={handleChange('phoneNumber')}
                onBlur={() => handleBlur('phoneNumber')}
                isError={!!(touched.phoneNumber && errors.phoneNumber)}
                errorText={errors.phoneNumber}
              />
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

export default SignUpScreen;
