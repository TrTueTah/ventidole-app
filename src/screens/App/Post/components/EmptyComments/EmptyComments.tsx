import React from 'react';
import * as S from '../../PostScreen.style';

const EmptyComments = () => (
  <S.EmptyCommentsContainer>
    <S.EmptyCommentsText>No comments yet</S.EmptyCommentsText>
    <S.EmptyCommentsSubText>Be the first to share your thoughts!</S.EmptyCommentsSubText>
  </S.EmptyCommentsContainer>
);

export default EmptyComments;