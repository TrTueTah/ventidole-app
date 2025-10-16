import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { blackColor, whiteColor } from 'constants/colors';
import { Montserrat500 } from 'constants/fonts';

export const AppLoaderContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: ${blackColor};
`;
export const AppActivityIndicator = styled.ActivityIndicator`
  transform: scale(1.5);
`;

export const AppLoaderText = styled.Text`
  color: ${whiteColor};
  font-size: ${RFValue(18, 812)}px;
  font-family: ${Montserrat500};
  text-align: center;
`;