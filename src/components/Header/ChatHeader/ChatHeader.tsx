import React, { FC } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RFValue } from 'react-native-responsive-fontsize';
import * as S from './ChatHeader.style';
import ChatHeaderIcon from 'assets/images/icons/chat-header.svg';
import { secondaryColor } from 'constants/colors';
const ChatHeader: FC = () => {
  const insets = useSafeAreaInsets();
  const [unreadCount, setUnreadCount] = React.useState(3); // Example unread count

  const headerInsets = {
    paddingTop: insets.top,
  };

  return (
    <S.Container style={headerInsets}>
      <S.WrapperHeader>
        <ChatHeaderIcon width={RFValue(40, 932)} height={RFValue(40, 932)} color={secondaryColor} />
        <S.HeaderTitle>Channels</S.HeaderTitle>
      </S.WrapperHeader>
    </S.Container>
  );
};

export default ChatHeader;
