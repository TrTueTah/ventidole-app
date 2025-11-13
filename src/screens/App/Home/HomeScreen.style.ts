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

export const EmptyContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: ${RFValue(40)}px;
  margin-top: ${RFValue(60)}px;
`;

export const EmptyText = styled.Text`
  font-family: ${Montserrat300};
  font-size: ${RFValue(16)}px;
  color: ${black50Color};
  text-align: center;
  margin-bottom: ${RFValue(8)}px;
`;

export const EmptySubText = styled.Text`
  font-family: ${Montserrat300};
  font-size: ${RFValue(14)}px;
  color: ${black50Color};
  text-align: center;
  opacity: 0.7;
`;