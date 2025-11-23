import React, { useCallback } from 'react';
import { ActivityIndicator, RefreshControl } from 'react-native';
import * as S from './HomeScreen.style';
import ArtistCommunityList from './components/ArtistCommunityList/ArtistCommunityList';
import HomeBanner from './components/HomeBanner/HomeBanner';
import LoadingSkeletons from './components/LoadingSkeletons/LoadingSkeletons';
import EmptyState from './components/EmptyState/EmptyState';
import PostCard from 'components/Card/PostCard/PostCard';
import { useAppNavigation } from 'hooks/useAppNavigation';
import { usePosts } from './hooks/usePosts';
import { components } from 'src/schemes/openapi';
import { blackColor } from 'constants/colors';
import { useCommunities } from './components/ArtistCommunityList/hooks/useComunities';

type PostDto = components['schemas']['PostDto'];

const HomeScreen = () => {
  const navigation = useAppNavigation();
  const {
    posts,
    isLoading: isLoadingPosts,
    isLoadingMore: isLoadingMorePosts,
    isRefreshing: isRefreshingPosts,
    hasMore: hasMorePosts,
    loadMore: loadMorePosts,
    refresh: refreshPosts,
  } = usePosts({
    limit: 8,
    sortBy: 'createdAt',
    sortOrder: 'desc',
  });

  const handlePostPress = useCallback(
    (postId: string, userId: string) => {
      console.log('Post pressed:', postId);
      navigation.navigate('/post-stack', { postId, communityId: userId });
    },
    [navigation],
  );

  const handleEndReached = useCallback(() => {
    if (hasMorePosts && !isLoadingMorePosts) {
      loadMorePosts();
    }
  }, [hasMorePosts, isLoadingMorePosts, loadMorePosts]);

  const renderFooter = useCallback(() => {
    if (!isLoadingMorePosts) return null;
    return (
      <S.LoaderContainer>
        <ActivityIndicator size="small" color={blackColor} />
      </S.LoaderContainer>
    );
  }, [isLoadingMorePosts]);

  const renderItem = useCallback(
    ({ item }: { item: PostDto }) => {
      return (
        <S.TouchableZone
          onPress={() => handlePostPress(item.postId, item.userId)}
        >
          <PostCard post={item} containerStyle={{ borderRadius: 20 }} />
        </S.TouchableZone>
      );
    },
    [handlePostPress],
  );

  return (
    <S.Container>
      <S.PostList
        data={posts}
        ListHeaderComponent={
          <S.TopContainer>
            <ArtistCommunityList />
            <HomeBanner />
            {(isLoadingPosts || isRefreshingPosts) && <LoadingSkeletons />}
          </S.TopContainer>
        }
        renderItem={renderItem}
        keyExtractor={(item: PostDto) => item.postId}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={!isLoadingPosts ? <EmptyState /> : null}
        refreshControl={
          <RefreshControl
            refreshing={isLoadingPosts}
            onRefresh={refreshPosts}
            tintColor={blackColor}
          />
        }
      />
    </S.Container>
  );
};

export default HomeScreen;
