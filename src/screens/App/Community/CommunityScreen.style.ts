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

export const JoinButton = styled.TouchableOpacity<{ isJoined: boolean }>`
  flex-direction: row;
  align-items: center;
  gap: ${RFValue(6)}px;
  background-color: ${(props: { isJoined: boolean }) => props.isJoined ? 'transparent' : whiteColor};
  padding: ${RFValue(8)}px ${RFValue(16)}px;
  border-radius: ${RFValue(20)}px;
  border-width: ${(props: { isJoined: boolean }) => props.isJoined ? '2px' : '0px'};
  border-color: ${whiteColor};
`;

export const JoinText = styled.Text<{ isJoined: boolean }>`
  font-family: ${Montserrat700};
  font-size: ${RFValue(14)}px;
  color: ${(props: { isJoined: boolean }) => props.isJoined ? whiteColor : blackColor};
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

export const FloatingButton = styled.TouchableOpacity`
  position: absolute;
  bottom: ${RFValue(24)}px;
  right: ${RFValue(24)}px;
  width: ${RFValue(56)}px;
  height: ${RFValue(56)}px;
  border-radius: ${RFValue(28)}px;
  background-color: ${blackColor};
  justify-content: center;
  align-items: center;
  elevation: 8;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.3;
  shadow-radius: 4px;
`;

export const LoadingContainer = styled.View`
  padding: ${RFValue(20)}px;
  align-items: center;
  justify-content: center;
`;

export const EmptyContainer = styled.View`
  padding: ${RFValue(40)}px ${RFValue(20)}px;
  align-items: center;
  justify-content: center;
`;

export const EmptyText = styled.Text`
  font-family: ${Montserrat300};
  font-size: ${RFValue(14)}px;
  color: ${blackColor};
  text-align: center;
`;

export const TabBarContainer = styled.View`
  background-color: ${whiteColor};
  border-bottom-width: 1px;
  border-bottom-color: #e0e0e0;
`;

export const TabBar = styled.View`
  flex-direction: row;
  background-color: ${whiteColor};
`;

export const TabItem = styled.TouchableOpacity<{ isActive: boolean }>`
  flex: 1;
  padding: ${RFValue(16)}px ${RFValue(12)}px;
  align-items: center;
  border-bottom-width: ${(props: { isActive: boolean }) => props.isActive ? '2px' : '0px'};
  border-bottom-color: ${blackColor};
`;

export const TabLabel = styled.Text<{ isActive: boolean }>`
  font-family: ${(props: { isActive: boolean }) => props.isActive ? Montserrat700 : Montserrat300};
  font-size: ${RFValue(14)}px;
  color: ${(props: { isActive: boolean }) => props.isActive ? blackColor : '#666'};
`;

export const AboutContainer = styled.View`
  padding: ${RFValue(20)}px;
  background-color: ${whiteColor};
`;

export const AboutSection = styled.View`
  margin-bottom: ${RFValue(20)}px;
`;

export const AboutTitle = styled.Text`
  font-family: ${Montserrat700};
  font-size: ${RFValue(16)}px;
  color: ${blackColor};
  margin-bottom: ${RFValue(8)}px;
`;

export const AboutText = styled.Text`
  font-family: ${Montserrat300};
  font-size: ${RFValue(14)}px;
  color: ${blackColor};
  line-height: ${RFValue(20)}px;
`;

export const IdolList = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${RFValue(12)}px;
`;

export const IdolItem = styled.View`
  align-items: center;
  width: ${RFValue(80)}px;
`;

export const IdolAvatar = styled.Image`
  width: ${RFValue(60)}px;
  height: ${RFValue(60)}px;
  border-radius: ${RFValue(30)}px;
  margin-bottom: ${RFValue(8)}px;
  background-color: #f0f0f0;
`;

export const IdolName = styled.Text`
  font-family: ${Montserrat300};
  font-size: ${RFValue(12)}px;
  color: ${blackColor};
  text-align: center;
`;

export const TabContentContainer = styled.View`
  flex: 1;
`;

export const TabContentPadding = styled.View`
  padding: ${RFValue(16)}px;
  gap: ${RFValue(12)}px;
`;
