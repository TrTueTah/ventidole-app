import React, { FC } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Badge } from '@rneui/themed';

//import components
import { RFValue } from 'react-native-responsive-fontsize';
import { whiteColor } from 'constants/colors.ts';
import * as S from './HomeHeader.style';

//import icons
import Logo from 'assets/images/icons/logo.svg';
import NotificationBellIcon from 'assets/images/icons/bell.svg';
import { Montserrat700 } from 'constants/fonts';

const HomeHeader: FC = () => {
  const insets = useSafeAreaInsets();
  const [unreadCount, setUnreadCount] = React.useState(3); // Example unread count

  const headerInsets = {
    paddingTop: insets.top,
  };

  return (
    <S.Container style={headerInsets}>
      <S.WrapperHeader>
        <S.LeftHeader />
        <Logo height={RFValue(24)} />
        <S.NotificationButton
          onPress={() => setUnreadCount(unreadCount + 1)}
          activeOpacity={0.7}
        >
          <NotificationBellIcon width={22} height={22} />
          {unreadCount > 0 && (
            <Badge
              value={unreadCount}
              badgeStyle={S.BadgeStyle}
              textStyle={{
                color: whiteColor,
                fontSize: RFValue(10, 932),
                fontFamily: Montserrat700,
              }}
            />
          )}
        </S.NotificationButton>
      </S.WrapperHeader>
    </S.Container>
  );
};

export default HomeHeader;
