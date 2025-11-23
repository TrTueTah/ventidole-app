import React from 'react';
import { Animated, ActivityIndicator, Alert } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import HeaderTransparent from 'components/Header/HeaderTransparent/HeaderTransparent';
import PostCard from 'components/Card/PostCard/PostCard';
import { useCommunityDetail } from './hooks/useCommunityDetail';
import { useCommunityPosts } from './hooks/useCommunityPosts';
import { useToggleCommunity } from './hooks/useToggleCommunity';
import * as S from './CommunityScreen.style';
import PlusIcon from 'assets/images/icons/plus.svg';
import { blackColor, primaryColor, whiteColor } from 'constants/colors';
import { formatNumber } from 'helpers/format-number';
import { components } from 'src/schemes/openapi';

const HEADER_HEIGHT = 400;

type PostDto = components['schemas']['PostDto'];

type CommunityScreenRouteProp = RouteProp<
  { CommunityScreen: { communityId: string } },
  'CommunityScreen'
>;

const CommunityScreen = () => {
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const route = useRoute<CommunityScreenRouteProp>();
  const navigation = useNavigation();

  // Get communityId from route params
  const communityId = route.params?.communityId;

  // Fetch community details
  const { community, isLoading: isCommunityLoading, refetch: refetchCommunity } = useCommunityDetail({
    communityId,
  });

  // Fetch community posts
  const {
    posts,
    isLoading: isPostsLoading,
    isLoadingMore,
    hasMore,
    loadMore,
    refresh,
  } = useCommunityPosts({
    communityId,
    limit: 20,
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
          <S.JoinButton onPress={handleJoinToggle} disabled={isToggling}>
            <PlusIcon width={24} height={24} color={blackColor} />
            <S.JoinText style={{ color: blackColor, fontSize: 14 }}>
              {community.isFollowing ? 'Joined' : 'Join'}
            </S.JoinText>
          </S.JoinButton>
        </S.HeaderContent>
      </S.HeaderContainer>
    );
  };

  const renderPost = ({ item }: { item: PostDto }) => (
    <PostCard post={item} />
  );

  const renderEmpty = () => {
    if (isPostsLoading) {
      return null;
    }

    return (
      <S.EmptyContainer>
        <S.EmptyText>No posts yet in this community</S.EmptyText>
      </S.EmptyContainer>
    );
  };

  const renderFooter = () => {
    if (!isLoadingMore) return null;

    return (
      <S.LoadingContainer>
        <ActivityIndicator color={primaryColor} />
      </S.LoadingContainer>
    );
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
      <Animated.FlatList
        data={posts}
        keyExtractor={item => item.postId}
        renderItem={renderPost}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        ListFooterComponent={renderFooter}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false },
        )}
        onEndReached={hasMore ? loadMore : undefined}
        onEndReachedThreshold={0.5}
        refreshing={false}
        onRefresh={refresh}
        initialNumToRender={6}
        maxToRenderPerBatch={10}
        windowSize={5}
        removeClippedSubviews
      />
      <S.FloatingButton onPress={handleCreatePost}>
        <PlusIcon width={24} height={24} color={whiteColor} />
      </S.FloatingButton>
    </S.Container>
  );
};

export default CommunityScreen;
