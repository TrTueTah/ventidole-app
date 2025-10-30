import React from 'react';
import VerifyIcon from 'assets/images/icons/verify.svg';
import HeartOutline from 'assets/images/icons/heart-outline.svg';
import Comment from 'assets/images/icons/comment.svg';
import { RFValue } from 'react-native-responsive-fontsize';
import { primaryColor } from 'constants/colors';
import { formatEpoch } from 'helpers/date-converter';
import { formatNumber } from 'helpers/format-number';
import * as S from './PostCard.style';
import { StyleProp, ViewStyle } from 'react-native';

type Author = {
  id: string;
  name: string;
  avatarUrl: string;
};

export type Post = {
  id: string;
  author: Author;
  content: string;
  imageUrl: string;
  totalComment: number;
  totalLike: number;
  createdAt: number;
};

interface PostCardProps {
  post: Post;
  containerStyle?: StyleProp<ViewStyle>;
}

const PostCard: React.FC<PostCardProps> = ({ post, containerStyle }) => {
  return (
    <S.PostCardContainer style={containerStyle}>
      <S.PostInfoContainer>
        <S.PostAvatar source={{ uri: post.author.avatarUrl }} />
        <S.InfoColumn>
          <S.PostAuthorNameWrapper>
            <S.PostAuthorName>{post.author.name}</S.PostAuthorName>
            <VerifyIcon
              color={primaryColor}
              width={RFValue(14)}
              height={RFValue(14)}
            />
          </S.PostAuthorNameWrapper>
          <S.PostDate>{formatEpoch(post.createdAt)}</S.PostDate>
        </S.InfoColumn>
      </S.PostInfoContainer>
      <S.PostContentContainer>
        <S.PostContent>{post.content}</S.PostContent>
      </S.PostContentContainer>
      <S.PostImage source={{ uri: post.imageUrl }} resizeMode="cover" />
      <S.PostFooter>
        <S.PostFooterSection>
          <HeartOutline />
          <S.PostFooterText>{formatNumber(post.totalLike)}</S.PostFooterText>
        </S.PostFooterSection>
        <S.PostFooterSection>
          <Comment />
          <S.PostFooterText>{formatNumber(post.totalComment)}</S.PostFooterText>
        </S.PostFooterSection>
      </S.PostFooter>
    </S.PostCardContainer>
  );
};

export default PostCard;
