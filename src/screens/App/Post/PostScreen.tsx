import React, { useState } from 'react';
import * as S from './PostScreen.style';
import PostCard from 'components/Card/PostCard/PostCard';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { formatNumber } from 'helpers/format-number';
import { formatEpoch } from 'helpers/date-converter';
import HeartOutline from 'assets/images/icons/heart-outline.svg';
import Comment from 'assets/images/icons/comment.svg';
import SendIcon from 'assets/images/icons/send.svg';
import { blackColor, primaryColor } from 'constants/colors';

const POST_DATA = {
  author: {
    id: 'a1',
    name: 'John Doe',
    avatarUrl:
      'https://res.cloudinary.com/dsc9afexw/image/upload/v1756372055/5c53d14e4ebbf5c723559e7b3f27c628baac4651_izhcbp.png',
  },
  id: '1',
  content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s`,
  imageUrl:
    'https://res.cloudinary.com/dsc9afexw/image/upload/v1758008644/iK-Cji6J73Q-HD_nmbkfm.jpg',
  totalComment: 12120,
  totalLike: 3345,
  createdAt: 1761749452,
};

const COMMENTS = Array.from({ length: 6 }).map((_, i) => ({
  id: `c${i}`,
  author: {
    id: 'a1',
    name: 'John Doe',
    avatarUrl:
      'https://res.cloudinary.com/dsc9afexw/image/upload/v1756372055/5c53d14e4ebbf5c723559e7b3f27c628baac4651_izhcbp.png',
  },
  content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s`,
  totalLike: 25,
  totalReply: 10,
  createdAt: 1761749452,
}));

const CommentCard = ({ comment }: { comment: (typeof COMMENTS)[0] }) => {
  return (
    <S.CommentCardContainer>
      <S.CommentAvatar source={{ uri: comment.author.avatarUrl }} />
      <S.CommentCardWrapper>
        <S.CommentInfoContainer>
          <S.InfoColumn>
            <S.CommentAuthorNameWrapper>
              <S.CommentAuthorName>{comment.author.name}</S.CommentAuthorName>
              {/* <VerifyIcon
              color={primaryColor}
              width={RFValue(14)}
              height={RFValue(14)}
            /> */}
            </S.CommentAuthorNameWrapper>
            <S.CommentDate>{formatEpoch(comment.createdAt)}</S.CommentDate>
          </S.InfoColumn>
        </S.CommentInfoContainer>
        <S.CommentContentContainer>
          <S.CommentContent>{comment.content}</S.CommentContent>
        </S.CommentContentContainer>
        <S.CommentFooter>
          <S.CommentFooterSection>
            <HeartOutline color={blackColor} />
            <S.CommentFooterText>
              {formatNumber(comment.totalLike)}
            </S.CommentFooterText>
          </S.CommentFooterSection>
          <S.CommentFooterSection>
            <Comment color={blackColor}/>
            <S.CommentFooterText>
              {formatNumber(comment.totalReply)}
            </S.CommentFooterText>
          </S.CommentFooterSection>
        </S.CommentFooter>
      </S.CommentCardWrapper>
    </S.CommentCardContainer>
  );
};

const PostScreen = () => {
  const [commentText, setCommentText] = useState('');
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
              <PostCard post={POST_DATA} />
              <S.CommentSection>
                <S.CommentHeader>
                  <S.CommentHeaderTitle>Comments</S.CommentHeaderTitle>
                  <S.CommentCount>
                    ({formatNumber(POST_DATA.totalComment)})
                  </S.CommentCount>
                </S.CommentHeader>
              </S.CommentSection>
            </S.HeaderWrapper>
          }
          renderItem={({ item }: { item: (typeof COMMENTS)[0] }) => (
            <CommentCard comment={item} />
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
