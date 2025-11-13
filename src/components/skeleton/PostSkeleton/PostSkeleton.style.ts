import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { shadowColor, whiteColor } from '../../../constants/colors';

export const SkeletonContainer = styled.View`
  background-color: ${whiteColor};
  border-radius: ${RFValue(20)}px;
  padding: ${RFValue(12)}px;
  margin-bottom: ${RFValue(12)}px;
  shadow-color: ${shadowColor};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 3;
`;

export const SkeletonHeader = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${RFValue(12)}px;
`;

export const SkeletonAvatar = styled.View`
  width: ${RFValue(40)}px;
  height: ${RFValue(40)}px;
  border-radius: ${RFValue(20)}px;
  background-color: #E1E9EE;
  margin-right: ${RFValue(12)}px;
`;

export const SkeletonTextContainer = styled.View`
  flex: 1;
`;

export const SkeletonText = styled.View`
  height: ${RFValue(14)}px;
  background-color: #E1E9EE;
  border-radius: ${RFValue(4)}px;
  margin-bottom: ${RFValue(8)}px;
`;

export const SkeletonTextShort = styled(SkeletonText)`
  width: 60%;
`;

export const SkeletonContent = styled.View`
  height: ${RFValue(16)}px;
  background-color: #E1E9EE;
  border-radius: ${RFValue(4)}px;
  margin-bottom: ${RFValue(12)}px;
`;

export const SkeletonContentShort = styled(SkeletonContent)`
  width: 80%;
  margin-bottom: ${RFValue(16)}px;
`;

export const SkeletonImage = styled.View`
  height: ${RFValue(200)}px;
  background-color: #E1E9EE;
  border-radius: ${RFValue(12)}px;
  margin-bottom: ${RFValue(12)}px;
`;

export const SkeletonFooter = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const SkeletonFooterItem = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const SkeletonIcon = styled.View`
  width: ${RFValue(20)}px;
  height: ${RFValue(20)}px;
  background-color: #E1E9EE;
  border-radius: ${RFValue(10)}px;
  margin-right: ${RFValue(6)}px;
`;

export const SkeletonFooterText = styled.View`
  width: ${RFValue(30)}px;
  height: ${RFValue(12)}px;
  background-color: #E1E9EE;
  border-radius: ${RFValue(4)}px;
`;