import { whiteColor } from 'constants/colors';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${whiteColor};
`;

export const Wrapper = styled.View`
  margin-top: 16px;
  flex: 1;
  gap: 24px;
`;

export const InputContainer = styled.View`
  width: 100%;
  gap: 8px;
`;

export const EmailContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;
