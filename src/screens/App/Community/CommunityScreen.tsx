import React, { useState } from 'react';
import { Animated, ActivityIndicator, Alert } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import HeaderTransparent from 'components/Header/HeaderTransparent/HeaderTransparent';
import { useCommunityDetail } from './hooks/useCommunityDetail';
import { useToggleCommunity } from './hooks/useToggleCommunity';
import AboutTab from './components/AboutTab';
import ArtistTab from './components/ArtistTab';
import FanTab from './components/FanTab';
import * as S from './CommunityScreen.style';
import PlusIcon from 'assets/images/icons/plus.svg';
import CheckIcon from 'assets/images/icons/check.svg';
import { blackColor, primaryColor, whiteColor } from 'constants/colors';
import { formatNumber } from 'helpers/format-number';
import { components } from 'src/schemes/openapi';

const HEADER_HEIGHT = 400;

type CommunityScreenRouteProp = RouteProp<
  { CommunityScreen: { communityId: string } },
  'CommunityScreen'
>;

type TabType = 'about' | 'artist' | 'fan';

const CommunityScreen = () => {
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const route = useRoute<CommunityScreenRouteProp>();
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState<TabType>('about');

  // Get communityId from route params
  const communityId = route.params?.communityId;

  // Fetch community details
  const { community, isLoading: isCommunityLoading, refetch: refetchCommunity } = useCommunityDetail({
    communityId,
  });

  // Toggle join/leave
  const { toggleCommunity, isToggling } = useToggleCommunity();

  const handleJoinToggle = React.useCallback(() => {
    if (!community || !communityId) return;

    if (community.isFollowing) {
      Alert.alert(
        'Leave Community',
        'Are you sure you want to leave this community?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Leave',
            style: 'destructive',
            onPress: async () => {
              try {
                await toggleCommunity(communityId, true);
                refetchCommunity();
              } catch (error: any) {
                Alert.alert('Error', error.message || 'Failed to leave community');
              }
            },
          },
        ]
      );
    } else {
      toggleCommunity(communityId, false)
        .then(() => {
          refetchCommunity();
        })
        .catch((error: any) => {
          Alert.alert('Error', error.message || 'Failed to join community');
        });
    }
  }, [community, communityId, toggleCommunity, refetchCommunity]);

  const handleCreatePost = React.useCallback(() => {
    // TODO: Navigate to create post screen with communityId
    Alert.alert('Create Post', 'Create post functionality coming soon!');
  }, []);

  console.log('CommunityScreen rendered', community);

  // phần header cover + intro, render riêng ở đầu list
  const renderHeader = () => {
    if (!community) return null;

    const followerText = formatNumber(community.followerCount);
    const statusText = community.isFollowing ? 'Joined' : '';
    const subtitleText = `${followerText} members${statusText ? ` · ${statusText}` : ''}`;

    return (
      <S.HeaderContainer
        style={{
          height: HEADER_HEIGHT,
          overflow: 'visible',
          backgroundColor: '#000',
        }}
      >
        <S.HeaderImage
          source={{
            uri: community.backgroundUrl || 'https://via.placeholder.com/400',
          }}
          style={{
            top: scrollY.interpolate({
              inputRange: [-200, 0],
              outputRange: [-200, 0],
              extrapolate: 'clamp',
            }),
            height: scrollY.interpolate({
              inputRange: [-200, 0],
              outputRange: [HEADER_HEIGHT + 200, HEADER_HEIGHT],
              extrapolate: 'clamp',
            }),
          }}
          resizeMode="cover"
        />
        <S.HeaderContent>
          <S.BlurBackground />
          <S.HeaderSubtitle>{subtitleText}</S.HeaderSubtitle>
          <S.HeaderTitle>{community.name}</S.HeaderTitle>
          <S.JoinButton onPress={handleJoinToggle} disabled={isToggling} isJoined={community.isFollowing}>
            {community.isFollowing ? (
              <CheckIcon width={24} height={24} color={whiteColor} />
            ) : (
              <PlusIcon width={24} height={24} color={blackColor} />
            )}
            <S.JoinText isJoined={community.isFollowing}>
              {community.isFollowing ? 'Joined' : 'Join'}
            </S.JoinText>
          </S.JoinButton>
        </S.HeaderContent>
      </S.HeaderContainer>
    );
  };

  const renderTabBar = () => (
    <S.TabBarContainer>
      <S.TabBar>
        <S.TabItem isActive={activeTab === 'about'} onPress={() => setActiveTab('about')}>
          <S.TabLabel isActive={activeTab === 'about'}>About</S.TabLabel>
        </S.TabItem>
        <S.TabItem isActive={activeTab === 'artist'} onPress={() => setActiveTab('artist')}>
          <S.TabLabel isActive={activeTab === 'artist'}>Artist</S.TabLabel>
        </S.TabItem>
        <S.TabItem isActive={activeTab === 'fan'} onPress={() => setActiveTab('fan')}>
          <S.TabLabel isActive={activeTab === 'fan'}>Fan</S.TabLabel>
        </S.TabItem>
      </S.TabBar>
    </S.TabBarContainer>
  );

  const renderTabContent = () => {
    if (!communityId || !community) return null;

    switch (activeTab) {
      case 'about':
        return <AboutTab community={community} />;
      case 'artist':
        return <ArtistTab communityId={communityId} />;
      case 'fan':
        return <FanTab communityId={communityId} />;
      default:
        return null;
    }
  };

  if (!communityId) {
    return (
      <S.Container>
        <S.EmptyContainer style={{ flex: 1 }}>
          <S.EmptyText>Community not found</S.EmptyText>
        </S.EmptyContainer>
      </S.Container>
    );
  }

  if (isCommunityLoading) {
    return (
      <S.Container>
        <S.LoadingContainer style={{ flex: 1 }}>
          <ActivityIndicator size="large" color={primaryColor} />
        </S.LoadingContainer>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <HeaderTransparent scrollY={scrollY} title={community?.name || ''} />
      <Animated.ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false },
        )}
      >
        {renderHeader()}
        {renderTabBar()}
        {renderTabContent()}
      </Animated.ScrollView>
      <S.FloatingButton onPress={handleCreatePost}>
        <PlusIcon width={24} height={24} color={whiteColor} />
      </S.FloatingButton>
    </S.Container>
  );
};

export default CommunityScreen;
