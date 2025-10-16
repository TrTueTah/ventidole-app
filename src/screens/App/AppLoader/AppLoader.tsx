import { APP_ENV } from '@env';
import * as S from './AppLoader.style';

const AppLoader = ({ text }: { text?: string } = { text: '' }) => {
  const isDev = APP_ENV === 'dev' || APP_ENV === 'local';
  return (
    <S.AppLoaderContainer>
      <S.AppActivityIndicator size="large" />
      {text && isDev && <S.AppLoaderText>{text}</S.AppLoaderText>}
    </S.AppLoaderContainer>
  );
};

export default AppLoader;
