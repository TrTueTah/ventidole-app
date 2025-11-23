import { BackendApiContext } from 'contexts/BackendApiContex';
import { useContext } from 'react';
import { useQueryClient } from '@tanstack/react-query';

interface JoinCommunityParams {
  communityId: string;
}

export const useJoinCommunity = () => {
  const backendApi = useContext(BackendApiContext);
  const queryClient = useQueryClient();

  return backendApi.useMutation('post', '/v1/community/join', {
    onSuccess: (data) => {
      console.log('Successfully joined community:', data);
      // Invalidate all community queries to refetch data
      queryClient.invalidateQueries({ queryKey: ['get', '/v1/community'] });
    },
    onError: (error) => {
      console.error('Failed to join community:', error);
    },
  });
};
