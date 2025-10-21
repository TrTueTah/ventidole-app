import React from 'react';
import Animated, { SlideInRight } from 'react-native-reanimated';
import * as S from './AuthCompleteScreen.style';
import Success from 'assets/images/icons/success.svg';
import Button from 'components/Button/Button';
import lottieAnimation from 'assets/animations/success.json';
import { useAppNavigation, useRoute } from 'hooks/useAppNavigation';
import { RootStackParamList } from 'typescript/types';
import { useAuthStore } from 'src/store/authStore';

type AuthCompleteRouteParams = RootStackParamList['/auth-complete'];

const AuthCompleteScreen = () => {
  const route = useRoute();
  const params = route.params as AuthCompleteRouteParams;
  const { type, subtitle, title } = params || {};
  const { setIsLogin } = useAuthStore();
  const navigation = useAppNavigation();
  const handleOnPress = () => {
    if (type === 'register') {
      // setIsLogin(true);
      navigation.navigate('/choose-idol')
      return;
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: '/sign-in' }],
      });
    }
  }
  return (
    <Animated.View entering={SlideInRight.delay(200)} style={{ flex: 1 }}>
      <S.Container>
        <S.Animation source={lottieAnimation} autoPlay loop={false} resizeMode='cover' />
        <S.TextRegisterComplete>{title}</S.TextRegisterComplete>
        <Success width={160} height={160} />
        <S.TextWelcome>{subtitle}</S.TextWelcome>
        <Button title={type === 'register' ? 'Get Started' : 'Back to Login'} onPress={handleOnPress} buttonStyle={{ width: '100%'}} />
      </S.Container>
    </Animated.View>
  );
};

export default AuthCompleteScreen;
