import styled from 'styled-components/native';
import CheckBox from '@react-native-community/checkbox';
import { primaryColor, whiteColor } from 'constants/colors';
import { Montserrat500 } from 'constants/fonts';

// === LAYOUT ===
export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${whiteColor};
`;

export const Wrapper = styled.View`
  flex: 1;
  padding: 16px;
  justify-content: center;
  gap: 24px;
`;

// === INPUTS ===
export const InputContainer = styled.View`
  width: 100%;
  gap: 8px;
`;

// === REMEMBER / FORGOT ===
export const RememberForgotContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const RememberMe = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const StyledCheckbox = styled(CheckBox).attrs({
  boxType: 'square',
  tintColor: primaryColor,
  onTintColor: primaryColor,
  onCheckColor: whiteColor,
  onFillColor: primaryColor,
})`
  transform: scale(0.75);
`;

export const RememberText = styled.Text`
  font-family: ${Montserrat500};
  color: ${primaryColor};
  margin-bottom: 4px;
`;

export const TextButton = styled.Text`
  font-family: ${Montserrat500};
  color: ${primaryColor};
  text-decoration: underline;
  text-decoration-color: ${primaryColor};
`;

// === BUTTON SECTION ===
export const ButtonContainer = styled.View`
  gap: 16px;
`;

export const OrLoginWithContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

export const Line = styled.View`
  flex: 1;
  height: 1px;
  background-color: #ccc;
`;

export const OrText = styled.Text`
  color: #666;
  font-weight: 600;
`;

// === SOCIAL ===
export const SocialContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  gap: 16px;
`;

// === SIGN UP ===
export const SignUpContainer = styled.View`
  flex-direction: row;
  justify-content: center;
`;

export const SignUpText = styled.Text`
  color: ${primaryColor};
  font-weight: 700;
`;
