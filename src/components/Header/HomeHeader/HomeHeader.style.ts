import styled from 'styled-components/native';
import { whiteColor } from 'constants/colors';
import { screenWidth } from 'constants/common';

export const Container = styled.View`
  background-color: ${whiteColor};
  padding-horizontal: ${screenWidth / 15.5}px;
  padding-vertical: 10px;
`;

export const WrapperHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;

`;

export const NotificationButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;

export const BadgeStyle = {
  position: 'absolute' as 'absolute',
  borderColor: '#FE515B',
  top: -30,
  right: -18,
  backgroundColor: '#FE515B',
}

export const LeftHeader = styled.View`
  width: 24px;
  height: 24px;
`;