import { View, Text } from 'react-native'
import React from 'react'
import * as S from './CommunitySkeleton.style'

const CommunitySkeleton = () => {
  return (
    <S.SkeletonContainer>
      <S.SkeletonAvatar />
      <S.SkeletonText />
    </S.SkeletonContainer>
  )
}

export default CommunitySkeleton