import { View, Text } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native';
import { RootStackParamList } from 'typescript/types';
import * as S from './VerifyEmailScreen.style';
import AuthTitle from 'components/AuthTitle/AuthTitle';
import { Formik } from 'formik';
import { verifyEmailSchema } from 'src/schemas/verify-scheme';
import Input from 'components/Inputs/Input';
import Button from 'components/Button/Button';

type VerifyEmailRouteParams = RootStackParamList['/verify-email'];

const VerifyEmailScreen = () => {
  const route = useRoute();
  const params = route.params as VerifyEmailRouteParams;
  const { type, header } = params || {};
  return (
    <S.Container>
      <S.Wrapper>
        <AuthTitle title={header} />
        <Formik
            initialValues={{ email: '', otp: '' }}
            validationSchema={verifyEmailSchema}
            onSubmit={(values) => console.log('Form values:', values)}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <>
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
                      containerStyle={{ flex: 1, marginRight: 8 }}
                    />
                    <Button variant='default' title='Send OTP' onPress={() => {}} buttonStyle={{ flex: 1 }} />
                  </S.EmailContainer>
                </S.InputContainer>
              </>
            )}
        </Formik>
      </S.Wrapper>
    </S.Container>
  )
}

export default VerifyEmailScreen