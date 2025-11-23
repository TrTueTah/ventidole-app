import CommunitySkeleton from 'components/skeleton/CommunitySkeleton/CommunitySkeleton';
import React from 'react';
import { View } from 'react-native';

const LoadingSkeletons = () => (
  <View style={{ flexDirection: 'row', gap: 12}}>
    {Array.from({ length: 5 }).map((_, index) => (
      <CommunitySkeleton key={index} />
    ))}
  </View>
);

export default LoadingSkeletons;