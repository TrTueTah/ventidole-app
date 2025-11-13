import { COMMENTS } from 'src/mock';
import * as S from './CommentCard.style';
import { formatEpoch, formatISODate } from 'helpers/date-converter';
import { blackColor } from 'constants/colors';
import { formatNumber } from 'helpers/format-number';
import HeartOutline from 'assets/images/icons/heart-outline.svg';
import Comment from 'assets/images/icons/comment.svg';
import { components } from 'src/schemes/openapi';

type CommentCardProps = {
  comment: components['schemas']['CommentDto'];
  onCommentClick?: () => void;
  onLikeClick?: () => void;
};

const CommentCard = ({
  comment,
  onCommentClick,
  onLikeClick,
}: CommentCardProps) => {
  return (
    <S.CommentCardContainer>
      <S.CommentAvatar source={{ uri: comment.user.avatarUrl }} />
      <S.CommentCardWrapper>
        <S.CommentInfoContainer>
          <S.InfoColumn>
            <S.CommentAuthorNameWrapper>
              <S.CommentAuthorName>{comment.user.displayName}</S.CommentAuthorName>
              {/* <VerifyIcon
              color={primaryColor}
              width={RFValue(14)}
              height={RFValue(14)}
            /> */}
            </S.CommentAuthorNameWrapper>
            <S.CommentDate>{formatISODate(comment.createdAt)}</S.CommentDate>
          </S.InfoColumn>
        </S.CommentInfoContainer>
        <S.CommentContentContainer>
          <S.CommentContent>{comment.content}</S.CommentContent>
        </S.CommentContentContainer>
        <S.CommentFooter>
          <S.CommentFooterSection>
            <S.ButtonWrapper onPress={onLikeClick}>
              <HeartOutline color={blackColor} />
              <S.CommentFooterText>
                {formatNumber(comment.likesCount)}
              </S.CommentFooterText>
            </S.ButtonWrapper>
          </S.CommentFooterSection>
          <S.CommentFooterSection>
            <S.ButtonWrapper onPress={onCommentClick}>
              <Comment color={blackColor} />
              <S.CommentFooterText>
                {formatNumber(comment.repliesCount)}
              </S.CommentFooterText>
            </S.ButtonWrapper>
          </S.CommentFooterSection>
        </S.CommentFooter>
      </S.CommentCardWrapper>
    </S.CommentCardContainer>
  );
};

export default CommentCard;
