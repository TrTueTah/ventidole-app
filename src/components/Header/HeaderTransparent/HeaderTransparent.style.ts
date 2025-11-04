import styled from 'styled-components/native';
import { screenWidth } from 'constants/common';

export const animatedContainer = {
  position: 'absolute' as const,
  top: 0,
  left: 0,
  right: 0,
  zIndex: 10,
  paddingHorizontal: screenWidth / 15.5,
  paddingVertical: 10,
};

export const WrapperHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const RightHeader = styled.View`
  width: 24px;
  height: 24px;
`;
