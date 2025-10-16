import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Montserrat400, Montserrat500 } from 'constants/fonts';
import { blackColor, whiteColor } from 'constants/colors';
import { screenWidth } from 'constants/common';

export const Container = styled.View`
  flex: 1;
  background-color: ${blackColor};
  justify-content: center;
  align-items: center;
  padding-horizontal: 24px;
`;

export const Title = styled.Text`
  color: ${whiteColor};
  font-size: ${RFValue(36, 812)}px;
  font-family: ${Montserrat500};
  margin-top: 48px;

`;

export const Description = styled.Text`
  color: ${whiteColor};
  font-size: ${RFValue(16, 812)}px;
  margin-top: 16px;
  width: ${screenWidth * 0.8}px;
  text-align: center;
  font-family: ${Montserrat400};
`;
