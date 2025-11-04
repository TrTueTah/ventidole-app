import React from 'react';
import * as S from './ChatScreen.style';
import { RFValue } from 'react-native-responsive-fontsize';
import { primaryColor } from 'constants/colors';
import VerifyIcon from 'assets/images/icons/verify.svg';
import { timeAgoShort } from 'helpers/date-converter';
import PlusIcon from 'assets/images/icons/plus.svg';

const SAMPLE_DATA = [
  {
    id: '1',
    artist: {
      name: 'BDD',
      group: 'KT Rolster',
      image:
        'https://res.cloudinary.com/dsc9afexw/image/upload/v1756372055/5c53d14e4ebbf5c723559e7b3f27c628baac4651_izhcbp.png',
    },
    lastSendTime: 1762097425,
  },
  {
    id: '2',
    artist: {
      name: 'Faker',
      group: 'T1',
      image:
        'https://res.cloudinary.com/dsc9afexw/image/upload/v1756372055/5c53d14e4ebbf5c723559e7b3f27c628baac4651_izhcbp.png',
    },
    lastSendTime: 1762097425,
  },
  {
    id: '3',
    artist: {
      name: 'Canyon',
      group: 'DK',
      image:
        'https://res.cloudinary.com/dsc9afexw/image/upload/v1756372055/5c53d14e4ebbf5c723559e7b3f27c628baac4651_izhcbp.png',
    },
    lastSendTime: 1762097425,
  },
];

const renderItem = ({ item }: { item: (typeof SAMPLE_DATA)[number] }) => {
  return (
    <S.ChannelItem>
      <S.ChannelItemWrapper>
        <S.ChannelInfoWrapper>
          <S.ChannelImage source={{ uri: item.artist.image }} />
          <S.ChannelInfo>
            <S.NameWrapper>
              <S.ChannelName>{item.artist.name}</S.ChannelName>
              <VerifyIcon
                color={primaryColor}
                width={RFValue(14)}
                height={RFValue(14)}
              />
            </S.NameWrapper>

            <S.ChannelGroup>{item.artist.group}</S.ChannelGroup>
          </S.ChannelInfo>
        </S.ChannelInfoWrapper>
        <S.LastSendTime>{timeAgoShort(item.lastSendTime)}</S.LastSendTime>
        <S.Badge>
          <S.BadgeText>3</S.BadgeText>
        </S.Badge>
      </S.ChannelItemWrapper>
    </S.ChannelItem>
  );
};

const renderHeader = () => {
  return (
    <S.HeaderContainer>
      <S.HeaderWrapper>
        <S.HeaderTitle>Channels</S.HeaderTitle>
        <S.HeaderContent>
          <S.AddButton>
            <PlusIcon width={RFValue(24)} height={RFValue(24)} color={primaryColor} />
          </S.AddButton>
          <S.Description>
            Join your favorite artist's channel to receive new notification
          </S.Description>
        </S.HeaderContent>
      </S.HeaderWrapper>
    </S.HeaderContainer>
  );
}

const ChatScreen = () => {
  return (
    <S.Container>
      <S.ChannelList
        data={SAMPLE_DATA}
        ListHeaderComponent={renderHeader()}
        renderItem={({ item }: { item: (typeof SAMPLE_DATA)[number] }) =>
          renderItem({ item })
        }
      />
    </S.Container>
  );
};

export default ChatScreen;
