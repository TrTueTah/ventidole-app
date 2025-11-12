import React, { useCallback } from 'react';
import { ActivityIndicator, RefreshControl } from 'react-native';
import * as S from './HomeScreen.style';
import ArtistCommunityList from './components/ArtistCommunityList/ArtistCommunityList';
import HomeBanner from './components/HomeBanner/HomeBanner';
import PostCard from 'components/Card/PostCard/PostCard';
import { useAppNavigation } from 'hooks/useAppNavigation';
import { usePosts } from './hooks/usePosts';
import { components } from 'src/schemes/openapi';
import { blackColor } from 'constants/colors';

type PostDto = components['schemas']['PostDto'];

const HomeScreen = () => {
  const navigation = useAppNavigation();
  const {
    posts,
    isLoading,
    isLoadingMore,
    hasMore,
    loadMore,
    refresh,
  } = usePosts({
    limit: 8,
    sortBy: 'createdAt',
    sortOrder: 'desc',
  });

  // Debug: Log posts data
  console.log('HomeScreen - posts:', posts);
  console.log('HomeScreen - isLoading:', isLoading);

  const handlePostPress = useCallback(
    (postId: string, userId: string) => {
      console.log('Post pressed:', postId);
      navigation.navigate('/post-stack', { postId, communityId: userId });
    },
    [navigation],
  );

  const handleEndReached = useCallback(() => {
    if (hasMore && !isLoadingMore) {
      loadMore();
    }
  }, [hasMore, isLoadingMore, loadMore]);

  const renderFooter = useCallback(() => {
    if (!isLoadingMore) return null;
    return (
      <S.LoaderContainer>
        <ActivityIndicator size="small" color={blackColor} />
      </S.LoaderContainer>
    );
  }, [isLoadingMore]);

  const renderItem = useCallback(
    ({ item }: { item: PostDto }) => {
      return (
        <S.TouchableZone
          onPress={() => handlePostPress(item.postId, item.userId)}
        >
          <PostCard
            post={item}
            containerStyle={{ borderRadius: 20 }}
          />
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
          </S.TopContainer>
        }
        renderItem={renderItem}
        keyExtractor={(item: PostDto) => item.postId}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={refresh}
            tintColor={blackColor}
          />
        }
      />
    </S.Container>
  );
};

export default HomeScreen;
