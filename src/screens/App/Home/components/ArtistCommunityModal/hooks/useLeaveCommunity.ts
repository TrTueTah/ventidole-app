import { BackendApiContext } from 'contexts/BackendApiContex';
import { useContext } from 'react';
import { useQueryClient } from '@tanstack/react-query';

interface LeaveCommunityParams {
  communityId: string;
}

export const useLeaveCommunity = () => {
  const backendApi = useContext(BackendApiContext);
  const queryClient = useQueryClient();

  return backendApi.useMutation('delete', '/v1/community/leave', {
    onSuccess: (data) => {
      console.log('Successfully left community:', data);
      // Invalidate all community queries to refetch data
      queryClient.invalidateQueries({ queryKey: ['get', '/v1/community'] });
    },
    onError: (error) => {
      console.error('Failed to leave community:', error);
    },
  });
};
