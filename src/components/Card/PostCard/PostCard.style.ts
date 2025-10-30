import { black50Color, blackColor, shadowColor, whiteColor } from "constants/colors";
import { Montserrat300, Montserrat700 } from "constants/fonts";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const PostCardContainer = styled.View`
  background-color: ${whiteColor};
  padding-vertical: ${RFValue(12)}px;
  gap: ${RFValue(8)}px;
  elevation: 20;
  shadow-color: ${shadowColor};
  shadow-offset: 0px 0px;
  shadow-opacity: 1;
  shadow-radius: 10px;
`;

export const PostInfoContainer = styled.View`
  padding-horizontal: ${RFValue(12)}px;
  flex-direction: row;
  gap: ${RFValue(8)}px;
`;

export const PostAvatar = styled.Image`
  width: ${RFValue(40)}px;
  height: ${RFValue(40)}px;
  border-radius: ${RFValue(100)}px;
  align-items: center;
`;

export const InfoColumn = styled.View`
  flex-direction: column;
  justify-content: space-between;
  padding-vertical: ${RFValue(2)}px;
`;

export const PostAuthorNameWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${RFValue(4)}px;
`;
export const PostAuthorName = styled.Text`
  font-size: ${RFValue(12)}px;
  font-family: ${Montserrat700};
`;

export const PostDate = styled.Text`
  font-size: ${RFValue(12)}px;
  font-family: ${Montserrat300};
  color: ${black50Color}
`;

export const PostContentContainer = styled.View`
  padding-horizontal: ${RFValue(12)}px;
  width: 100%;
`;

export const PostContent = styled.Text`
  font-size: ${RFValue(12)}px;
  font-family: ${Montserrat300};
  color: ${blackColor};
`;

export const PostImage = styled.Image`
  width: 100%;
  height: ${RFValue(200)}px;
`;

export const PostFooter = styled.View`
  flex-direction: row;
  padding-horizontal: ${RFValue(12)}px;
  gap: ${RFValue(8)}px;
`;

export const PostFooterSection = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${RFValue(4)}px;
`;

export const PostFooterText = styled.Text`
  font-size: ${RFValue(12)}px;
  font-family: ${Montserrat300};
  color: ${blackColor};
`;
