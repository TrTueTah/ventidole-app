import { StyleProp, ViewStyle } from 'react-native';
import React from 'react';
import { TouchableWithoutFeedback } from '@gorhom/bottom-sheet';
import ArrowLeft from 'assets/images/icons/arrow-left.svg';
import { blackColor } from 'constants/colors';

interface BackButtonProps {
  onPress: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  color?: any;
}

const BackButton = ({ onPress, containerStyle, color }: BackButtonProps) => {
  return (
    <TouchableWithoutFeedback onPress={onPress} style={containerStyle}>
      <ArrowLeft width={24} height={24} color={blackColor} />
    </TouchableWithoutFeedback>
  );
};

export default BackButton;
