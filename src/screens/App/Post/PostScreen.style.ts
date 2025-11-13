import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  backgroundColor,
  whiteColor,
  blackColor,
  black50Color,
  black10Color,
} from 'constants/colors';
import {
  Montserrat700,
  Montserrat400,
  Montserrat500,
  Montserrat300,
} from 'constants/fonts';
import { TextInput } from 'react-native';

export const Container = styled.View`
  flex: 1;
  background-color: ${backgroundColor};
`;

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${backgroundColor};
`;

export const ErrorContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${backgroundColor};
  padding: ${RFValue(20)}px;
`;

export const ErrorText = styled.Text`
  font-family: ${Montserrat500};
  font-size: ${RFValue(14)}px;
  color: ${black50Color};
  text-align: center;
`;

// Post Skeleton Styles
export const PostSkeletonContainer = styled.View`
  background-color: ${whiteColor};
  border-radius: ${RFValue(20)}px;
  padding: ${RFValue(12)}px;
  margin-bottom: ${RFValue(12)}px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 3;
`;

export const PostSkeletonHeader = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${RFValue(12)}px;
`;

export const PostSkeletonAvatar = styled.View`
  width: ${RFValue(40)}px;
  height: ${RFValue(40)}px;
  border-radius: ${RFValue(20)}px;
  background-color: #E1E9EE;
  margin-right: ${RFValue(12)}px;
`;

export const PostSkeletonTextContainer = styled.View`
  flex: 1;
`;

export const PostSkeletonText = styled.View`
  height: ${RFValue(14)}px;
  background-color: #E1E9EE;
  border-radius: ${RFValue(4)}px;
  margin-bottom: ${RFValue(8)}px;
`;

export const PostSkeletonTextShort = styled(PostSkeletonText)`
  width: 60%;
`;

export const PostSkeletonContent = styled.View`
  height: ${RFValue(16)}px;
  background-color: #E1E9EE;
  border-radius: ${RFValue(4)}px;
  margin-bottom: ${RFValue(12)}px;
`;

export const PostSkeletonContentShort = styled(PostSkeletonContent)`
  width: 80%;
  margin-bottom: ${RFValue(16)}px;
`;

export const PostSkeletonImage = styled.View`
  height: ${RFValue(200)}px;
  background-color: #E1E9EE;
  border-radius: ${RFValue(12)}px;
  margin-bottom: ${RFValue(12)}px;
`;

// Empty State Styles
export const EmptyCommentsContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: ${RFValue(40)}px;
  margin-top: ${RFValue(20)}px;
`;

export const EmptyCommentsText = styled.Text`
  font-family: ${Montserrat500};
  font-size: ${RFValue(16)}px;
  color: ${black50Color};
  text-align: center;
  margin-bottom: ${RFValue(8)}px;
`;

export const EmptyCommentsSubText = styled.Text`
  font-family: ${Montserrat300};
  font-size: ${RFValue(14)}px;
  color: ${black50Color};
  text-align: center;
  opacity: 0.7;
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
  color: ${black50Color};
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

export const CommentInputContainer = styled.View`
  position: relative;
  bottom: 0;
  left: 0;
  right: 0;
  flex-direction: row;
  align-items: flex-end;
  background-color: ${whiteColor};
  border-top-width: 1px;
  border-color: #eee;
  padding: ${RFValue(8)}px ${RFValue(12)}px;
  gap: ${RFValue(8)}px;
  padding-bottom: ${RFValue(32)}px;
`;

export const CommentInputWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  padding: ${RFValue(4)}px ${RFValue(12)}px;
  border-width: 1px;
  border-color: ${black10Color};
  border-radius: ${RFValue(20)}px;
  width: 80%;
  max-height: ${RFValue(200)}px;
  min-height: ${RFValue(20)}px;
  flex-grow: 1;
`;

export const CommentInput = styled(TextInput)`
  max-height: ${RFValue(200)}px;
  min-height: ${RFValue(20)}px;
  font-family: ${Montserrat300};
  font-size: ${RFValue(12)}px;
  line-height: ${RFValue(12)}px;
  width: 100%;
`;

export const SendButton = styled.Pressable`
  width: ${RFValue(40)}px;
  height: ${RFValue(40)}px;
  border-radius: ${RFValue(20)}px;
  align-items: center;
  justify-content: center;
  background-color: ${(props: { disabled?: boolean }) => props.disabled ? 'transparent' : 'transparent'};
`;
