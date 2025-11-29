import React, { useState } from 'react';
import { Animated, ActivityIndicator, Alert, ListRenderItem } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import HeaderTransparent from 'components/Header/HeaderTransparent/HeaderTransparent';
import { useCommunityDetail } from './hooks/useCommunityDetail';
import { useToggleCommunity } from './hooks/useToggleCommunity';
import AboutTab from './components/AboutTab';
import ArtistTab from './components/ArtistTab';
import FanTab from './components/FanTab';
import CreatePostModal from './components/CreatePostModal/CreatePostModal';
import * as S from './CommunityScreen.style';
import PlusIcon from 'assets/images/icons/plus.svg';
import CheckIcon from 'assets/images/icons/check.svg';
import { blackColor, primaryColor, whiteColor } from 'constants/colors';
import { formatNumber } from 'helpers/format-number';

const HEADER_HEIGHT = 400;

type ListItem = {
  type: 'header' | 'tabBar' | 'content';
};

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
  const [isCreatePostModalVisible, setIsCreatePostModalVisible] = useState(false);

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
    setIsCreatePostModalVisible(true);
  }, []);

  const handleCloseCreatePostModal = React.useCallback(() => {
    setIsCreatePostModalVisible(false);
  }, []);

  const handlePostCreated = React.useCallback(() => {
    // Refresh the posts in the active tab
    if (activeTab === 'artist' || activeTab === 'fan') {
      // The tabs will auto-refresh when switching back or can add a refresh mechanism
    }
  }, [activeTab]);

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

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    // Don't reset scroll position when changing tabs
  };

  const renderStickyTabBar = () => {
    const opacity = scrollY.interpolate({
      inputRange: [HEADER_HEIGHT - 100, HEADER_HEIGHT],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });

    const translateY = scrollY.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 40],
      extrapolate: 'clamp',
    });

    return (
      <S.StickyTabBarContainer style={{ opacity, transform: [{ translateY }] }}>
        <S.TabBar>
          <S.TabItem isActive={activeTab === 'about'} onPress={() => handleTabChange('about')}>
            <S.TabLabel isActive={activeTab === 'about'}>About</S.TabLabel>
          </S.TabItem>
          <S.TabItem isActive={activeTab === 'artist'} onPress={() => handleTabChange('artist')}>
            <S.TabLabel isActive={activeTab === 'artist'}>Artist</S.TabLabel>
          </S.TabItem>
          <S.TabItem isActive={activeTab === 'fan'} onPress={() => handleTabChange('fan')}>
            <S.TabLabel isActive={activeTab === 'fan'}>Fan</S.TabLabel>
          </S.TabItem>
        </S.TabBar>
      </S.StickyTabBarContainer>
    );
  };

  const renderTabBar = () => (
    <S.TabBarContainer>
      <S.TabBar>
        <S.TabItem isActive={activeTab === 'about'} onPress={() => handleTabChange('about')}>
          <S.TabLabel isActive={activeTab === 'about'}>About</S.TabLabel>
        </S.TabItem>
        <S.TabItem isActive={activeTab === 'artist'} onPress={() => handleTabChange('artist')}>
          <S.TabLabel isActive={activeTab === 'artist'}>Artist</S.TabLabel>
        </S.TabItem>
        <S.TabItem isActive={activeTab === 'fan'} onPress={() => handleTabChange('fan')}>
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

  const listData: ListItem[] = [
    { type: 'header' },
    { type: 'tabBar' },
    { type: 'content' },
  ];

  const renderItem: ListRenderItem<ListItem> = ({ item }) => {
    switch (item.type) {
      case 'header':
        return renderHeader();
      case 'tabBar':
        return renderTabBar();
      case 'content':
        return renderTabContent();
      default:
        return null;
    }
  };

  return (
    <S.Container>
      <HeaderTransparent scrollY={scrollY} title={community?.name || ''} />
      {renderStickyTabBar()}
      <Animated.FlatList
        data={listData}
        renderItem={renderItem}
        keyExtractor={(item) => item.type}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false },
        )}
      />
      <S.FloatingButton onPress={handleCreatePost}>
        <PlusIcon width={24} height={24} color={whiteColor} />
      </S.FloatingButton>
      {communityId && (
        <CreatePostModal
          visible={isCreatePostModalVisible}
          onClose={handleCloseCreatePostModal}
          communityId={communityId}
          onPostCreated={handlePostCreated}
        />
      )}
    </S.Container>
  );
};

export default CommunityScreen;
