import { blackColor, shadow1Color, shadowColor, whiteColor } from "constants/colors";
import { Montserrat300 } from "constants/fonts";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const HeaderWrapper = styled.View`
  flex-direction: row;
  gap: ${RFValue(12)}px;
`;

export const ArtistContainer = styled.View`
  background-color: ${whiteColor};
  border-radius: 12px;
  elevation: 20;
  shadow-color: ${shadowColor};
  shadow-offset: 0px 0px;
  shadow-opacity: 1;
  shadow-radius: 10px;
`;

export const ArtistList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  showsHorizontalScrollIndicator: false,
  horizontal: true,
})`
  flex-direction: row;
  padding: ${RFValue(12)}px;
`;

export const ArtistItem = styled.TouchableOpacity`
  flex-direction: column;
  align-items: center;
  gap: ${RFValue(8)}px;
  shadow-color: ${shadowColor};
  shadow-offset: 0px 0px;
  shadow-opacity: 1;
  shadow-radius: 10px;
  width: ${RFValue(72)}px;
`;

export const ArtistImage = styled.Image`
  width: ${RFValue(52)}px;
  height: ${RFValue(52)}px;
  border-radius: ${RFValue(100)}px;
`;

export const ArtistName = styled.Text`
  font-size: ${RFValue(12)}px;
  color: ${blackColor};
  font-family: ${Montserrat300};
  text-align: center;
`;

export const AddButton = styled.TouchableOpacity`
  padding: ${RFValue(8)}px;
  background-color: ${whiteColor};
  border-radius: ${RFValue(100)}px;
  width: ${RFValue(52)}px;
  height: ${RFValue(52)}px;
  justify-content: center;
  align-items: center;
  shadow-color: ${shadow1Color};
  shadow-offset: 0px 0px;
  shadow-opacity: 1;
  shadow-radius: 10px;
`;