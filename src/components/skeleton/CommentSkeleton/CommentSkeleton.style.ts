import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { whiteColor, black10Color } from '../../../constants/colors';

export const CommentSkeletonContainer = styled.View`
  background-color: ${whiteColor};
  padding: ${RFValue(12)}px;
  margin-bottom: ${RFValue(8)}px;
  border-bottom-width: 1px;
  border-bottom-color: ${black10Color};
`;

export const CommentSkeletonHeader = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${RFValue(8)}px;
`;

export const CommentSkeletonAvatar = styled.View`
  width: ${RFValue(32)}px;
  height: ${RFValue(32)}px;
  border-radius: ${RFValue(16)}px;
  background-color: #E1E9EE;
  margin-right: ${RFValue(10)}px;
`;

export const CommentSkeletonName = styled.View`
  width: ${RFValue(80)}px;
  height: ${RFValue(12)}px;
  background-color: #E1E9EE;
  border-radius: ${RFValue(4)}px;
`;

export const CommentSkeletonText = styled.View`
  height: ${RFValue(14)}px;
  background-color: #E1E9EE;
  border-radius: ${RFValue(4)}px;
  margin-bottom: ${RFValue(6)}px;
`;

export const CommentSkeletonTextShort = styled(CommentSkeletonText)`
  width: 70%;
  margin-bottom: ${RFValue(8)}px;
`;

export const CommentSkeletonFooter = styled.View`
  flex-direction: row;
  margin-top: ${RFValue(8)}px;
`;

export const CommentSkeletonFooterItem = styled.View`
  flex-direction: row;
  align-items: center;
  margin-right: ${RFValue(16)}px;
`;

export const CommentSkeletonIcon = styled.View`
  width: ${RFValue(16)}px;
  height: ${RFValue(16)}px;
  background-color: #E1E9EE;
  border-radius: ${RFValue(8)}px;
  margin-right: ${RFValue(4)}px;
`;

export const CommentSkeletonCount = styled.View`
  width: ${RFValue(20)}px;
  height: ${RFValue(10)}px;
  background-color: #E1E9EE;
  border-radius: ${RFValue(4)}px;
`;