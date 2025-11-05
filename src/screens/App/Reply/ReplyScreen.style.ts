import { backgroundColor, black10Color, black50Color, blackColor, whiteColor } from "constants/colors";
import { Montserrat300, Montserrat400, Montserrat500 } from "constants/fonts";
import { TextInput } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${backgroundColor};
`;

export const ReplyCountList = styled.FlatList.attrs({
  contentContainerStyle: {
    paddingVertical: RFValue(8),
  },
  showsVerticalScrollIndicator: false,
})``;

export const HeaderWrapper = styled.View`
  gap: ${RFValue(12)}px;
`;

export const ReplySection = styled.View`
  background-color: ${whiteColor};
  padding: ${RFValue(12)}px;
`;

export const ReplyHeader = styled.View`
  flex-direction: row;
  align-items: baseline;
  gap: ${RFValue(8)}px;
`;

export const ReplyHeaderTitle = styled.Text`
  font-family: ${Montserrat500};
  font-size: ${RFValue(16)}px;
  color: ${blackColor};
`;

export const ReplyCount = styled.Text`
  font-family: ${Montserrat400};
  font-size: ${RFValue(16)}px;
  color: ${black50Color};
`;

export const ReplyInputContainer = styled.View`
  position: relative;
  bottom: 0;
  left: 0;
  right: 0;
  flex-direction: row;
  align-items: flex-end;
  background-color: ${whiteColor};
  border-top-width: 1px;
  border-color: #eee;
  padding: ${RFValue(8)}px ${RFValue(12)}px;
  gap: ${RFValue(8)}px;
  padding-bottom: ${RFValue(32)}px;
`;

export const ReplyInputWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  padding: ${RFValue(4)}px ${RFValue(12)}px;
  border-width: 1px;
  border-color: ${black10Color};
  border-radius: ${RFValue(20)}px;
  width: 80%;
  max-height: ${RFValue(200)}px;
  min-height: ${RFValue(20)}px;
  flex-grow: 1;
`;

export const ReplyInput = styled(TextInput)`
  max-height: ${RFValue(200)}px;
  min-height: ${RFValue(20)}px;
  font-family: ${Montserrat300};
  font-size: ${RFValue(12)}px;
  line-height: ${RFValue(12)}px;
  width: 100%;
`;
