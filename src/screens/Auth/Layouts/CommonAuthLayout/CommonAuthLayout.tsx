import {
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { useCallback } from 'react';
import * as S from './CommonAuthLayout.style';
import { isIos, screenHeight } from 'constants/common';
import { useAppNavigation } from 'hooks/useAppNavigation';
import { black60Color, blackColor, gray1Color, gray2Color, grayColor } from 'constants/colors';
import { Montserrat400, Montserrat500, Montserrat700 } from 'constants/fonts';
import AuthTitle from 'components/AuthTitle/AuthTitle';
import BackButton from 'components/BackButton/BackButton';

interface CommonAuthLayoutProps {
  withKeyboard?: boolean;
  children: React.ReactNode;
  onBackPress?: () => void;
  title: string;
  continueButtonDisabled?: boolean;
  continueButtonIcon?: React.ReactNode;
  continueButtonTitle?: string;
  continueButtonLoading?: boolean;
  extraButton?: React.ReactNode;
  skipButtonTitle?: string;
  shouldShowBackButton?: boolean;
  onContinuePress?: () => void;
  onSkipPress?: () =>
    | void
    | null
    | Promise<void>
    | (() => Promise<void> | null);
}

const CommonAuthLayout: React.FC<CommonAuthLayoutProps> = ({
  withKeyboard = true,
  onBackPress,
  title,
  continueButtonDisabled,
  continueButtonIcon,
  continueButtonTitle,
  continueButtonLoading,
  extraButton,
  skipButtonTitle,
  shouldShowBackButton = true,
  onContinuePress,
  onSkipPress,
  children,
}) => {
  const BASE_SCREEN_HEIGHT = 932;
  const calculateSize = (baseSize: number) => {
    const ratio = screenHeight / BASE_SCREEN_HEIGHT;
    return Math.round(baseSize * ratio);
  };

  const navigation = useAppNavigation();

  const handleBackPress = useCallback(() => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigation.goBack();
    }
  }, [onBackPress, navigation]);

  const Wrapper = useCallback(
    ({ children: wrChildren }: { children: React.ReactNode }) => {
      if (withKeyboard) {
        return (
          <KeyboardAvoidingView
            behavior={isIos ? 'padding' : 'height'}
            keyboardVerticalOffset={15}
            style={{ flex: 1 }}
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              {wrChildren}
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        );
      }
      return <>{wrChildren}</>;
    },
    [withKeyboard],
  );

  return (
    <View style={{ flex: 1 }}>
      <Wrapper>
        <SafeAreaView style={{ flex: 1 }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
              paddingHorizontal: 16,
            }}
          >
            <View
              style={{
                flex: 1,
              }}
            >
              <S.TopRow>
                {shouldShowBackButton ? <BackButton onPress={handleBackPress} /> : <View/>}
                {/* Áp dụng điều kiện cho toàn bộ nút Skip */}
                {skipButtonTitle && onSkipPress && (
                  <TouchableOpacity
                    onPress={onSkipPress}
                  >
                    <Text
                      style={{
                        color: gray2Color,
                        fontFamily: Montserrat700,
                        fontSize: 18,
                      }}
                    >
                      {skipButtonTitle}
                    </Text>
                  </TouchableOpacity>
                )}
              </S.TopRow>
              <AuthTitle title={title} />
              {children}
            </View>
            <S.ButtonsContainer>
              {extraButton}
              <S.ContinueButton
                loading={continueButtonLoading}
                disabled={continueButtonDisabled}
                onPress={onContinuePress}
                title={continueButtonTitle}
                leftIcon={continueButtonIcon}
              />
            </S.ButtonsContainer>
          </View>
        </SafeAreaView>
      </Wrapper>
    </View>
  );
};

export default React.memo(CommonAuthLayout);
