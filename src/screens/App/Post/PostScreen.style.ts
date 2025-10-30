import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { backgroundColor, whiteColor, blackColor, black50Color, black10Color } from 'constants/colors';
import { Montserrat700, Montserrat400, Montserrat500, Montserrat300 } from 'constants/fonts';

export const Container = styled.View`
  flex: 1;
  background-color: ${backgroundColor};
`;

export const CommentCountList = styled.FlatList.attrs({
  contentContainerStyle: {
    paddingVertical: RFValue(8),
  },
  showsVerticalScrollIndicator: false,
})``;

export const HeaderWrapper = styled.View`
  gap: ${RFValue(12)}px;
`;

export const CommentSection = styled.View`
  background-color: ${whiteColor};
  padding: ${RFValue(12)}px;
`;

export const CommentHeader = styled.View`
  flex-direction: row;
  align-items: baseline;
  gap: ${RFValue(8)}px;
`;

export const CommentHeaderTitle = styled.Text`
  font-family: ${Montserrat500};
  font-size: ${RFValue(16)}px;
  color: ${blackColor};
`;

export const CommentCount = styled.Text`
  font-family: ${Montserrat400};
  font-size: ${RFValue(16)}px;
  color: ${black50Color};
`;

export const CommentCardContainer = styled.View`
  background-color: ${whiteColor};
  padding-vertical: ${RFValue(6)}px;
  padding-horizontal: ${RFValue(12)}px;
  padding-left: ${RFValue(36)}px;
`;

export const CommentCardWrapper = styled.View`
  background-color: ${whiteColor};
  padding: ${RFValue(12)}px;
  gap: ${RFValue(8)}px;
  border-width: 1px;
  border-radius: ${RFValue(15)}px;
  border-color: ${black10Color};
`;

export const CommentInfoContainer = styled.View`
  flex-direction: row;
  gap: ${RFValue(8)}px;
`;

export const CommentAvatar = styled.Image`
  position: absolute;
  top: ${RFValue(20)}px;
  left: ${RFValue(12)}px;
  z-index: 1;
  width: ${RFValue(32)}px;
  height: ${RFValue(32)}px;
  border-radius: ${RFValue(100)}px;
  align-items: center;
`;

export const InfoColumn = styled.View`
  flex-direction: column;
  justify-content: space-between;
  padding-vertical: ${RFValue(2)}px;
`;

export const CommentAuthorNameWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${RFValue(4)}px;
`;
export const CommentAuthorName = styled.Text`
  font-size: ${RFValue(12)}px;
  font-family: ${Montserrat700};
`;

export const CommentDate = styled.Text`
  font-size: ${RFValue(12)}px;
  font-family: ${Montserrat300};
  color: ${black50Color}
`;

export const CommentContentContainer = styled.View`
  width: 100%;
`;

export const CommentContent = styled.Text`
  font-size: ${RFValue(12)}px;
  font-family: ${Montserrat300};
  color: ${blackColor};
`;

export const CommentFooter = styled.View`
  flex-direction: row;
  gap: ${RFValue(8)}px;
`;

export const CommentFooterSection = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${RFValue(4)}px;
`;

export const CommentFooterText = styled.Text`
  font-size: ${RFValue(12)}px;
  font-family: ${Montserrat300};
  color: ${blackColor};
`;
