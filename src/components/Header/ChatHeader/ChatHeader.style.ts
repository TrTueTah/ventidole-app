import styled from 'styled-components/native';
import { blackColor, whiteColor } from 'constants/colors';
import { screenWidth } from 'constants/common';
import { Montserrat700 } from 'constants/fonts';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  background-color: ${whiteColor};
  padding-horizontal: ${screenWidth / 15.5}px;
  padding-vertical: 10px;
`;

export const WrapperHeader = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  gap: ${RFValue(10)}px;

`;

export const HeaderTitle = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: ${Montserrat700};
  color: ${blackColor};
`;