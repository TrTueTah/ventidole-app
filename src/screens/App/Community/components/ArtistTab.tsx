import React from 'react';
import { ActivityIndicator, FlatList, ListRenderItem } from 'react-native';
import PostCard from 'components/Card/PostCard/PostCard';
import { useCommunityPosts } from '../hooks/useCommunityPosts';
import { components } from 'src/schemes/openapi';
import * as S from '../CommunityScreen.style';
import { primaryColor } from 'constants/colors';

type PostDto = components['schemas']['PostDto'];

interface ArtistTabProps {
  communityId: string;
}

const ArtistTab: React.FC<ArtistTabProps> = ({ communityId }) => {
  const {
    posts,
    isLoading,
    isLoadingMore,
    isRefreshing,
    hasMore,
    loadMore,
    refresh,
  } = useCommunityPosts({
    communityId,
    limit: 20,
    authorFilter: 'idol',
  });

  const renderItem: ListRenderItem<PostDto> = ({ item }) => (
    <PostCard post={item} />
  );

  const renderFooter = () => {
    if (!isLoadingMore) return null;
    return (
      <S.LoadingContainer>
        <ActivityIndicator color={primaryColor} />
      </S.LoadingContainer>
    );
  };

  const renderEmpty = () => {
    if (isLoading) return null;
    return (
      <S.EmptyContainer>
        <S.EmptyText>No posts from artists yet</S.EmptyText>
      </S.EmptyContainer>
    );
  };

  const handleEndReached = () => {
    if (hasMore && !isLoadingMore && !isLoading) {
      loadMore();
    }
  };

  if (isLoading) {
    return (
      <S.LoadingContainer>
        <ActivityIndicator color={primaryColor} />
      </S.LoadingContainer>
    );
  }

  return (
    <FlatList
      data={posts}
      renderItem={renderItem}
      keyExtractor={(item) => item.postId}
      contentContainerStyle={{ padding: 16, gap: 12 }}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
      onRefresh={refresh}
      refreshing={isRefreshing}
      ListFooterComponent={renderFooter}
      ListEmptyComponent={renderEmpty}
    />
  );
};

export default ArtistTab;
