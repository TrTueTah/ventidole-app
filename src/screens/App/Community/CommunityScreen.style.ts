import styled from 'styled-components/native';
import { Animated } from 'react-native';
import { BlurView } from "@react-native-community/blur";
import { RFValue } from 'react-native-responsive-fontsize';
import { Montserrat300, Montserrat700 } from 'constants/fonts';
import { blackColor, whiteColor } from 'constants/colors';

export const Container = styled.View`
  flex: 1;
`;

export const HeaderContainer = styled(Animated.View)`
  height: 400px;
  overflow: visible;
  background-color: #000;
`;

export const BlurBackground = styled(BlurView).attrs({
  blurType: "light",
  blurAmount: 5,
})`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.04);
`;

export const HeaderImage = styled(Animated.Image)`
  position: absolute;
  left: 0;
  right: 0;
`;

export const HeaderContent = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  padding: ${RFValue(16)}px;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: ${RFValue(8)}px;
  background-color: transparent;
`;

export const HeaderTitle = styled.Text`
  color: ${whiteColor};
  font-size: ${RFValue(26)}px;
  font-family: ${Montserrat700};
  line-height: ${RFValue(26)}px;
`;

export const HeaderSubtitle = styled.Text`
  color: ${whiteColor};
  font-size: ${RFValue(10)}px;
  font-family: ${Montserrat300};
  line-height: ${RFValue(10)}px;
`;

export const JoinButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: ${RFValue(6)}px;
  background-color: ${whiteColor};
  padding: ${RFValue(8)}px ${RFValue(16)}px;
  border-radius: ${RFValue(20)}px;
`;

export const JoinText = styled.Text`
  font-family: ${Montserrat700};
  font-size: ${RFValue(14)}px;
  color: ${blackColor};
`;

export const PostItem = styled.View`
  background-color: #fff;
  padding: 16px;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
`;

export const PostTitle = styled.Text`
  font-size: 16px;
`;
