import React, { useState, useCallback } from 'react';
import * as S from './PostScreen.style';
import PostCard from 'components/Card/PostCard/PostCard';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { ActivityIndicator, Platform, RefreshControl } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { formatNumber } from 'helpers/format-number';
import { showToast } from 'helpers/showToast';
import HeartOutline from 'assets/images/icons/heart-outline.svg';
import SendIcon from 'assets/images/icons/send.svg';
import { blackColor, primaryColor } from 'constants/colors';
import CommentCard from 'components/Card/CommentCard/CommentCard';
import { useAppNavigation } from 'hooks/useAppNavigation';
import { usePostDetail } from './hooks/usePostDetail';
import { useComments } from './hooks/useComments';
import { useCreateComment } from './hooks/useCreateComment';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from 'src/typescript/types';
import { components } from 'src/schemes/openapi';
import { PostSkeleton } from 'components/skeleton';
import CommentLoadingSkeletons from './components/CommentLoadingSkeletons/CommentLoadingSkeletons';
import EmptyComments from './components/EmptyComments/EmptyComments';

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
    addNewComment,
    totalComments 
  } = useComments({ 
    postId, 
    limit: 20, 
    sortBy: 'createdAt', 
    sortOrder: 'desc' 
  });

  const { createComment, isCreating } = useCreateComment({
    onSuccess: (response) => {
      // Clear the comment input
      setCommentText('');
      // Refresh comments to show the new comment at the top
      addNewComment(response as any); // We'll type this properly later
      showToast('success', 'Comment posted successfully!');
    },
    onError: (error) => {
      console.error('Failed to create comment:', error);
      showToast('warning', 'Failed to post comment. Please try again.');
    },
  });

  const handleEndReached = useCallback(() => {
    if (hasMore && !isLoadingMore) {
      loadMore();
    }
  }, [hasMore, isLoadingMore, loadMore]);

  const handleRefresh = useCallback(async () => {
    await refreshComments();
  }, [refreshComments]);

  const handleSubmitComment = useCallback(() => {
    const trimmedComment = commentText.trim();
    if (!trimmedComment || isCreating) {
      return;
    }

    createComment({
      postId,
      content: trimmedComment,
    });
  }, [commentText, postId, createComment, isCreating]);

  const renderCommentFooter = useCallback(() => {
    if (!isLoadingMore) return null;
    return (
      <S.LoadingContainer>
        <ActivityIndicator size="small" color={primaryColor} />
      </S.LoadingContainer>
    );
  }, [isLoadingMore]);

  const renderComment = useCallback(({ item }: { item: CommentDto }) => {
    return (
      <CommentCard 
        comment={item} 
        onCommentClick={() => navigation.navigate('/post-stack/reply', { replyId: item.commentId })} 
      />
    );
  }, [navigation]);

  const renderListHeader = useCallback(() => (
    <S.HeaderWrapper>
      {postLoading ? (
        <PostSkeleton />
      ) : post ? (
        <PostCard post={post} />
      ) : null}
      <S.CommentSection>
        <S.CommentHeader>
          <S.CommentHeaderTitle>Comments</S.CommentHeaderTitle>
          <S.CommentCount>
            ({formatNumber(totalComments || post?.commentsCount || 0)})
          </S.CommentCount>
        </S.CommentHeader>
      </S.CommentSection>
      {commentsLoading && <CommentLoadingSkeletons />}
    </S.HeaderWrapper>
  ), [postLoading, post, totalComments, commentsLoading]);

  const renderEmptyComments = useCallback(() => {
    if (commentsLoading) return null;
    return <EmptyComments />;
  }, [commentsLoading]);

  if (postError || (post === null && !postLoading)) {
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
          ListHeaderComponent={renderListHeader}
          renderItem={renderComment}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderCommentFooter}
          ListEmptyComponent={renderEmptyComments}
          refreshControl={
            <RefreshControl
              refreshing={commentsLoading && !postLoading}
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
              editable={!isCreating}
              returnKeyType="send"
              onSubmitEditing={handleSubmitComment}
              blurOnSubmit={false}
            />
          </S.CommentInputWrapper>
          <S.SendButton onPress={handleSubmitComment} disabled={!commentText.trim() || isCreating}>
            {isCreating ? (
              <ActivityIndicator size="small" color={primaryColor} />
            ) : (
              <SendIcon width={RFValue(24)} height={RFValue(24)} color={commentText.trim() ? primaryColor : blackColor} />
            )}
          </S.SendButton>
        </S.CommentInputContainer>
      </S.Container>
    </KeyboardAvoidingView>
  );
};

export default PostScreen;
