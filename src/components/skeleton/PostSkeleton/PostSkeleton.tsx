import React from 'react';
import * as S from './PostSkeleton.style';

const PostSkeleton = () => (
  <S.SkeletonContainer>
    <S.SkeletonHeader>
      <S.SkeletonAvatar />
      <S.SkeletonTextContainer>
        <S.SkeletonText />
        <S.SkeletonTextShort />
      </S.SkeletonTextContainer>
    </S.SkeletonHeader>
    <S.SkeletonContent />
    <S.SkeletonContentShort />
    <S.SkeletonImage />
    <S.SkeletonFooter>
      <S.SkeletonFooterItem>
        <S.SkeletonIcon />
        <S.SkeletonFooterText />
      </S.SkeletonFooterItem>
      <S.SkeletonFooterItem>
        <S.SkeletonIcon />
        <S.SkeletonFooterText />
      </S.SkeletonFooterItem>
    </S.SkeletonFooter>
  </S.SkeletonContainer>
);

export default PostSkeleton;