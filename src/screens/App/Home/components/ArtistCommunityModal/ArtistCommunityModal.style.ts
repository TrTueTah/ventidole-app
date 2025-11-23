import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { blackColor, whiteColor, gray1Color, primaryColor, black20Color } from 'constants/colors';
import { Montserrat400, Montserrat500, Montserrat700 } from 'constants/fonts';

export const Container = styled.View`
  flex: 1;
  background-color: ${whiteColor};
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  padding: ${RFValue(16)}px;
  padding-top: ${RFValue(50)}px;
  border-bottom-width: 1px;
  border-bottom-color: ${gray1Color};
`;

export const BackButton = styled.TouchableOpacity`
  padding: ${RFValue(8, 932)}px;
  margin-right: ${RFValue(12)}px;
  width: ${RFValue(40, 932)}px;
  height: ${RFValue(40, 932)}px;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: ${RFValue(20, 932)}px;
`;

export const SearchContainer = styled.View`
  flex: 1;
  background-color: rgba(30, 30, 30, 0.05);
  border-radius: ${RFValue(20, 932)}px;
  flex-direction: row;
  align-items: center;
  padding: 0 ${RFValue(16, 932)}px;
  height: ${RFValue(40, 932)}px;
`;

export const SearchIcon = styled.View`
  margin-right: ${RFValue(8, 932)}px;
`;

export const SearchInput = styled.TextInput`
  flex: 1;
  font-size: ${RFValue(14, 932)}px;
  color: ${blackColor};
  font-family: ${Montserrat400};
`;

export const FilterContainer = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})`
  max-height: ${RFValue(60, 932)}px;
  border-bottom-width: 1px;
  border-bottom-color: ${gray1Color};
`;

export const FilterContent = styled.View`
  flex-direction: row;
  padding: ${RFValue(12, 932)}px ${RFValue(16, 932)}px;
  gap: ${RFValue(12, 932)}px;
`;

export const FilterButton = styled.TouchableOpacity<{ isActive: boolean }>`
  padding: ${RFValue(8, 932)}px ${RFValue(16, 932)}px;
  border-radius: ${RFValue(20, 932)}px;
  background-color: ${(props: { isActive: boolean }) => (props.isActive ? blackColor : 'transparent')};
  border-width: 1px;
  border-color: ${(props: { isActive: boolean }) => (props.isActive ? blackColor : gray1Color)};
  max-height: ${RFValue(36, 932)}px;
`;

export const FilterText = styled.Text<{ isActive: boolean }>`
  font-size: ${RFValue(14, 932)}px;
  color: ${(props: { isActive: boolean }) => (props.isActive ? whiteColor : blackColor)};
  font-family: ${Montserrat500};
`;

export const ContentList = styled.FlatList`
  flex: 1;
  background-color: ${whiteColor};
`;

export const CommunityItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: ${RFValue(16, 932)}px;
  border-bottom-width: 1px;
  border-bottom-color: ${gray1Color};
`;

export const CommunityAvatar = styled.Image`
  width: ${RFValue(56, 932)}px;
  height: ${RFValue(56, 932)}px;
  border-radius: ${RFValue(28, 932)}px;
  margin-right: ${RFValue(12, 932)}px;
`;

export const CommunityInfo = styled.View`
  flex: 1;
  justify-content: center;
`;

export const CommunityName = styled.Text`
  font-size: ${RFValue(16, 932)}px;
  color: ${blackColor};
  font-family: ${Montserrat700};
  margin-bottom: ${RFValue(4, 932)}px;
`;

export const CommunityBadge = styled.View`
  background-color: ${primaryColor};
  padding: ${RFValue(2, 932)}px ${RFValue(8, 932)}px;
  border-radius: ${RFValue(4, 932)}px;
  align-self: flex-start;
  margin-bottom: ${RFValue(4, 932)}px;
`;

export const CommunityBadgeText = styled.Text`
  font-size: ${RFValue(10, 932)}px;
  color: ${whiteColor};
  font-family: ${Montserrat700};
  text-transform: uppercase;
`;

export const CommunityMembers = styled.Text`
  font-size: ${RFValue(12, 932)}px;
  color: ${black20Color};
  font-family: ${Montserrat400};
`;

export const JoinButton = styled.TouchableOpacity<{ isJoined: boolean }>`
  padding: ${RFValue(8, 932)}px ${RFValue(24, 932)}px;
  border-radius: ${RFValue(20, 932)}px;
  background-color: ${(props: { isJoined: boolean }) => (props.isJoined ? 'transparent' : primaryColor)};
  border-width: ${(props: { isJoined: boolean }) => (props.isJoined ? '1px' : '0px')};
  border-color: ${gray1Color};
`;

export const JoinButtonText = styled.Text<{ isJoined: boolean }>`
  font-size: ${RFValue(14, 932)}px;
  color: ${(props: { isJoined: boolean }) => (props.isJoined ? blackColor : whiteColor)};
  font-family: ${Montserrat700};
`;

export const EmptyContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${RFValue(32, 932)}px;
`;

export const EmptyText = styled.Text`
  font-size: ${RFValue(16, 932)}px;
  color: ${black20Color};
  font-family: ${Montserrat400};
  text-align: center;
`;

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
