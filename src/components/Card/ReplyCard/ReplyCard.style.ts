import { black10Color, black50Color, blackColor, whiteColor } from "constants/colors";
import { Montserrat300, Montserrat700 } from "constants/fonts";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const ReplyCardContainer = styled.View`
  background-color: ${whiteColor};
  padding-vertical: ${RFValue(6)}px;
  padding-horizontal: ${RFValue(12)}px;
  padding-left: ${RFValue(36)}px;
`;

export const ReplyCardWrapper = styled.View`
  background-color: ${whiteColor};
  padding: ${RFValue(12)}px;
  gap: ${RFValue(8)}px;
  border-width: 1px;
  border-radius: ${RFValue(15)}px;
  border-color: ${black10Color};
`;

export const ReplyInfoContainer = styled.View`
  flex-direction: row;
  gap: ${RFValue(8)}px;
`;

export const ReplyAvatar = styled.Image`
  position: absolute;
  top: ${RFValue(20)}px;
  left: ${RFValue(12)}px;
  z-index: 1;
  width: ${RFValue(32)}px;
  height: ${RFValue(32)}px;
  border-radius: ${RFValue(100)}px;
  align-items: center;
`;

export const InfoColumn = styled.View`
  flex-direction: column;
  justify-content: space-between;
  padding-vertical: ${RFValue(2)}px;
`;

export const ReplyAuthorNameWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${RFValue(4)}px;
`;
export const ReplyAuthorName = styled.Text`
  font-size: ${RFValue(12)}px;
  font-family: ${Montserrat700};
`;

export const ReplyDate = styled.Text`
  font-size: ${RFValue(12)}px;
  font-family: ${Montserrat300};
  color: ${black50Color};
`;

export const ReplyContentContainer = styled.View`
  width: 100%;
`;

export const ReplyContent = styled.Text`
  font-size: ${RFValue(12)}px;
  font-family: ${Montserrat300};
  color: ${blackColor};
`;

export const ReplyFooter = styled.View`
  flex-direction: row;
  gap: ${RFValue(8)}px;
`;

export const ReplyFooterSection = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${RFValue(4)}px;
`;

export const ReplyFooterText = styled.Text`
  font-size: ${RFValue(12)}px;
  font-family: ${Montserrat300};
  color: ${blackColor};
`;

export const ButtonWrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: ${RFValue(4)}px;
`;