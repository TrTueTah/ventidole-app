import React, { useState, useCallback } from 'react';
import * as S from './PostScreen.style';
import PostCard from 'components/Card/PostCard/PostCard';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { ActivityIndicator, Platform, RefreshControl } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { formatNumber } from 'helpers/format-number';
import HeartOutline from 'assets/images/icons/heart-outline.svg';
import SendIcon from 'assets/images/icons/send.svg';
import { blackColor, primaryColor } from 'constants/colors';
import CommentCard from 'components/Card/CommentCard/CommentCard';
import { useAppNavigation } from 'hooks/useAppNavigation';
import { usePostDetail } from './hooks/usePostDetail';
import { useComments } from './hooks/useComments';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from 'src/typescript/types';
import { components } from 'src/schemes/openapi';

type PostScreenRouteProp = RouteProp<RootStackParamList, '/post-stack'>;
type CommentDto = components['schemas']['CommentDto'];

const PostScreen = () => {
  const [commentText, setCommentText] = useState('');
  const navigation = useAppNavigation();
  const route = useRoute<PostScreenRouteProp>();
  const { postId } = route.params;

  const { post, isLoading: postLoading, error: postError } = usePostDetail({ postId });
  const { 
    comments, 
    isLoading: commentsLoading, 
    isLoadingMore, 
    hasMore, 
    loadMore, 
    refresh: refreshComments,
    totalComments 
  } = useComments({ 
    postId, 
    limit: 20, 
    sortBy: 'createdAt', 
    sortOrder: 'desc' 
  });

  const handleEndReached = useCallback(() => {
    if (hasMore && !isLoadingMore) {
      loadMore();
    }
  }, [hasMore, isLoadingMore, loadMore]);

  const handleRefresh = useCallback(async () => {
    await refreshComments();
  }, [refreshComments]);

  const renderCommentFooter = useCallback(() => {
    if (!isLoadingMore) return null;
    return (
      <S.LoadingContainer>
        <ActivityIndicator size="small" color={primaryColor} />
      </S.LoadingContainer>
    );
  }, [isLoadingMore]);

  const renderComment = useCallback(({ item }: { item: CommentDto }) => {
    // Map CommentDto to the format expected by CommentCard
    const mappedComment = {
      id: item.commentId,
      author: {
        id: item.user.userId,
        name: item.user.displayName,
        avatarUrl: item.user.avatarUrl || '',
      },
      content: item.content,
      totalLike: item.likesCount,
      totalReply: item.repliesCount,
      createdAt: new Date(item.createdAt).getTime() / 1000, // Convert to Unix timestamp
    };

    return (
      <CommentCard 
        comment={mappedComment} 
        onCommentClick={() => navigation.navigate('/post-stack/reply', { replyId: item.commentId })} 
      />
    );
  }, [navigation]);

  if (postLoading) {
    return (
      <S.Container>
        <S.LoadingContainer>
          <ActivityIndicator size="large" color={primaryColor} />
        </S.LoadingContainer>
      </S.Container>
    );
  }

  if (postError || !post) {
    return (
      <S.Container>
        <S.ErrorContainer>
          <S.ErrorText>Failed to load post. Please try again.</S.ErrorText>
        </S.ErrorContainer>
      </S.Container>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={RFValue(70)}
    >
      <S.Container>
        <S.CommentCountList
          data={comments}
          keyExtractor={(item: CommentDto) => item.commentId}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <S.HeaderWrapper>
              <PostCard post={post} />
              <S.CommentSection>
                <S.CommentHeader>
                  <S.CommentHeaderTitle>Comments</S.CommentHeaderTitle>
                  <S.CommentCount>
                    ({formatNumber(totalComments || post.commentsCount)})
                  </S.CommentCount>
                </S.CommentHeader>
              </S.CommentSection>
            </S.HeaderWrapper>
          }
          renderItem={renderComment}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderCommentFooter}
          refreshControl={
            <RefreshControl
              refreshing={commentsLoading}
              onRefresh={handleRefresh}
              tintColor={blackColor}
            />
          }
        />
        <S.CommentInputContainer>
          <HeartOutline width={RFValue(24)} height={RFValue(24)} color={blackColor}/>
          <S.CommentInputWrapper>
            <S.CommentInput
              textAlignVertical="top"
              placeholder="Write your comment..."
              multiline={true}
              value={commentText}
              onChangeText={setCommentText}
              numberOfLines={4}
            />
          </S.CommentInputWrapper>
          <SendIcon width={RFValue(24)} height={RFValue(24)} color={primaryColor} />
        </S.CommentInputContainer>
      </S.Container>
    </KeyboardAvoidingView>
  );
};

export default PostScreen;
