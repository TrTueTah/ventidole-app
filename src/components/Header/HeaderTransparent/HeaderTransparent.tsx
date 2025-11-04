import React from 'react';
import { Animated, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as S from './HeaderTransparent.style';
import BackButton from 'components/BackButton/BackButton';
import { useAppNavigation } from 'hooks/useAppNavigation';

type Props = {
  scrollY: Animated.Value;
  title?: string;
};

const HeaderTransparent = ({ scrollY, title }: Props) => {
  const insets = useSafeAreaInsets();
  const navigation = useAppNavigation();

  const backgroundColor = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: ['rgba(255,255,255,0)', 'rgba(255,255,255,1)'],
    extrapolate: 'clamp',
  });

  const borderBottomColor = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: ['rgba(0,0,0,0)', 'rgba(0,0,0,0.1)'],
    extrapolate: 'clamp',
  });

  const titleOpacity = scrollY.interpolate({
    inputRange: [0, 100, 150],
    outputRange: [0, 0.5, 1],
    extrapolate: 'clamp',
  });

  const headerInsets = { paddingTop: insets.top };

  return (
    <Animated.View
      style={[
        S.animatedContainer,
        {
          ...headerInsets,
          backgroundColor,
          borderBottomColor,
          borderBottomWidth: 1,
        },
      ]}
    >
      <S.WrapperHeader>
        <BackButton onPress={() => navigation.goBack()} />
        <Animated.View style={{ opacity: titleOpacity }}>
          <Text style={{ fontWeight: '600', fontSize: 16 }}>{title}</Text>
        </Animated.View>
        <S.RightHeader />
      </S.WrapperHeader>
    </Animated.View>
  );
};

export default HeaderTransparent;
