import React, { useState } from 'react';
import * as S from './PostScreen.style';
import PostCard from 'components/Card/PostCard/PostCard';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { ActivityIndicator, Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { formatNumber } from 'helpers/format-number';
import HeartOutline from 'assets/images/icons/heart-outline.svg';
import SendIcon from 'assets/images/icons/send.svg';
import { blackColor, primaryColor } from 'constants/colors';
import { COMMENTS } from 'src/mock';
import CommentCard from 'components/Card/CommentCard/CommentCard';
import { useAppNavigation } from 'hooks/useAppNavigation';
import { usePostDetail } from './hooks/usePostDetail';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from 'src/typescript/types';

type PostScreenRouteProp = RouteProp<RootStackParamList, '/post-stack'>;

const PostScreen = () => {
  const [commentText, setCommentText] = useState('');
  const navigation = useAppNavigation();
  const route = useRoute<PostScreenRouteProp>();
  const { postId } = route.params;

  const { post, isLoading, error } = usePostDetail({ postId });

  if (isLoading) {
    return (
      <S.Container>
        <S.LoadingContainer>
          <ActivityIndicator size="large" color={primaryColor} />
        </S.LoadingContainer>
      </S.Container>
    );
  }

  if (error || !post) {
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
          data={COMMENTS}
          keyExtractor={(item: (typeof COMMENTS)[0]) => item.id}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <S.HeaderWrapper>
              <PostCard post={post} />
              <S.CommentSection>
                <S.CommentHeader>
                  <S.CommentHeaderTitle>Comments</S.CommentHeaderTitle>
                  <S.CommentCount>
                    ({formatNumber(post.commentsCount)})
                  </S.CommentCount>
                </S.CommentHeader>
              </S.CommentSection>
            </S.HeaderWrapper>
          }
          renderItem={({ item }: { item: (typeof COMMENTS)[0] }) => (
            <CommentCard comment={item} onCommentClick={() => navigation.navigate('/post-stack/reply', { replyId: item.id })} />
          )}
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
