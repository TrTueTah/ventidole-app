import React from 'react';
import CommonAuthLayout from '../Layouts/CommonAuthLayout/CommonAuthLayout';
import { useAuthStore } from 'src/store/authStore';
import { View } from 'react-native';

const DATA = [
  { id: '1', name: 'Idol 1', imageUrl: 'https://placehold.co/400' },
  { id: '2', name: 'Idol 2', imageUrl: 'https://placehold.co/400' },
  { id: '3', name: 'Idol 3', imageUrl: 'https://placehold.co/400' },
  { id: '4', name: 'Idol 4', imageUrl: 'https://placehold.co/400' },
  { id: '5', name: 'Idol 5', imageUrl: 'https://placehold.co/400' },
  { id: '6', name: 'Idol 6', imageUrl: 'https://placehold.co/400' },
]

const ChooseIdolScreen = () => {
  const { setIsLogin } = useAuthStore();
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
      <View>
      
      </View>
    </CommonAuthLayout>
  );
};

export default ChooseIdolScreen;
