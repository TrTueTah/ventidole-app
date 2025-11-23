import { BackendApiContext } from 'contexts/BackendApiContex';
import { useContext } from 'react';
import { useQueryClient } from '@tanstack/react-query';

export const useToggleCommunity = () => {
  const backendApi = useContext(BackendApiContext);
  const queryClient = useQueryClient();

  const joinMutation = backendApi.useMutation('post', '/v1/community/join', {
    onSuccess: (data, variables) => {
      console.log('Successfully joined community:', data);
      // Invalidate community list queries
      queryClient.invalidateQueries({ queryKey: ['get', '/v1/community'] });
      // Invalidate the specific community detail query
      if (variables.body?.communityId) {
        queryClient.invalidateQueries({
          queryKey: ['get', '/v1/community/{communityId}', { params: { path: { communityId: variables.body.communityId } } }]
        });
      }
    },
    onError: (error) => {
      console.error('Failed to join community:', error);
    },
  });

  const leaveMutation = backendApi.useMutation('delete', '/v1/community/leave', {
    onSuccess: (data, variables) => {
      console.log('Successfully left community:', data);
      // Invalidate community list queries
      queryClient.invalidateQueries({ queryKey: ['get', '/v1/community'] });
      // Invalidate the specific community detail query
      if (variables.body?.communityId) {
        queryClient.invalidateQueries({
          queryKey: ['get', '/v1/community/{communityId}', { params: { path: { communityId: variables.body.communityId } } }]
        });
      }
    },
    onError: (error) => {
      console.error('Failed to leave community:', error);
    },
  });

  const toggleCommunity = (communityId: string, isFollowing: boolean) => {
    if (isFollowing) {
      return leaveMutation.mutateAsync({ body: { communityId } });
    } else {
      return joinMutation.mutateAsync({ body: { communityId } });
    }
  };

  return {
    toggleCommunity,
    isToggling: joinMutation.isPending || leaveMutation.isPending,
    joinMutation,
    leaveMutation,
  };
};
