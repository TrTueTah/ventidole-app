import * as S from './ReplyCard.style';
import { formatEpoch } from 'helpers/date-converter';
import { blackColor } from 'constants/colors';
import { formatNumber } from 'helpers/format-number';
import HeartOutline from 'assets/images/icons/heart-outline.svg';
import { REPLIES } from 'src/mock';

type ReplyCardProps = {
  reply: (typeof REPLIES)[0];
  onReplyClick?: () => void;
  onLikeClick?: () => void;
};

const ReplyCard = ({
  reply,
  onReplyClick,
  onLikeClick,
}: ReplyCardProps) => {
  return (
    <S.ReplyCardContainer>
      <S.ReplyAvatar source={{ uri: reply.author.avatarUrl }} />
      <S.ReplyCardWrapper>
        <S.ReplyInfoContainer>
          <S.InfoColumn>
            <S.ReplyAuthorNameWrapper>
              <S.ReplyAuthorName>{reply.author.name}</S.ReplyAuthorName>
              {/* <VerifyIcon
              color={primaryColor}
              width={RFValue(14)}
              height={RFValue(14)}
            /> */}
            </S.ReplyAuthorNameWrapper>
            <S.ReplyDate>{formatEpoch(reply.createdAt)}</S.ReplyDate>
          </S.InfoColumn>
        </S.ReplyInfoContainer>
        <S.ReplyContentContainer>
          <S.ReplyContent>{reply.content}</S.ReplyContent>
        </S.ReplyContentContainer>
        <S.ReplyFooter>
          <S.ReplyFooterSection>
            <S.ButtonWrapper onPress={onLikeClick}>
              <HeartOutline color={blackColor} />
              <S.ReplyFooterText>
                {formatNumber(reply.totalLike)}
              </S.ReplyFooterText>
            </S.ButtonWrapper>
          </S.ReplyFooterSection>
        </S.ReplyFooter>
      </S.ReplyCardWrapper>
    </S.ReplyCardContainer>
  );
};

export default ReplyCard;
