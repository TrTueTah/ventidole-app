import styled from 'styled-components/native';
import { blackColor, gray1Color, whiteColor } from 'constants/colors';
import { Montserrat400, Montserrat700 } from 'constants/fonts';

export const Container = styled.View`
  flex: 1;
  background-color: ${whiteColor};
`;

export const Header = styled.View`
  padding: 16px 24px;
  border-bottom-width: 1px;
  border-bottom-color: ${gray1Color};
  background-color: ${whiteColor};
`;

export const HeaderTitle = styled.Text`
  font-family: ${Montserrat700};
  font-size: 18px;
  color: ${blackColor};
  text-align: center;
`;

export const LoaderContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ItemContainer = styled.View<{ isLast: boolean }>`
  padding: 16px 24px;
  border-bottom-width: ${(props: { isLast: boolean }) => (props.isLast ? '0px' : '1px')};
  border-bottom-color: ${gray1Color};
`;

export const ItemTitle = styled.Text`
  font-family: ${Montserrat700};
  font-size: 16px;
  color: ${blackColor};
  margin-bottom: 8px;
`;

export const ItemDescription = styled.Text`
  font-family: ${Montserrat400};
  font-size: 14px;
  color: ${blackColor};
  line-height: 20px;
`;

export const ButtonRow = styled.View`
  flex-direction: row;
  gap: 12px;
  padding: 16px 24px;
  border-top-width: 1px;
  border-top-color: ${gray1Color};
  background-color: ${whiteColor};
`;
