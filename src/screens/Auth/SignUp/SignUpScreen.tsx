import { useState, useEffect } from 'react';
import CommonAuthLayout from '../Layouts/CommonAuthLayout/CommonAuthLayout';
import { Formik } from 'formik';
import { signUpSchema } from 'src/schemas/sign-up.schema';
import * as S from './SignUpScreen.style';
import Input from 'components/Inputs/Input';
import { TouchableOpacity } from 'react-native';
import EyeClosed from 'assets/images/icons/eye-closed.svg';
import EyeOpen from 'assets/images/icons/eye-open.svg';
import { black20Color } from 'constants/colors';
import { useAppNavigation, useRoute } from 'hooks/useAppNavigation';
import { RootStackParamList } from 'typescript/types';
import { useSignUp } from './hooks/useSignUp';
import { TermsModal } from './components/TermsModal';

type SignUpRouteParams = RootStackParamList['/sign-up'];

const SignUpScreen = () => {
  const route = useRoute();
  const params = route.params as SignUpRouteParams;
  const { email } = params || {};
  const navigation = useAppNavigation();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [pendingSignUpData, setPendingSignUpData] = useState<any>(null);
  
  const { signUp, isLoading, isSuccess } = useSignUp();

  // Navigate after successful sign up
  useEffect(() => {
    if (isSuccess) {
      navigation.navigate('/auth-complete', {
        type: 'register',
        title: 'Registration Complete',
        subtitle: 'Welcome! Discover various features to get started.'
      });
    }
  }, [isSuccess, navigation]);

  console.log('🚀 SignUpScreen email param:', email);
  const handleTermsAccept = () => {
    setTermsAccepted(true);
    setShowTermsModal(false);
    
    // Submit the sign up data
    if (pendingSignUpData) {
      signUp({
        email: pendingSignUpData.email,
        password: pendingSignUpData.password,
        name: pendingSignUpData.username,
        phoneNumber: pendingSignUpData.phoneNumber,
      });
    }
  };

  const handleTermsClose = () => {
    setShowTermsModal(false);
  };

  const handleContinue = (values: any) => {
    // Store the form data and show terms modal
    setPendingSignUpData(values);
    setShowTermsModal(true);
  };

  return (
    <>
      <Formik
        initialValues={{
          email: email || '',
          username: '',
          phoneNumber: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={signUpSchema}
        onSubmit={handleContinue}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <CommonAuthLayout
            title={'Please, fill your information'}
            continueButtonTitle="Continue"
            continueButtonDisabled={isLoading}
            continueButtonLoading={isLoading}
            onContinuePress={handleSubmit}
          >
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
                      <EyeOpen color={black20Color} />
                    ) : (
                      <EyeClosed color={black20Color} />
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
                      <EyeOpen color={black20Color} />
                    ) : (
                      <EyeClosed color={black20Color} />
                    )}
                  </TouchableOpacity>
                }
              />
            </S.InputContainer>
          </S.Wrapper>
          </CommonAuthLayout>
        )}
      </Formik>

      <TermsModal
        visible={showTermsModal}
        onClose={handleTermsClose}
        onAccept={handleTermsAccept}
      />
    </>
  );
};

export default SignUpScreen;
