import { blackColor, whiteColor } from 'constants/colors';
import { Montserrat700 } from 'constants/fonts';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: ${whiteColor};
  gap: 8px;
`;

export const Title = styled.Text`
  font-family: ${Montserrat700};
  color: ${blackColor};
  font-size: 20px;
`;

export const InputContainer = styled.View`
  width: 100%;
`;