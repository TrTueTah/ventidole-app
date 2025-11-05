import { Platform } from 'react-native';
import React from 'react';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { RFValue } from 'react-native-responsive-fontsize';
import * as S from './ReplyScreen.style';
import { COMMENTS, REPLIES } from 'src/mock';
import CommentCard from 'components/Card/CommentCard/CommentCard';
import { formatNumber } from 'helpers/format-number';
import { blackColor, primaryColor } from 'constants/colors';
import HeartOutline from 'assets/images/icons/heart-outline.svg';
import SendIcon from 'assets/images/icons/send.svg';
import ReplyCard from 'components/Card/ReplyCard/ReplyCard';

const ReplyScreen = () => {
  const [replyText, setReplyText] = React.useState('');
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={RFValue(70)}
    >
      <S.Container>
        <S.ReplyCountList
          data={REPLIES}
          keyExtractor={(item: (typeof REPLIES)[0]) => item.id}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <S.HeaderWrapper>
              <CommentCard comment={COMMENTS[0]} />
              <S.ReplySection>
                <S.ReplyHeader>
                  <S.ReplyHeaderTitle>Replies</S.ReplyHeaderTitle>
                  <S.ReplyCount>
                    ({formatNumber(COMMENTS[0].totalReply)})
                  </S.ReplyCount>
                </S.ReplyHeader>
              </S.ReplySection>
            </S.HeaderWrapper>
          }
          renderItem={({ item }: { item: (typeof COMMENTS)[0] }) => (
            <ReplyCard
              reply={item}
              // onCommentClick={() =>
              //   navigation.navigate('/post-stack/reply', { replyId: item.id })
              // }
            />
          )}
        />
        <S.ReplyInputContainer>
          <HeartOutline
            width={RFValue(24)}
            height={RFValue(24)}
            color={blackColor}
          />
          <S.ReplyInputWrapper>
            <S.ReplyInput
              textAlignVertical="top"
              placeholder="Write your comment..."
              multiline={true}
              value={replyText}
              onChangeText={setReplyText}
              numberOfLines={4}
            />
          </S.ReplyInputWrapper>
          <SendIcon
            width={RFValue(24)}
            height={RFValue(24)}
            color={primaryColor}
          />
        </S.ReplyInputContainer>
      </S.Container>
    </KeyboardAvoidingView>
  );
};

export default ReplyScreen;
