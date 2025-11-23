import { shadowColor, whiteColor } from "constants/colors";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const SkeletonContainer = styled.View`
  border-radius: ${RFValue(20)}px;
  margin-bottom: ${RFValue(12)}px;
  shadow-color: ${shadowColor};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 3;
  gap: ${RFValue(8)}px;
  flex-direction: column;
  align-items: center;
`;

export const SkeletonAvatar = styled.View`
  width: ${RFValue(52)}px;
  height: ${RFValue(52)}px;
  border-radius: ${RFValue(30)}px;
  background-color: #E1E9EE;
`;

export const SkeletonText = styled.View`
  height: ${RFValue(14)}px;
  background-color: #E1E9EE;
  border-radius: ${RFValue(4)}px;
  width: ${RFValue(100)}px;
`;