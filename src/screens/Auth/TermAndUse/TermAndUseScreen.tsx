import React, { useCallback } from 'react';
import * as S from './TermAndUseScreen.style';
import { useEulaData } from './hooks/useEulaData';
import { ActivityIndicator } from '@ant-design/react-native';
import BackButton from 'components/BackButton/BackButton';
import { blackColor, whiteColor } from 'constants/colors';
import Button from 'components/Button/Button';

const TermAndUseScreen = () => {
  const { dataEula, loading, endReached, onEndReached, navigation } =
    useEulaData();

  const renderItem = useCallback(
    (item: { id: number; title: string; description: string }) => (
      <S.ItemContainer isLast={item.id === dataEula.length - 1}>
        {item.title && <S.ItemTitle>{item.title}</S.ItemTitle>}
        <S.ItemDescription>{item.description}</S.ItemDescription>
      </S.ItemContainer>
    ),
    [],
  );

  const handleAccept = () => {
    if (endReached) {
      navigation.navigate('/auth-complete', {
        type: 'register',
        title: 'Registration Complete',
        subtitle: 'Welcome! Discover various features to get started.'
      });
    }
  };

  if (loading) {
    return (
      <S.RootGradient testID="eula-loading">
        <S.LoaderContainer>
          <ActivityIndicator color={blackColor} />
        </S.LoaderContainer>
      </S.RootGradient>
    );
  }

  return (
    <S.RootGradient>
      <S.SafeArea>
        <S.Container>
          <S.HeaderRow withBorder={false}>
            <BackButton onPress={() => navigation.goBack()} />
            <S.EulaTitleContainer>
              <S.EulaTitle testID="eula-title">
                End-User License Agreement (EULA)
              </S.EulaTitle>
            </S.EulaTitleContainer>
          </S.HeaderRow>
          <S.EulaList
            data={dataEula}
            testID="eula-list"
            keyExtractor={(item: { id: number }) => item.id.toString()}
            renderItem={({
              item,
            }: {
              item: { id: number; title: string; description: string };
            }) => renderItem(item)}
            onEndReached={onEndReached}
          />
          <S.ButtonRow>
            <Button
              title="Deny"
              variant="gray"
              buttonStyle={{
                flex: 1,
              }}
              onPress={() => navigation.goBack()}
            />
            <Button
              title="Accept"
              variant="default"
              testID="eula-accept-button"
              disabled={!endReached}
              buttonStyle={{
                flex: 1,
              }}
              onPress={handleAccept}
            />
          </S.ButtonRow>
        </S.Container>
      </S.SafeArea>
    </S.RootGradient>
  );
};

export default TermAndUseScreen;
