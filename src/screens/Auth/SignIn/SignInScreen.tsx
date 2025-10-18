import { TouchableOpacity, Text } from 'react-native';
import { useState } from 'react';
import { Formik } from 'formik';

import * as S from './SignInScreen.style';
import { signInSchema } from 'src/schemas/sign-in.schema';
import { transparentBlack20Color } from 'constants/colors';
import { Montserrat500 } from 'constants/fonts';

import AuthTitle from 'components/AuthTitle/AuthTitle';
import Input from 'components/Inputs/Input';
import Button from 'components/Button/Button';

import Facebook from 'assets/images/icons/facebook.svg';
import Google from 'assets/images/icons/google.svg';
import EyeClosed from 'assets/images/icons/eye-closed.svg';
import EyeOpen from 'assets/images/icons/eye-open.svg';
import { useAppNavigation } from 'hooks/useAppNavigation';

const SignInScreen = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigation = useAppNavigation();

  return (
    <S.Container>
      <S.Wrapper>
        <AuthTitle title="Welcome Back to Ventidole" />

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={signInSchema}
          onSubmit={(values) => console.log('Form values:', values)}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <>
              {/* === INPUT FIELDS === */}
              <S.InputContainer>
                <Input
                  label="Email"
                  placeholder="johndoe@gmail.com"
                  value={values.email}
                  onChange={handleChange('email')}
                  onBlur={() => handleBlur('email')}
                  isError={!!(touched.email && errors.email)}
                  errorText={errors.email}
                />

                <Input
                  label="Password"
                  placeholder="Enter your password"
                  value={values.password}
                  secureTextEntry={!isPasswordVisible}
                  onChange={handleChange('password')}
                  onBlur={() => handleBlur('password')}
                  isError={!!(touched.password && errors.password)}
                  errorText={errors.password}
                  InputIcon={
                    <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                      {isPasswordVisible ? (
                        <EyeOpen color={transparentBlack20Color} />
                      ) : (
                        <EyeClosed color={transparentBlack20Color} />
                      )}
                    </TouchableOpacity>
                  }
                />
              </S.InputContainer>

              {/* === REMEMBER / FORGOT === */}
              <S.RememberForgotContainer>
                <S.RememberMe>
                  <S.StyledCheckbox />
                  <S.RememberText>Remember me</S.RememberText>
                </S.RememberMe>
                <TouchableOpacity>
                  <S.TextButton>Forget password?</S.TextButton>
                </TouchableOpacity>
              </S.RememberForgotContainer>

              {/* === BUTTONS === */}
              <S.ButtonContainer>
                <Button title="Login" onPress={() => handleSubmit()} />

                <S.OrLoginWithContainer>
                  <S.Line />
                  <S.OrText>or login with</S.OrText>
                  <S.Line />
                </S.OrLoginWithContainer>

                <S.SocialContainer>
                  <Button title="Facebook" variant="gray" leftIcon={<Facebook />} buttonStyle={{ flex: 1 }} />
                  <Button title="Google" variant="gray" leftIcon={<Google />} buttonStyle={{ flex: 1 }} />
                </S.SocialContainer>
              </S.ButtonContainer>

              {/* === SIGNUP === */}
              <S.SignUpContainer>
                <Text style={{ fontFamily: Montserrat500 }}>Don’t have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('/verify-email', { type: 'register', header: 'Please, verify your email first' })}>
                  <S.TextButton>Sign up</S.TextButton>
                </TouchableOpacity>
              </S.SignUpContainer>
            </>
          )}
        </Formik>
      </S.Wrapper>
    </S.Container>
  );
};

export default SignInScreen;
