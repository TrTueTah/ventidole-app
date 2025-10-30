import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as S from './HeaderBackButton.style';
import BackButton from 'components/BackButton/BackButton';
import { useAppNavigation } from 'hooks/useAppNavigation';

type Props = {
  children?: React.ReactNode;
}

const HeaderBackButton = ({ children }: Props) => {
  const insets = useSafeAreaInsets();
  const headerInsets = {
    paddingTop: insets.top,
  };
  const navigation = useAppNavigation();
  return (
    <S.Container style={headerInsets}>
      <S.WrapperHeader>
        <BackButton onPress={() => navigation.goBack()} />
        <S.TitleWrapper>
          {children}
        </S.TitleWrapper>
        <S.RightHeader />
      </S.WrapperHeader>
    </S.Container>
  )
}

export default HeaderBackButton