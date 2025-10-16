import { View, Text } from 'react-native'
import React, { FC } from 'react'
import * as S from './AuthTitle.style'
import Logo from 'assets/images/logo/logo.svg'

interface AuthTitleProps {
  // Define your props here
  title: string;
}

const AuthTitle: FC<AuthTitleProps> = ({ title }) => {
  return (
    <S.Container>
      <Logo height={32} />
      <S.Title>{title}</S.Title>
    </S.Container>
  )
}

export default AuthTitle