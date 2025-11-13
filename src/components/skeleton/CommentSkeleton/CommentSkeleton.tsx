import React from 'react';
import * as S from './CommentSkeleton.style';

const CommentSkeleton = () => (
  <S.CommentSkeletonContainer>
    <S.CommentSkeletonHeader>
      <S.CommentSkeletonAvatar />
      <S.CommentSkeletonName />
    </S.CommentSkeletonHeader>
    <S.CommentSkeletonText />
    <S.CommentSkeletonTextShort />
    <S.CommentSkeletonFooter>
      <S.CommentSkeletonFooterItem>
        <S.CommentSkeletonIcon />
        <S.CommentSkeletonCount />
      </S.CommentSkeletonFooterItem>
      <S.CommentSkeletonFooterItem>
        <S.CommentSkeletonIcon />
        <S.CommentSkeletonCount />
      </S.CommentSkeletonFooterItem>
    </S.CommentSkeletonFooter>
  </S.CommentSkeletonContainer>
);

export default CommentSkeleton;