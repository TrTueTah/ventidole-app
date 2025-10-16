import { blackColor, whiteColor } from 'constants/colors';
import { Montserrat700 } from 'constants/fonts';
import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: ${whiteColor};
  gap: 8px;
`;

export const Title = styled.Text`
  font-family: ${Montserrat700};
  color: ${blackColor};
`;