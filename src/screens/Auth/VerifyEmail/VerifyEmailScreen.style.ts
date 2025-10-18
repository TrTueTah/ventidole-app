import { whiteColor } from "constants/colors";
import styled from "styled-components/native";

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

export const InputContainer = styled.View`
  width: 100%;
  gap: 8px;
`;

export const EmailContainer = styled.View`
  flex: 1;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
