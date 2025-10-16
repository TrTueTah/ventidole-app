import React from 'react';
import AuthTitle from 'components/AuthTitle/AuthTitle';
import * as S from './SignInScreen.style';

const SignInScreen = () => {
  return (
    <S.Container>
      <S.Wrapper>
        <AuthTitle title="Welcome back to Ventidole" />
      </S.Wrapper>
    </S.Container>
  );
};

export default SignInScreen;
