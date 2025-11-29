import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Montserrat400, Montserrat500, Montserrat700 } from 'constants/fonts';
import { whiteColor, blackColor, grayColor, primaryColor, gray1Color } from 'constants/colors';
import { Switch } from 'react-native';

export const Container = styled.View`
  flex: 1;
  background-color: ${whiteColor};
  padding-top: 40px;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom-width: 1px;
  border-bottom-color: ${gray1Color};
`;

export const CancelButton = styled.TouchableOpacity`
  padding: 4px 0;
`;

export const CancelText = styled.Text`
  font-size: ${RFValue(16, 932)}px;
  font-family: ${Montserrat400};
  color: ${blackColor};
`;

export const HeaderCenter = styled.View`
  align-items: center;
  flex: 1;
`;

export const HeaderTitle = styled.Text`
  font-size: ${RFValue(16, 932)}px;
  font-family: ${Montserrat700};
  color: ${blackColor};
`;

export const HeaderSubtitle = styled.Text`
  font-size: ${RFValue(11, 932)}px;
  font-family: ${Montserrat400};
  color: ${grayColor};
  margin-top: 2px;
  letter-spacing: 0.5px;
`;

export const PostButton = styled.TouchableOpacity<{ disabled?: boolean }>`
  padding: 4px 0;
  opacity: ${({ disabled }: { disabled?: boolean }) => (disabled ? 0.5 : 1)};
`;

export const PostButtonText = styled.Text<{ disabled?: boolean }>`
  font-size: ${RFValue(16, 932)}px;
  font-family: ${Montserrat700};
  color: ${({ disabled }: { disabled?: boolean }) => (disabled ? grayColor : primaryColor)};
`;

export const ContentContainer = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    padding: 20,
  },
})`
  flex: 1;
`;

export const TextArea = styled.TextInput`
  font-size: ${RFValue(15, 932)}px;
  font-family: ${Montserrat400};
  color: ${blackColor};
  min-height: 150px;
  padding: 0;
`;

export const ImagePreviewContainer = styled.View`
  margin-top: 20px;
  border-radius: 12px;
  overflow: hidden;
`;

export const ImagePreviewWrapper = styled.View`
  position: relative;
  margin-bottom: 12px;
  border-radius: 12px;
  overflow: hidden;
`;

export const ImagePreview = styled.Image`
  width: 100%;
  height: 300px;
  border-radius: 12px;
`;

export const RemoveImageButton = styled.TouchableOpacity`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 32px;
  height: 32px;
  border-radius: 16px;
  background-color: rgba(0, 0, 0, 0.6);
  align-items: center;
  justify-content: center;
`;

export const RemoveImageIcon = styled.Text`
  font-size: ${RFValue(24, 932)}px;
  color: ${whiteColor};
  line-height: ${RFValue(24, 932)}px;
`;

export const BottomSection = styled.View`
  padding: 16px 20px;
  border-top-width: 1px;
  border-top-color: ${gray1Color};
  background-color: ${whiteColor};
`;

export const BottomActionsRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 16px;
`;

export const ActionButton = styled.TouchableOpacity`
  width: 44px;
  height: 44px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background-color: ${gray1Color};
`;

export const ActionIcon = styled.View`
  width: 24px;
  height: 24px;
  align-items: center;
  justify-content: center;
`;

export const HideFromArtistsToggle = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
`;

export const ToggleSwitch = styled(Switch)``;

export const ToggleLabel = styled.Text`
  font-size: ${RFValue(14, 932)}px;
  font-family: ${Montserrat400};
  color: ${blackColor};
`;

// Legacy styles (keeping for backward compatibility)
export const CloseButton = styled.TouchableOpacity`
  padding: 8px;
`;

export const FormContainer = styled.View`
  padding: 20px;
`;

export const Section = styled.View`
  margin-bottom: 24px;
`;

export const Label = styled.Text`
  font-size: ${RFValue(14, 932)}px;
  font-family: ${Montserrat500};
  color: ${blackColor};
  margin-bottom: 12px;
`;

export const VisibilityContainer = styled.View`
  flex-direction: row;
  gap: 8px;
`;

export const VisibilityOption = styled.TouchableOpacity<{ isActive: boolean }>`
  flex: 1;
  padding: 12px;
  border-radius: 8px;
  border-width: 1px;
  border-color: ${({ isActive }) => (isActive ? primaryColor : gray1Color)};
  background-color: ${({ isActive }) => (isActive ? primaryColor : whiteColor)};
  align-items: center;
`;

export const VisibilityText = styled.Text<{ isActive: boolean }>`
  font-size: ${RFValue(13, 932)}px;
  font-family: ${Montserrat500};
  color: ${({ isActive }) => (isActive ? whiteColor : blackColor)};
`;

export const CharacterCount = styled.Text`
  font-size: ${RFValue(12, 932)}px;
  font-family: ${Montserrat400};
  color: ${grayColor};
  text-align: right;
  margin-top: 8px;
`;

export const Footer = styled.View`
  padding: 16px 20px;
  border-top-width: 1px;
  border-top-color: ${gray1Color};
  background-color: ${whiteColor};
`;
