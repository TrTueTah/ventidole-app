import { useAuthStore } from '../store/authStore';
import * as S from './Navigator.style';
import AppStackScreens from 'src/navigator/AppStackScreens/AppStackScreens';
import AuthStackScreens from 'src/navigator/AuthStackScreens/AuthStackScreens';

const Navigator = () => {
  const {isLogin } = useAuthStore();

  console.log('User is logged in ?', isLogin);
  return <S.NavigatorContainer>{isLogin ? <AppStackScreens /> : <AuthStackScreens />}</S.NavigatorContainer>;
};

export default Navigator;
