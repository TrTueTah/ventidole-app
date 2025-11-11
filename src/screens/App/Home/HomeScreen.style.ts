import { backgroundColor, black50Color, blackColor, shadowColor, whiteColor } from "constants/colors";
import { Montserrat300, Montserrat700 } from "constants/fonts";
import { FlatList } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  background-color: ${backgroundColor};
  flex: 1;
`;

export const PostList = styled(FlatList).attrs({
  contentContainerStyle: {
    paddingHorizontal: RFValue(12),
    paddingVertical: RFValue(8),
    gap: RFValue(12),
  },
  showsVerticalScrollIndicator: false,
})`
`; 

export const TopContainer = styled.View`
  flex-direction: column;
  gap: ${RFValue(12)}px;
`;

export const TouchableZone = styled.Pressable`

`;

export const LoaderContainer = styled.View`
  padding: ${RFValue(16)}px;
  align-items: center;
  justify-content: center;
`;