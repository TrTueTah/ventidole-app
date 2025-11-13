import React from 'react';
import { View } from 'react-native';
import { CommentSkeleton } from 'components/skeleton';

const CommentLoadingSkeletons = () => (
  <View>
    {Array.from({ length: 5 }).map((_, index) => (
      <CommentSkeleton key={index} />
    ))}
  </View>
);

export default CommentLoadingSkeletons;