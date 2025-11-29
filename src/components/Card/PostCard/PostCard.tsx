import React from 'react';
import VerifyIcon from 'assets/images/icons/verify.svg';
import HeartOutline from 'assets/images/icons/heart-outline.svg';
import Comment from 'assets/images/icons/comment.svg';
import { RFValue } from 'react-native-responsive-fontsize';
import { primaryColor } from 'constants/colors';
import { formatEpoch, formatISODate } from 'helpers/date-converter';
import { formatNumber } from 'helpers/format-number';
import * as S from './PostCard.style';
import { Dimensions, StyleProp, ViewStyle } from 'react-native';
import { components } from 'src/schemes/openapi';
import Carousel from 'react-native-reanimated-carousel';

interface PostCardProps {
  post: components["schemas"]["PostDto"];
  containerStyle?: StyleProp<ViewStyle>;
}

const PostCard: React.FC<PostCardProps> = ({ post, containerStyle }) => {
  const width = Dimensions.get('window').width;

  return (
    <S.PostCardContainer style={containerStyle}>
      <S.PostInfoContainer>
        <S.PostAvatar source={{ uri: post.userAvatar }} />
        <S.InfoColumn>
          <S.PostAuthorNameWrapper>
            <S.PostAuthorName>{post.displayName}</S.PostAuthorName>
            <VerifyIcon
              color={primaryColor}
              width={RFValue(14)}
              height={RFValue(14)}
            />
          </S.PostAuthorNameWrapper>
          <S.PostDate>{formatISODate(post.createdAt)}</S.PostDate>
        </S.InfoColumn>
      </S.PostInfoContainer>
      <S.PostContentContainer>
        <S.PostContent>{post.content}</S.PostContent>
      </S.PostContentContainer>
      {post.mediaUrls && post.mediaUrls.length > 0 && (
        <Carousel
          loop={false}
          width={width}
          height={RFValue(200)}
          data={post.mediaUrls}
          renderItem={({ item }) => (
            <S.PostImage source={{ uri: item }} resizeMode="cover" />
          )}
        />
      )}
      <S.PostFooter>
        <S.PostFooterSection>
          <HeartOutline />
          <S.PostFooterText>{formatNumber(post.likesCount)}</S.PostFooterText>
        </S.PostFooterSection>
        <S.PostFooterSection>
          <Comment />
          <S.PostFooterText>{formatNumber(post.commentsCount)}</S.PostFooterText>
        </S.PostFooterSection>
      </S.PostFooter>
    </S.PostCardContainer>
  );
};

export default PostCard;
