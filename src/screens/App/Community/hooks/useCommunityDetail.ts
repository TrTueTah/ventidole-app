import { useContext } from 'react';
import { BackendApiContext } from 'contexts/BackendApiContex';
import { components } from 'src/schemes/openapi';

type CommunityDetail = components['schemas']['GetCommunityDetailResponse'];

interface UseCommunityDetailParams {
  communityId?: string;
  enabled?: boolean;
}

export const useCommunityDetail = ({ communityId, enabled = true }: UseCommunityDetailParams) => {
  const backendApi = useContext(BackendApiContext);

  const { data, isLoading, error, refetch } = backendApi.useQuery(
    'get',
    '/v1/community/{communityId}',
    {
      params: {
        path: {
          communityId: communityId || '',
        },
      },
    },
    {
      enabled: enabled && !!communityId,
    }
  );

  return {
    community: data?.data as CommunityDetail | undefined,
    isLoading,
    error,
    refetch,
  };
};
