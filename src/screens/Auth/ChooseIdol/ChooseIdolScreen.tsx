import React, { useCallback } from 'react';
import CommonAuthLayout from '../Layouts/CommonAuthLayout/CommonAuthLayout';
import { useAuthStore } from 'src/store/authStore';
import * as S from './ChooseIdolScreen.style';
import { ChooseIdolState, useChooseIdols } from './hooks/useChooseIdols';
import CheckIcon from 'assets/images/icons/check.svg';

const ChooseIdolScreen = () => {
  const { listOfIdols, handleSelectIdols, handleNext } = useChooseIdols();
  const { setIsLogin } = useAuthStore();

  const renderItem = useCallback(
    ({ item }: { item: ChooseIdolState }) => {
      return (
        <S.IdolItem onPress={() => handleSelectIdols(item.id)} isSelected={item.isSelected} testID={`idol-item-${item.id}`}>
          <S.IdolImage source={{ uri: 'https://res.cloudinary.com/dsc9afexw/image/upload/v1756372055/5c53d14e4ebbf5c723559e7b3f27c628baac4651_izhcbp.png'}} resizeMode="cover">
            <S.ItemGradient colors={['rgba(0, 0, 0, 0.0)', 'rgba(0,0,0,0.8)']} />
            <S.IdolTitleWrapper>
              <S.IdolTitle>{item.title}</S.IdolTitle>
            </S.IdolTitleWrapper>
            <S.SelectionIndicator isSelected={item.isSelected}>
              {item.isSelected && <CheckIcon width={14} height={14} />}
            </S.SelectionIndicator>
          </S.IdolImage>
        </S.IdolItem>
      );
    },
    [listOfIdols],
  );
  return (
    <CommonAuthLayout
      title={'Pick your favorite idols'}
      continueButtonTitle="Continue"
      continueButtonDisabled={false}
      onContinuePress={() => {
        setIsLogin(true);
      }}
      skipButtonTitle="Skip"
      shouldShowBackButton={false}
      onSkipPress={() => {
        setIsLogin(true);
      }}
    >
      <S.ListContainer>
        <S.IdolsList
          numColumns={3}
          showsVerticalScrollIndicator={false}
          data={listOfIdols}
          keyExtractor={({ id }: { id: number }) => id.toString()}
          renderItem={renderItem}
        />
        <S.ListGradient colors={['rgba(0, 0, 0, 0.00)', 'rgba(0, 0, 0, 0.80)']} />
      </S.ListContainer>
    </CommonAuthLayout>
  );
};

export default ChooseIdolScreen;
