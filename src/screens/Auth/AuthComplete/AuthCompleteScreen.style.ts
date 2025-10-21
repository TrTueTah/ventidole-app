import { Montserrat300Italic, Montserrat700 } from "constants/fonts";
import styled from "styled-components/native";
import LottieView from "lottie-react-native";
import { screenHeight } from "constants/common";

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: white;
  padding: 16px;
  gap: 24px;
`;

export const TextRegisterComplete = styled.Text`
  font-size: 24px;
  font-family: ${Montserrat700}
`;

export const TextWelcome = styled.Text`
  font-size: 18px;
  font-family: ${Montserrat300Italic};
  text-align: center;
`;

export const Animation = styled(LottieView)`
  width: 100%;
  height: ${screenHeight};
  position: absolute;
  top: 0;
`;