import React from 'react';
import * as S from '../../HomeScreen.style';

const EmptyState = () => (
  <S.EmptyContainer>
    <S.EmptyText>No posts yet</S.EmptyText>
    <S.EmptySubText>Be the first to share something amazing!</S.EmptySubText>
  </S.EmptyContainer>
);

export default EmptyState;