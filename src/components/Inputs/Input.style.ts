import styled from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';
import {blackColor, grayColor, transparentBlack20Color, whiteColor} from 'constants/colors';
import {Montserrat400} from 'constants/fonts';

export const TitleText = styled.Text`
  margin-bottom: 12px;
  color: ${blackColor};
  font-family: ${Montserrat400};
  font-size: 14px;
`;

export const WrapperInputIcon = styled.View`
  height: 100%;
  align-items: center;
  justify-content: center;
  padding-top: 8px;
  width: 20px;
`;

export const InputField = styled.TextInput`
  min-width: 200px;
  padding-left: 12px;
  padding-top: 8px;
  padding-bottom: 0;
  font-size: 14px;
`;

export const ErrorText = styled.Text`
  font-size: 12px;
  font-family: ${Montserrat400};
  color: rgba(239, 85, 85, 1);
`;

export const WrapperErrorText = styled.View`
  margin-top: 4px;
  margin-bottom: 4px;
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

export const InputTouchableWrappper = styled.TouchableOpacity`
  width: 100%;
  height: 40px;
  border-radius: 10px;
  border-width: 0;
  background-color: ${whiteColor};
  flex-direction: row;
  padding-right: 8px;
  padding-bottom: 8px;
  justify-content: space-between;
  border: 1px solid ${transparentBlack20Color};
`;
