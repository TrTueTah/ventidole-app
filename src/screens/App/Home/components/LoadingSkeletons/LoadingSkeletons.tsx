import React from 'react';
import { View } from 'react-native';
import { PostSkeleton } from 'components/skeleton';

const LoadingSkeletons = () => (
  <View>
    {Array.from({ length: 3 }).map((_, index) => (
      <PostSkeleton key={index} />
    ))}
  </View>
);

export default LoadingSkeletons;