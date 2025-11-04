import {
  backgroundColor,
  black50Color,
  secondaryColor,
  shadow1Color,
  shadowColor,
  whiteColor,
} from 'constants/colors';
import { Montserrat300, Montserrat700 } from 'constants/fonts';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${backgroundColor};
`;

export const ChannelList = styled.FlatList.attrs({
  contentContainerStyle: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    gap: RFValue(12),
  },
  showsVerticalScrollIndicator: false,
})``;

export const ChannelItem = styled.TouchableOpacity`
  padding: ${RFValue(12)}px;
  background-color: ${whiteColor};
  border-radius: ${RFValue(15)}px;
  elevation: 20;
  shadow-color: ${shadowColor};
  shadow-offset: 0px 0px;
  shadow-opacity: 1;
  shadow-radius: 10px;
`;

export const HeaderContainer = styled.View`
padding: ${RFValue(12)}px;
  background-color: ${whiteColor};
  border-radius: ${RFValue(15)}px;
  elevation: 20;
  shadow-color: ${shadowColor};
  shadow-offset: 0px 0px;
  shadow-opacity: 1;
  shadow-radius: 10px;
`;
export const ChannelInfoWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${RFValue(12)}px;
`;

export const ChannelItemWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const ChannelImage = styled.Image`
  width: ${RFValue(48)}px;
  height: ${RFValue(48)}px;
  border-radius: ${RFValue(25)}px;
`;
export const ChannelName = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${Montserrat700};
`;

export const ChannelInfo = styled.View`
  gap: ${RFValue(8)}px;
`;

export const NameWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${RFValue(4)}px;
`;

export const ChannelGroup = styled.Text`
  font-size: ${RFValue(12)}px;
  font-family: ${Montserrat300};
  color: ${black50Color};
`;

export const LastSendTime = styled.Text`
  font-size: ${RFValue(10)}px;
  color: ${black50Color};
`;

export const Badge = styled.View`
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: ${secondaryColor};
  width: ${RFValue(18)}px;
  height: ${RFValue(18)}px;
  border-radius: ${RFValue(9)}px;
  justify-content: center;
  align-items: center;
`;

export const BadgeText = styled.Text`
  color: ${whiteColor};
  font-size: ${RFValue(12)}px;
  font-family: ${Montserrat700};
`;

export const HeaderTitle = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${Montserrat700};
`;

export const HeaderWrapper = styled.View`
  gap: ${RFValue(12)}px;
`;

export const HeaderContent = styled.View`
  flex-direction: row;
  gap: ${RFValue(8)}px;
`;

export const AddButton = styled.TouchableOpacity`
  padding: ${RFValue(4)}px;
  border-radius: ${RFValue(100)}px;
  background-color: ${whiteColor};
  justify-content: center;
  align-items: center;
  elevation: 20;
  shadow-color: ${shadow1Color};
  shadow-offset: 0px 0px;
  shadow-opacity: 1;
  shadow-radius: 10px;
`;

export const Description = styled.Text`
  flex: 1;
  font-size: ${RFValue(12)}px;
  font-family: ${Montserrat700};
  color: ${black50Color};
  margin-left: ${RFValue(8)}px;
  color: ${secondaryColor};
`;